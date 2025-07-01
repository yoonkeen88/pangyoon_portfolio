"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Phone, MapPin, Send, LogIn, AlertCircle } from "lucide-react"
import Link from "next/link"
import { sendContactMessage } from "./actions"

export default function ContactPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false) // 실제로는 인증 상태를 확인해야 함
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; email: string } | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null)

  // 로그인 시뮬레이션 (실제로는 Supabase Auth 사용)
  const handleLoginSimulation = () => {
    setIsLoggedIn(true)
    setCurrentUser({
      id: "user-123",
      name: "김개발",
      email: "kim.developer@example.com",
    })
    setFormData({
      ...formData,
      name: "김개발",
      email: "kim.developer@example.com",
    })
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isLoggedIn || !currentUser) {
      setSubmitResult({
        success: false,
        message: "로그인이 필요합니다.",
      })
      return
    }

    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("subject", formData.subject)
      formDataToSend.append("message", formData.message)
      formDataToSend.append("userId", currentUser.id)

      const result = await sendContactMessage(formDataToSend)
      setSubmitResult(result)

      if (result.success) {
        setFormData({ ...formData, subject: "", message: "" })
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "메시지 전송 중 오류가 발생했습니다.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">연락처</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            궁금한 점이나 협업 제안이 있으시면 언제든 연락해주세요
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="mr-2 h-5 w-5" />
                메시지 보내기
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!isLoggedIn ? (
                <div className="space-y-6">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      메시지를 보내려면 로그인이 필요합니다. 로그인 후 개발자에게 직접 메시지를 전송할 수 있습니다.
                    </AlertDescription>
                  </Alert>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/login" className="flex-1">
                      <Button className="w-full">
                        <LogIn className="mr-2 h-4 w-4" />
                        로그인하기
                      </Button>
                    </Link>
                    <Link href="/signup" className="flex-1">
                      <Button variant="outline" className="w-full">
                        회원가입하기
                      </Button>
                    </Link>
                  </div>

                  {/* 로그인 시뮬레이션 버튼 (개발용) */}
                  <div className="pt-4 border-t">
                    <Button onClick={handleLoginSimulation} variant="ghost" className="w-full text-sm">
                      🔧 로그인 시뮬레이션 (개발용)
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* 로그인 상태 표시 */}
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm text-green-700 dark:text-green-300">
                        {currentUser?.name}님으로 로그인됨
                      </span>
                    </div>
                    <Button onClick={handleLogout} variant="ghost" size="sm">
                      로그아웃
                    </Button>
                  </div>

                  {submitResult && (
                    <Alert className={submitResult.success ? "border-green-200" : "border-red-200"}>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className={submitResult.success ? "text-green-700" : "text-red-700"}>
                        {submitResult.message}
                      </AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">이름</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-white/50 dark:bg-gray-800/50"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">이메일</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-white/50 dark:bg-gray-800/50"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">제목</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="bg-white/50 dark:bg-gray-800/50"
                        placeholder="문의 제목을 입력해주세요"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">메시지</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="bg-white/50 dark:bg-gray-800/50"
                        placeholder="개발자에게 전달할 메시지를 입력해주세요..."
                        disabled={isSubmitting}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          전송 중...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          개발자에게 메시지 전송
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>연락 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">이메일</p>
                    <p className="text-gray-600 dark:text-gray-300">developer@example.com</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      로그인 후 위 폼을 통해 직접 메시지를 보내실 수 있습니다
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">전화번호</p>
                    <p className="text-gray-600 dark:text-gray-300">010-1234-5678</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">위치</p>
                    <p className="text-gray-600 dark:text-gray-300">서울, 대한민국</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>소셜 미디어</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </Button>

                <Button variant="outline" className="w-full justify-start">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </Button>

                <Button variant="outline" className="w-full justify-start">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                  Twitter
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>응답 시간</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  로그인 후 메시지를 보내주시면 보통 24시간 이내에 답변드립니다. 급한 문의사항의 경우 이메일로 직접
                  연락해주시면 더 빠른 응답이 가능합니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
