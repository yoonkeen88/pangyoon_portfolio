import type { Config } from "tailwindcss"
import { designTokens } from "./lib/design-system"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // 커스텀 색상 팔레트
      colors: {
        // 브랜드 색상
        brand: {
          primary: designTokens.colors.brand.primary,
          "primary-hover": designTokens.colors.brand.primaryHover,
          "primary-light": designTokens.colors.brand.primaryLight,
          secondary: designTokens.colors.brand.secondary,
          "secondary-hover": designTokens.colors.brand.secondaryHover,
          accent: designTokens.colors.brand.accent,
        },

        // 의미적 색상
        success: {
          DEFAULT: designTokens.colors.semantic.success,
          light: designTokens.colors.semantic.successLight,
        },
        warning: {
          DEFAULT: designTokens.colors.semantic.warning,
          light: designTokens.colors.semantic.warningLight,
        },
        error: {
          DEFAULT: designTokens.colors.semantic.error,
          light: designTokens.colors.semantic.errorLight,
        },
        info: {
          DEFAULT: designTokens.colors.semantic.info,
          light: designTokens.colors.semantic.infoLight,
        },

        // shadcn/ui 호환성을 위한 색상
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      // 커스텀 폰트
      fontFamily: {
        sans: designTokens.typography.fontFamily.sans,
        mono: designTokens.typography.fontFamily.mono,
      },

      // 커스텀 간격
      spacing: {
        xs: designTokens.spacing.xs,
        sm: designTokens.spacing.sm,
        md: designTokens.spacing.md,
        lg: designTokens.spacing.lg,
        xl: designTokens.spacing.xl,
        "2xl": designTokens.spacing["2xl"],
        "3xl": designTokens.spacing["3xl"],
        "4xl": designTokens.spacing["4xl"],
      },

      // 커스텀 그림자
      boxShadow: {
        "design-sm": designTokens.shadows.sm,
        "design-md": designTokens.shadows.md,
        "design-lg": designTokens.shadows.lg,
        "design-xl": designTokens.shadows.xl,
      },

      // 커스텀 애니메이션
      transitionDuration: {
        fast: designTokens.animation.duration.fast,
        normal: designTokens.animation.duration.normal,
        slow: designTokens.animation.duration.slow,
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
