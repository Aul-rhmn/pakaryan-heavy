import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Clock, CheckCircle, Truck, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { PaymentMethodSelector } from "@/components/payment-method-selector"

interface PaymentPageProps {
  params: Promise<{ bookingId: string }>
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  const { bookingId } = await params
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/auth/login")
  }

  // Fetch booking details
  const { data: booking, error } = await supabase
    .from("bookings")
    .select(`
      *,
      equipment (
        name,
        brand,
        model,
        daily_rate,
        location,
        images,
        equipment_categories (name)
      )
    `)
    .eq("id", bookingId)
    .eq("user_id", user.id)
    .single()

  if (error || !booking) {
    notFound()
  }

  // If already paid, redirect to confirmation
  if (booking.payment_status === "completed") {
    redirect(`/booking/confirmation/${bookingId}`)
  }

  const startDate = new Date(booking.start_date)
  const endDate = new Date(booking.end_date)
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
  const paymentDueDate = new Date(booking.payment_due_date || booking.created_at)
  paymentDueDate.setHours(paymentDueDate.getHours() + 24)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">PakaryanHeavyRent</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href={`/booking/confirmation/${bookingId}`}>
              <Button variant="ghost" className="text-slate-600 hover:text-orange-600">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Booking
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-orange-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Complete Payment</h1>
            <p className="text-lg text-slate-600">Secure your equipment rental with payment</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Methods */}
            <div className="lg:col-span-2">
              <PaymentMethodSelector bookingId={bookingId} totalAmount={booking.total_amount} />
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Payment Due */}
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Payment Due</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      {paymentDueDate.toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </CardContent>
                </Card>

                {/* Booking Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                        <img
                          src={booking.equipment.images?.[0] || "/placeholder.svg?height=64&width=64"}
                          alt={booking.equipment.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-1">
                          {booking.equipment.equipment_categories?.name}
                        </Badge>
                        <h3 className="font-bold text-slate-900 text-sm">{booking.equipment.name}</h3>
                        <p className="text-slate-600 text-xs">
                          {booking.equipment.brand} {booking.equipment.model}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Rental period</span>
                        <span>
                          {days} day{days > 1 ? "s" : ""}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Daily rate</span>
                        <span>Rp {booking.equipment.daily_rate.toLocaleString("id-ID")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Delivery & pickup</span>
                        <span className="text-green-600">Free</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-orange-600">Rp {booking.total_amount.toLocaleString("id-ID")}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Notice */}
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">Secure Payment</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Your payment information is protected with bank-level security.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
