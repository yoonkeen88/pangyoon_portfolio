"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface CarouselItem {
  id: string
  title: string
  description: string
  image: string
  link?: string
}

interface CarouselProps {
  items: CarouselItem[]
  autoPlay?: boolean
  interval?: number
}

export function Carousel({ items, autoPlay = true, interval = 5000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, interval, items.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
  }

  if (items.length === 0) return null

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0">
              <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-0">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                    <div className="w-full md:w-1/3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="w-full md:w-2/3">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                      {item.link && (
                        <Button asChild>
                          <a href={item.link}>자세히 보기</a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {items.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            onClick={goToNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <div className="flex justify-center mt-4 space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
