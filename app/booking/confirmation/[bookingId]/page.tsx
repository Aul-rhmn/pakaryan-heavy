import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Calendar, MapPin, Phone, Mail, Download, Truck } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BookingConfirmationProps {
  params: Promise<{ bookingId: string }>
}

export default async function BookingConfirmationPage({ params }: BookingConfirmationProps) {
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

  const startDate = new Date(booking.start_date)
  const endDate = new Date(booking.end_date)
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

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
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Booking Confirmed!</h1>
            <p className="text-lg text-slate-600">Your equipment rental request has been submitted successfully.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Booking Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-slate-600">Booking ID</p>
                      <p className="font-mono text-lg font-medium">{booking.id.slice(0, 8).toUpperCase()}</p>
                    </div>
                    <Badge
                      className={
                        booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                          : "bg-green-100 text-green-800 border-green-200"
                      }
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Rental Period</p>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="font-medium">
                          {startDate.toLocaleDateString("id-ID")} - {endDate.toLocaleDateString("id-ID")}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500">
                        {days} day{days > 1 ? "s" : ""}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-slate-600 mb-1">Delivery Address</p>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                        <span className="text-sm">{booking.delivery_address}</span>
                      </div>
                    </div>
                  </div>

                  {booking.special_requirements && (
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Special Requirements</p>
                      <p className="text-sm bg-slate-50 p-3 rounded-lg">{booking.special_requirements}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Equipment Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Equipment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                      <img
                        src={booking.equipment.images?.[0] || "/placeholder.svg?height=96&width=96"}
                        alt={booking.equipment.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-2">
                        {booking.equipment.equipment_categories?.name}
                      </Badge>
                      <h3 className="font-bold text-slate-900 mb-1">{booking.equipment.name}</h3>
                      <p className="text-slate-600 text-sm mb-2">
                        {booking.equipment.brand} {booking.equipment.model}
                      </p>
                      <p className="text-slate-600 text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {booking.equipment.location}
                      </p>
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
                        <h4 className="font-medium text-slate-900">Complete Payment</h4>
                        <p className="text-sm text-slate-600">
                          Complete your payment within 24 hours to secure your booking.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-orange-600">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900">Booking Confirmation</h4>
                        <p className="text-sm text-slate-600">We'll confirm your booking after payment verification.</p>
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
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Payment Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">
                        Equipment rental ({days} day{days > 1 ? "s" : ""})
                      </span>
                      <span>Rp {(days * booking.equipment.daily_rate).toLocaleString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Delivery & pickup</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-orange-600">Rp {booking.total_amount.toLocaleString("id-ID")}</span>
                    </div>
                    {/* Payment Status and Due Date */}
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-yellow-800">Payment Required</p>
                      <p className="text-xs text-yellow-700">Complete payment within 24 hours to secure your booking</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Phone className="w-4 h-4 mr-2" />
                      +62 21 1234 5678
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Mail className="w-4 h-4 mr-2" />
                      support@pakaryan.com
                    </Button>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="space-y-3">
                  {/* Payment Button */}
                  <Button className="w-full bg-orange-600 hover:bg-orange-700" asChild>
                    <Link href={`/payment/${booking.id}`}>Complete Payment</Link>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" asChild>
                    <Link href="/dashboard">View Dashboard</Link>
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download Receipt
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
