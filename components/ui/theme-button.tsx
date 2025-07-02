"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { createClassName } from "@/lib/design-system"
import { cn } from "@/lib/utils"

interface ThemeButtonProps {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export function ThemeButton({
  children,
  variant = "primary",
  size = "md",
  className,
  onClick,
  disabled,
  type = "button",
}: ThemeButtonProps) {
  const variantClasses = createClassName.button[variant]

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  }

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn("focus-ring transition-all duration-normal", variantClasses, sizeClasses[size], className)}
    >
      {children}
    </Button>
  )
}
