"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { getTagColor } from "@/lib/design-system"
import { cn } from "@/lib/utils"

interface ThemeBadgeProps {
  children: React.ReactNode
  variant?: "default" | "tag" | "status"
  tag?: string
  className?: string
  onClick?: () => void
}

export function ThemeBadge({ children, variant = "default", tag, className, onClick }: ThemeBadgeProps) {
  let badgeClasses = ""

  if (variant === "tag" && tag) {
    badgeClasses = getTagColor(tag)
  } else if (variant === "status") {
    badgeClasses = "bg-success-light text-success dark:bg-success/20 dark:text-success"
  }

  return (
    <Badge
      className={cn(
        "transition-colors duration-normal",
        badgeClasses,
        onClick && "cursor-pointer hover:opacity-80",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Badge>
  )
}
