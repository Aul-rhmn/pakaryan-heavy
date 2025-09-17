import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Phone, Mail, Truck, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface PaymentConfirmationProps {
  params: Promise<{ bookingId: string }>
}

export default async function PaymentConfirmationPage({ params }: PaymentConfirmationProps) {
  const { bookingId } = await params
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/auth/login")
  }

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
            <Link href="/dashboard">
              <Button variant="ghost" className="text-slate-600 hover:text-orange-600">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Payment Submitted!</h1>
            <p className="text-lg text-slate-600">We're verifying your payment</p>
          </div>

          <div className="space-y-6">
            {/* Payment Status */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-900">Payment Method</p>
                    <p className="text-sm text-slate-600 capitalize">
                      {booking.payment_method?.replace("bank_transfer_", "").replace("_", " ")} Bank Transfer
                    </p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Verification</Badge>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Verification in Progress</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    We're verifying your bank transfer. This usually takes 1-2 hours during business hours (9 AM - 6
                    PM). You'll receive a confirmation email once verified.
                  </p>
                </div>
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
                    <h3 className="font-bold text-slate-900">{booking.equipment.name}</h3>
                    <p className="text-slate-600 text-sm">
                      {booking.equipment.brand} {booking.equipment.model}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Booking ID</span>
                    <span className="font-mono font-medium">{booking.id.slice(0, 8).toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-slate-600">Total Amount</span>
                    <span className="font-bold text-orange-600">Rp {booking.total_amount.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card>
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-orange-600">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">Payment Verification</h4>
                      <p className="text-sm text-slate-600">
                        Our team will verify your bank transfer within 1-2 hours during business hours.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-orange-600">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">Booking Confirmation</h4>
                      <p className="text-sm text-slate-600">
                        You'll receive an email confirmation once payment is verified.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-orange-600">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">Equipment Delivery</h4>
                      <p className="text-sm text-slate-600">
                        Equipment will be delivered to your site on the scheduled date.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-slate-600">
                  If you have any questions about your payment or booking, contact our support team:
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" className="flex-1 justify-start bg-transparent">
                    <Phone className="w-4 h-4 mr-2" />
                    +62 21 1234 5678
                  </Button>
                  <Button variant="outline" className="flex-1 justify-start bg-transparent">
                    <Mail className="w-4 h-4 mr-2" />
                    support@pakaryan.com
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 bg-transparent" asChild>
                <Link href={`/booking/confirmation/${bookingId}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Booking
                </Link>
              </Button>
              <Button className="flex-1 bg-orange-600 hover:bg-orange-700" asChild>
                <Link href="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
