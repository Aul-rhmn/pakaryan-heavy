"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"

interface EquipmentGalleryProps {
  images: string[]
  name: string
}

export function EquipmentGallery({ images, name }: EquipmentGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  // Use placeholder if no images
  const displayImages = images && images.length > 0 ? images : ["/placeholder.svg?height=400&width=600"]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % displayImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + displayImages.length) % displayImages.length)
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <Card className="overflow-hidden">
        <div className="relative aspect-[4/3] bg-slate-100">
          <img
            src={displayImages[currentImage] || "/placeholder.svg"}
            alt={`${name} - Image ${currentImage + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Navigation Arrows */}
          {displayImages.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevImage}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextImage}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Expand Button */}
          <Button variant="secondary" size="icon" className="absolute top-4 right-4 bg-white/80 hover:bg-white">
            <Expand className="w-4 h-4" />
          </Button>

          {/* Image Counter */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
              {currentImage + 1} / {displayImages.length}
            </div>
          )}
        </div>
      </Card>

      {/* Thumbnail Strip */}
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                index === currentImage ? "border-orange-600" : "border-transparent hover:border-slate-300"
              }`}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${name} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
