import { createClient } from "@/lib/supabase/server"
import { EquipmentGrid } from "@/components/equipment-grid"
import { EquipmentFilters } from "@/components/equipment-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, SlidersHorizontal, Truck } from "lucide-react"
import Link from "next/link"

interface SearchParams {
  category?: string
  location?: string
  search?: string
  minPrice?: string
  maxPrice?: string
}

export default async function EquipmentPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const supabase = await createClient()

  const { data: categories } = await supabase.from("equipment_categories").select("*").order("name")

  let query = supabase
    .from("equipment")
    .select(`
      *,
      equipment_categories (
        name,
        icon_name
      )
    `)
    .eq("availability_status", "available")

  if (params.category) {
    const categoryData = await supabase.from("equipment_categories").select("id").eq("name", params.category).single()

    if (categoryData.data) {
      query = query.eq("category_id", categoryData.data.id)
    }
  }

  if (params.location) {
    query = query.ilike("location", `%${params.location}%`)
  }

  if (params.search) {
    query = query.or(
      `name.ilike.%${params.search}%,description.ilike.%${params.search}%,brand.ilike.%${params.search}%`,
    )
  }

  if (params.minPrice) {
    query = query.gte("daily_rate", Number.parseInt(params.minPrice))
  }

  if (params.maxPrice) {
    query = query.lte("daily_rate", Number.parseInt(params.maxPrice))
  }

  const { data: equipment, error } = await query.order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching equipment:", error)
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Heavy Equipment Rental</h1>
          <p className="text-lg text-slate-600">
            Browse our extensive fleet of construction equipment available across Java Island
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <form method="GET" className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                name="search"
                placeholder="Search equipment, brand, or model..."
                className="pl-10 h-12 text-base"
                defaultValue={params.search || ""}
              />
            </div>
            <div className="lg:w-64 relative">
              <Input
                name="location"
                placeholder="Location"
                className="h-12 text-base"
                defaultValue={params.location || ""}
              />
            </div>
            <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white h-12 px-8">
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </form>

          {/* Filter Toggle */}
          <div className="flex justify-between items-center">
            <p className="text-slate-600">{equipment?.length || 0} equipment available</p>
            <Button variant="outline" className="lg:hidden bg-transparent">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <EquipmentFilters categories={categories || []} currentParams={params} />
          </div>

          {/* Equipment Grid */}
          <div className="lg:col-span-3">
            <EquipmentGrid equipment={equipment || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
