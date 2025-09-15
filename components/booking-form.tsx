"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, MapPin, Clock, CreditCard, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Equipment {
  id: string
  name: string
  daily_rate: number
  weekly_rate?: number
  monthly_rate?: number
  location: string
}

interface BookingFormProps {
  equipment: Equipment
  userId: string
}

export function BookingForm({ equipment, userId }: BookingFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    deliveryAddress: "",
    specialRequirements: "",
    contactPhone: "",
    projectName: "",
  })

  const calculateDays = () => {
    if (!formData.startDate || !formData.endDate) return 0
    const start = new Date(formData.startDate)
    const end = new Date(formData.endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  }

  const days = calculateDays()
  const subtotal = days * equipment.daily_rate
  const deliveryFee = 0 // Free delivery
  const totalAmount = subtotal + deliveryFee

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  const validateForm = () => {
    if (!formData.startDate || !formData.endDate) {
      setError("Please select both start and end dates")
      return false
    }

    if (!formData.deliveryAddress.trim()) {
      setError("Please provide a delivery address")
      return false
    }

    if (!formData.contactPhone.trim()) {
      setError("Please provide a contact phone number")
      return false
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      setError("End date must be after start date")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()

      // Create booking
      const { data: booking, error: bookingError } = await supabase
        .from("bookings")
        .insert({
          user_id: userId,
          equipment_id: equipment.id,
          start_date: formData.startDate,
          end_date: formData.endDate,
          total_amount: totalAmount,
          delivery_address: formData.deliveryAddress,
          special_requirements: formData.specialRequirements || null,
          status: "pending",
        })
        .select()
        .single()

      if (bookingError) throw bookingError

      // Redirect to booking confirmation
      router.push(`/booking/confirmation/${booking.id}`)
    } catch (error: any) {
      console.error("Booking error:", error)
      setError(error.message || "Failed to create booking. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Rental Period */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Rental Period
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="start-date">Start Date</Label>
            <Input
              id="start-date"
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
          <div>
            <Label htmlFor="end-date">End Date</Label>
            <Input
              id="end-date"
              type="date"
              value={formData.endDate}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
              min={formData.startDate || new Date().toISOString().split("T")[0]}
              required
            />
          </div>
        </div>

        {days > 0 && (
          <div className="bg-orange-50 p-4 rounded-lg">
            <p className="text-sm text-slate-600">
              Rental duration:{" "}
              <span className="font-medium text-slate-900">
                {days} day{days > 1 ? "s" : ""}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Delivery Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Delivery Information
        </h3>

        <div>
          <Label htmlFor="delivery-address">Project Site Address *</Label>
          <Textarea
            id="delivery-address"
            placeholder="Enter the complete address where the equipment should be delivered..."
            value={formData.deliveryAddress}
            onChange={(e) => handleInputChange("deliveryAddress", e.target.value)}
            rows={3}
            required
          />
        </div>
      </div>

      {/* Project Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Project Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="project-name">Project Name (Optional)</Label>
            <Input
              id="project-name"
              placeholder="e.g., Office Building Construction"
              value={formData.projectName}
              onChange={(e) => handleInputChange("projectName", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="contact-phone">Contact Phone *</Label>
            <Input
              id="contact-phone"
              type="tel"
              placeholder="+62 812 3456 7890"
              value={formData.contactPhone}
              onChange={(e) => handleInputChange("contactPhone", e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="special-requirements">Special Requirements (Optional)</Label>
          <Textarea
            id="special-requirements"
            placeholder="Any special requirements, operator needs, or additional notes..."
            value={formData.specialRequirements}
            onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
            rows={3}
          />
        </div>
      </div>

      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Booking Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-600">
                Equipment rental ({days} day{days > 1 ? "s" : ""})
              </span>
              <span className="font-medium">Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Delivery & pickup</span>
              <span className="font-medium text-green-600">Free</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span className="text-orange-600">Rp {totalAmount.toLocaleString("id-ID")}</span>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">What's Included:</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Free delivery and pickup within {equipment.location}</li>
              <li>• 24/7 technical support</li>
              <li>• Regular maintenance during rental</li>
              <li>• Insurance coverage</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex gap-4">
        <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">
          Back
        </Button>
        <Button type="submit" disabled={isLoading || days === 0} className="flex-1 bg-orange-600 hover:bg-orange-700">
          {isLoading ? "Processing..." : `Confirm Booking - Rp ${totalAmount.toLocaleString("id-ID")}`}
        </Button>
      </div>

      <p className="text-xs text-slate-500 text-center">
        By confirming this booking, you agree to our Terms of Service and Privacy Policy. Payment will be processed
        after booking confirmation.
      </p>
    </form>
  )
}
