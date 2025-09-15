"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, MapPin, Clock } from "lucide-react"
import Link from "next/link"

interface Equipment {
  id: string
  name: string
  daily_rate: number
  weekly_rate?: number
  monthly_rate?: number
  location: string
}

interface BookingCardProps {
  equipment: Equipment
}

export function BookingCard({ equipment }: BookingCardProps) {
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [requirements, setRequirements] = useState("")

  const calculateDays = () => {
    if (!startDate || !endDate) return 0
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
  }

  const days = calculateDays()
  const totalAmount = days * equipment.daily_rate

  return (
    <Card className="border-2 border-orange-100">
      <CardHeader>
        <CardTitle className="text-xl">Book This Equipment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Pricing */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-600">Daily Rate</span>
            <span className="text-2xl font-bold text-orange-600">
              Rp {equipment.daily_rate.toLocaleString("id-ID")}
            </span>
          </div>

          {equipment.weekly_rate && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Weekly Rate</span>
              <span className="text-slate-900 font-medium">Rp {equipment.weekly_rate.toLocaleString("id-ID")}</span>
            </div>
          )}

          {equipment.monthly_rate && (
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">Monthly Rate</span>
              <span className="text-slate-900 font-medium">Rp {equipment.monthly_rate.toLocaleString("id-ID")}</span>
            </div>
          )}
        </div>

        {/* Date Selection */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="start-date" className="text-sm font-medium">
                Start Date
              </Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <Label htmlFor="end-date" className="text-sm font-medium">
                End Date
              </Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          {/* Duration and Total */}
          {days > 0 && (
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-600">Duration</span>
                <span className="font-medium">
                  {days} day{days > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-900 font-medium">Total Amount</span>
                <span className="text-xl font-bold text-orange-600">Rp {totalAmount.toLocaleString("id-ID")}</span>
              </div>
            </div>
          )}
        </div>

        {/* Delivery Address */}
        <div>
          <Label htmlFor="delivery-address" className="text-sm font-medium">
            Delivery Address
          </Label>
          <Textarea
            id="delivery-address"
            placeholder="Enter your project site address..."
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            rows={3}
          />
        </div>

        {/* Special Requirements */}
        <div>
          <Label htmlFor="requirements" className="text-sm font-medium">
            Special Requirements (Optional)
          </Label>
          <Textarea
            id="requirements"
            placeholder="Any special requirements or notes..."
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            rows={2}
          />
        </div>

        {/* Booking Actions */}
        <div className="space-y-3">
          <Button
            className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12"
            disabled={!startDate || !endDate || !deliveryAddress}
            asChild
          >
            <Link href="/auth/login">Book Now - Rp {totalAmount.toLocaleString("id-ID")}</Link>
          </Button>

          <Button variant="outline" className="w-full bg-transparent">
            Request Quote
          </Button>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>Free delivery within {equipment.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>24/7 technical support included</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Flexible booking terms</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
