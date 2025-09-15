"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useCallback } from "react"

interface Category {
  id: string
  name: string
  icon_name: string
}

interface EquipmentFiltersProps {
  categories: Category[]
  currentParams: {
    category?: string
    location?: string
    search?: string
    minPrice?: string
    maxPrice?: string
  }
}

export function EquipmentFilters({ categories, currentParams }: EquipmentFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [priceRange, setPriceRange] = useState([
    Number.parseInt(currentParams.minPrice || "0"),
    Number.parseInt(currentParams.maxPrice || "10000000"),
  ])

  const updateFilters = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      })

      router.push(`/equipment?${params.toString()}`)
    },
    [router, searchParams],
  )

  const handleCategoryChange = (categoryName: string, checked: boolean) => {
    updateFilters({
      category: checked ? categoryName : undefined,
    })
  }

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
    updateFilters({
      minPrice: values[0] > 0 ? values[0].toString() : undefined,
      maxPrice: values[1] < 10000000 ? values[1].toString() : undefined,
    })
  }

  const clearFilters = () => {
    router.push("/equipment")
  }

  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Equipment Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={currentParams.category === category.name}
                onCheckedChange={(checked) => handleCategoryChange(category.name, checked as boolean)}
              />
              <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Daily Rate (Rp)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            max={10000000}
            min={0}
            step={100000}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-slate-600">
            <span>Rp {priceRange[0].toLocaleString("id-ID")}</span>
            <span>Rp {priceRange[1].toLocaleString("id-ID")}</span>
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {["Jakarta", "Surabaya", "Bandung", "Semarang", "Yogyakarta"].map((city) => (
              <div key={city} className="flex items-center space-x-2">
                <Checkbox
                  id={city}
                  checked={currentParams.location === city}
                  onCheckedChange={(checked) => updateFilters({ location: checked ? city : undefined })}
                />
                <Label htmlFor={city} className="text-sm font-normal cursor-pointer">
                  {city}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
        Clear All Filters
      </Button>
    </div>
  )
}
