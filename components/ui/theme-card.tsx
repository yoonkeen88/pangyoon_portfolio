import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { createClassName } from "@/lib/design-system"
import { cn } from "@/lib/utils"

interface ThemeCardProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "glass" | "gradient"
  hover?: boolean
}

export function ThemeCard({ children, className, variant = "default", hover = true }: ThemeCardProps) {
  const baseClasses = createClassName.card

  const variantClasses = {
    default: "",
    glass: "glass",
    gradient: "gradient-bg",
  }

  const hoverClasses = hover ? "hover-lift" : ""

  return (
    <Card className={cn(baseClasses, variantClasses[variant], hoverClasses, className)}>
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  )
}
