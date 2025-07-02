// 디자인 토큰 시스템
export const designTokens = {
  // 색상 팔레트
  colors: {
    // 브랜드 색상
    brand: {
      primary: "#3B82F6", // blue-500
      primaryHover: "#2563EB", // blue-600
      primaryLight: "#DBEAFE", // blue-100
      secondary: "#8B5CF6", // violet-500
      secondaryHover: "#7C3AED", // violet-600
      accent: "#10B981", // emerald-500
    },

    // 의미적 색상
    semantic: {
      success: "#10B981", // emerald-500
      successLight: "#D1FAE5", // emerald-100
      warning: "#F59E0B", // amber-500
      warningLight: "#FEF3C7", // amber-100
      error: "#EF4444", // red-500
      errorLight: "#FEE2E2", // red-100
      info: "#3B82F6", // blue-500
      infoLight: "#DBEAFE", // blue-100
    },

    // 중성 색상
    neutral: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },

    // 태그 색상
    tags: {
      react: { bg: "#DBEAFE", text: "#1E40AF" }, // blue
      javascript: { bg: "#FEF3C7", text: "#92400E" }, // amber
      typescript: { bg: "#DBEAFE", text: "#1E40AF" }, // blue
      python: { bg: "#D1FAE5", text: "#065F46" }, // emerald
      데이터분석: { bg: "#EDE9FE", text: "#5B21B6" }, // violet
      머신러닝: { bg: "#FEE2E2", text: "#991B1B" }, // red
      ai: { bg: "#FEE2E2", text: "#991B1B" }, // red
      frontend: { bg: "#ECFDF5", text: "#047857" }, // emerald
      backend: { bg: "#F3F4F6", text: "#374151" }, // gray
      웹개발: { bg: "#EEF2FF", text: "#3730A3" }, // indigo
      모바일: { bg: "#FCE7F3", text: "#BE185D" }, // pink
      devops: { bg: "#FED7AA", text: "#C2410C" }, // orange
      클라우드: { bg: "#E0F2FE", text: "#0C4A6E" }, // sky
      aws: { bg: "#FED7AA", text: "#C2410C" }, // orange
      css: { bg: "#DBEAFE", text: "#1E40AF" }, // blue
      "ui/ux": { bg: "#FCE7F3", text: "#BE185D" }, // pink
      디자인: { bg: "#FCE7F3", text: "#BE185D" }, // pink
      git: { bg: "#F3F4F6", text: "#374151" }, // gray
      docker: { bg: "#DBEAFE", text: "#1E40AF" }, // blue
    },
  },

  // 간격
  spacing: {
    xs: "0.5rem", // 8px
    sm: "0.75rem", // 12px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
    "4xl": "6rem", // 96px
  },

  // 타이포그래피
  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      mono: ["JetBrains Mono", "Consolas", "monospace"],
    },
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
      "6xl": "3.75rem", // 60px
    },
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },

  // 그림자
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },

  // 테두리 반경
  borderRadius: {
    sm: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    full: "9999px",
  },

  // 애니메이션
  animation: {
    duration: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
    easing: {
      ease: "ease",
      easeIn: "ease-in",
      easeOut: "ease-out",
      easeInOut: "ease-in-out",
    },
  },

  // 브레이크포인트
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
}

// 유틸리티 함수들
export const getTagColor = (tagName: string) => {
  const normalizedTag = tagName.toLowerCase()
  const tagColor = designTokens.colors.tags[normalizedTag as keyof typeof designTokens.colors.tags]

  if (tagColor) {
    return `bg-[${tagColor.bg}] text-[${tagColor.text}]`
  }

  // 기본 색상
  return `bg-[${designTokens.colors.neutral[100]}] text-[${designTokens.colors.neutral[800]}] dark:bg-[${designTokens.colors.neutral[800]}] dark:text-[${designTokens.colors.neutral[300]}]`
}

export const getContentTypeConfig = (contentType: string) => {
  const configs = {
    video: {
      icon: "📹",
      label: "시청",
      color: designTokens.colors.semantic.error,
      bgColor: designTokens.colors.semantic.errorLight,
    },
    tutorial: {
      icon: "🛠️",
      label: "따라하기",
      color: designTokens.colors.semantic.warning,
      bgColor: designTokens.colors.semantic.warningLight,
    },
    article: {
      icon: "📖",
      label: "읽기",
      color: designTokens.colors.semantic.info,
      bgColor: designTokens.colors.semantic.infoLight,
    },
  }

  return configs[contentType as keyof typeof configs] || configs.article
}

// CSS 클래스 생성 헬퍼
export const createClassName = {
  card: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20 rounded-lg shadow-sm hover:shadow-md transition-all duration-300",
  button: {
    primary: `bg-[${designTokens.colors.brand.primary}] hover:bg-[${designTokens.colors.brand.primaryHover}] text-white`,
    secondary: `bg-[${designTokens.colors.brand.secondary}] hover:bg-[${designTokens.colors.brand.secondaryHover}] text-white`,
    outline: "border border-gray-300 dark:border-gray-600 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
  },
  text: {
    primary: "text-gray-900 dark:text-white",
    secondary: "text-gray-600 dark:text-gray-300",
    muted: "text-gray-500 dark:text-gray-400",
    accent: `text-[${designTokens.colors.brand.primary}]`,
  },
  background: {
    primary: "bg-white dark:bg-gray-900",
    secondary: "bg-gray-50 dark:bg-gray-800",
    accent: "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800",
  },
}

export default designTokens
