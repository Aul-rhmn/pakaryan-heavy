import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Eye, Download } from "lucide-react"
import Link from "next/link"

interface Booking {
  id: string
  start_date: string
  end_date: string
  total_amount: number
  status: string
  delivery_address: string
  created_at: string
  equipment: {
    name: string
    brand: string
    model: string
    images: string[]
    location: string
    equipment_categories: {
      name: string
    }
  }
}

interface BookingsListProps {
  bookings: Booking[]
}

export function BookingsList({ bookings }: BookingsListProps) {
  if (!bookings || bookings.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Bookings Yet</h3>
          <p className="text-slate-600 mb-6">
            You haven't made any equipment bookings yet. Start by browsing our equipment catalog.
          </p>
          <Button asChild className="bg-orange-600 hover:bg-orange-700">
            <Link href="/equipment">Browse Equipment</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "active":
        return "bg-green-100 text-green-800 border-green-200"
      case "completed":
        return "bg-slate-100 text-slate-800 border-slate-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card key={booking.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Equipment Image */}
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                <img
                  src={booking.equipment.images?.[0] || "/placeholder.svg?height=80&width=80"}
                  alt={booking.equipment.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Booking Details */}
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{booking.equipment.name}</h3>
                    <p className="text-sm text-slate-600">
                      {booking.equipment.brand} {booking.equipment.model}
                    </p>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(booking.start_date).toLocaleDateString("id-ID")} -{" "}
                      {new Date(booking.end_date).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{booking.delivery_address}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-sm text-slate-600">Total: </span>
                    <span className="text-lg font-bold text-orange-600">
                      Rp {booking.total_amount.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/booking/confirmation/${booking.id}`}>
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      Receipt
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
