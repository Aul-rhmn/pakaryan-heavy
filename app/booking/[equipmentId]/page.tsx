import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { BookingForm } from "@/components/booking-form"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Truck, MapPin, Calendar } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BookingPageProps {
  params: Promise<{ equipmentId: string }>
}

export default async function BookingPage({ params }: BookingPageProps) {
  const { equipmentId } = await params
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect("/auth/login?redirect=/booking/" + equipmentId)
  }

  // Fetch equipment details
  const { data: equipment, error } = await supabase
    .from("equipment")
    .select(`
      *,
      equipment_categories (
        name,
        icon_name
      )
    `)
    .eq("id", equipmentId)
    .single()

  if (error || !equipment) {
    notFound()
  }

  // Check if equipment is available
  if (equipment.availability_status !== "available") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Equipment Not Available</h2>
            <p className="text-slate-600 mb-6">This equipment is currently not available for booking.</p>
            <Button asChild>
              <Link href="/equipment">Browse Other Equipment</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">PakaryanHeavyRent</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/equipment" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">
              Equipment
            </Link>
            <Link href="/dashboard" className="text-orange-600 font-medium">
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-slate-600 hover:text-orange-600">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-8">
          <Link href={`/equipment/${equipmentId}`} className="hover:text-orange-600 flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Equipment
          </Link>
          <span>/</span>
          <span className="text-slate-900">Book Equipment</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Equipment Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                <img
                  src={equipment.images?.[0] || "/placeholder.svg?height=300&width=400"}
                  alt={equipment.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="mb-4">
                  <Badge className="bg-orange-100 text-orange-800 border-orange-200 mb-2">
                    {equipment.equipment_categories?.name}
                  </Badge>
                  <h2 className="text-xl font-bold text-slate-900 mb-1">{equipment.name}</h2>
                  <p className="text-slate-600">
                    {equipment.brand} {equipment.model} • {equipment.year_manufactured}
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    {equipment.location}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar className="w-4 h-4" />
                    Available for booking
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Daily Rate</span>
                    <span className="text-xl font-bold text-orange-600">
                      Rp {equipment.daily_rate.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <h1 className="text-2xl font-bold text-slate-900 mb-6">Complete Your Booking</h1>
                <BookingForm equipment={equipment} userId={user.id} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
