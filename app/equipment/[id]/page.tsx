import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Share2, Heart, Truck, Shield, Clock, ArrowLeft, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { EquipmentGallery } from "@/components/equipment-gallery"
import { BookingCard } from "@/components/booking-card"

interface EquipmentDetailsProps {
  params: Promise<{ id: string }>
}

export default async function EquipmentDetailsPage({ params }: EquipmentDetailsProps) {
  const { id } = await params
  const supabase = await createClient()

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
    .eq("id", id)
    .single()

  if (error || !equipment) {
    notFound()
  }

  // Fetch similar equipment
  const { data: similarEquipment } = await supabase
    .from("equipment")
    .select(`
      id,
      name,
      daily_rate,
      images,
      location,
      equipment_categories (name)
    `)
    .eq("category_id", equipment.category_id)
    .neq("id", id)
    .eq("availability_status", "available")
    .limit(3)

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
            <Link href="/equipment" className="text-orange-600 font-medium">
              Equipment
            </Link>
            <Link href="/about" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-slate-600 hover:text-orange-600 font-medium transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-slate-600 hover:text-orange-600">
                Login
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
          <Link href="/equipment" className="hover:text-orange-600 flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" />
            Back to Equipment
          </Link>
          <span>/</span>
          <span>{equipment.equipment_categories?.name}</span>
          <span>/</span>
          <span className="text-slate-900">{equipment.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Equipment Gallery */}
            <EquipmentGallery images={equipment.images || []} name={equipment.name} />

            {/* Equipment Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                      {equipment.equipment_categories?.name}
                    </Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                      Available
                    </Badge>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{equipment.name}</h1>
                  <p className="text-lg text-slate-600">
                    {equipment.brand} {equipment.model} • {equipment.year_manufactured}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-600 mb-6">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {equipment.location}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  4.8 (24 reviews)
                </div>
              </div>

              <p className="text-slate-700 text-lg leading-relaxed">{equipment.description}</p>
            </div>

            {/* Features */}
            {equipment.features && equipment.features.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Features & Equipment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {equipment.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Specifications */}
            {equipment.specifications && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(equipment.specifications as Record<string, any>).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b border-slate-100 last:border-0">
                        <span className="text-slate-600 capitalize">{key.replace("_", " ")}</span>
                        <span className="text-slate-900 font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Safety & Support */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Safety & Support</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-1">Safety Certified</h4>
                    <p className="text-sm text-slate-600">Regular safety inspections and maintenance</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-1">24/7 Support</h4>
                    <p className="text-sm text-slate-600">Round-the-clock technical assistance</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Truck className="w-6 h-6 text-orange-600" />
                    </div>
                    <h4 className="font-semibold text-slate-900 mb-1">Free Delivery</h4>
                    <p className="text-sm text-slate-600">Delivery and pickup included</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <BookingCard equipment={equipment} />

              {/* Contact Card */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Need Help?</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Phone className="w-4 h-4 mr-2" />
                      Call: +62 21 1234 5678
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Similar Equipment */}
        {similarEquipment && similarEquipment.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Similar Equipment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarEquipment.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={item.images?.[0] || "/placeholder.svg?height=200&width=300"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-slate-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-slate-600 mb-2">{item.location}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-orange-600 font-semibold">
                        Rp {item.daily_rate.toLocaleString("id-ID")}/day
                      </span>
                      <Button size="sm" asChild>
                        <Link href={`/equipment/${item.id}`}>View</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
