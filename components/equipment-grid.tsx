import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Star, Eye } from "lucide-react"
import Link from "next/link"

interface Equipment {
  id: string
  name: string
  description: string
  daily_rate: number
  weekly_rate?: number
  monthly_rate?: number
  location: string
  brand: string
  model: string
  year_manufactured: number
  images: string[]
  features: string[]
  equipment_categories: {
    name: string
    icon_name: string
  }
}

interface EquipmentGridProps {
  equipment: Equipment[]
}

export function EquipmentGrid({ equipment }: EquipmentGridProps) {
  if (!equipment || equipment.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="w-12 h-12 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">No Equipment Found</h3>
        <p className="text-slate-600 mb-6">
          Try adjusting your search criteria or filters to find what you're looking for.
        </p>
        <Button variant="outline" asChild>
          <Link href="/equipment">Clear Filters</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {equipment.map((item) => (
        <Card
          key={item.id}
          className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden"
        >
          <div className="aspect-[4/3] overflow-hidden relative">
            <img
              src={item.images?.[0] || "/placeholder.svg?height=300&width=400"}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 left-3">
              <Badge className="bg-white/90 text-slate-900 hover:bg-white">{item.equipment_categories?.name}</Badge>
            </div>
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                Available
              </Badge>
            </div>
          </div>

          <CardContent className="p-6">
            <div className="mb-3">
              <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
                {item.name}
              </h3>
              <p className="text-sm text-slate-600">
                {item.brand} {item.model} • {item.year_manufactured}
              </p>
            </div>

            <p className="text-slate-600 text-sm mb-4 line-clamp-2">{item.description}</p>

            <div className="flex items-center text-sm text-slate-600 mb-4">
              <MapPin className="w-4 h-4 mr-1" />
              {item.location}
            </div>

            {/* Features */}
            {item.features && item.features.length > 0 && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {item.features.slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {item.features.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.features.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Pricing */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-orange-600">Rp {item.daily_rate.toLocaleString("id-ID")}</span>
                <span className="text-sm text-slate-600">/day</span>
              </div>
              {item.weekly_rate && (
                <p className="text-sm text-slate-600">Weekly: Rp {item.weekly_rate.toLocaleString("id-ID")}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button asChild className="flex-1 bg-orange-600 hover:bg-orange-700">
                <Link href={`/equipment/${item.id}`}>View Details</Link>
              </Button>
              <Button variant="outline" size="icon" className="shrink-0 bg-transparent">
                <Star className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
