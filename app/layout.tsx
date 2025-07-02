import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/auth-context"
import { Navbar } from "@/components/navbar"
import { DebugInfo } from "@/components/debug-info"
import { DevLoginHelper } from "@/components/dev-login-helper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "안광윤 - 개발자 포트폴리오",
  description: "창의적인 문제 해결과 혁신적인 기술로 더 나은 디지털 경험을 만들어갑니다.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
            <DebugInfo />
            <DevLoginHelper />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
