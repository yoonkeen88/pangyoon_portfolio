"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Copy, Key, Database } from "lucide-react"
import { signUp, signIn } from "@/lib/auth-service"
import { useAuth } from "@/contexts/auth-context"

export function DevLoginHelper() {
  const { user, refreshUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  // 개발자 계정 자동 생성
  const createDevAccount = async () => {
    setLoading(true)
    setResult(null)

    try {
      const devEmail = "developer@portfolio.dev"
      const devPassword = "dev123456"
      const devName = "안광윤 (개발자)"

      // 먼저 회원가입 시도
      const signUpResult = await signUp(devEmail, devPassword, devName)

      if (signUpResult.error && !signUpResult.error.includes("already registered")) {
        setResult({ success: false, message: `회원가입 실패: ${signUpResult.error}` })
        return
      }

      // 로그인 시도
      const signInResult = await signIn(devEmail, devPassword)

      if (signInResult.error) {
        setResult({ success: false, message: `로그인 실패: ${signInResult.error}` })
        return
      }

      await refreshUser()
      setResult({
        success: true,
        message: "개발자 계정으로 로그인 성공! 이제 /admin 페이지에 접근할 수 있습니다.",
      })
    } catch (error) {
      setResult({ success: false, message: `오류 발생: ${error}` })
    } finally {
      setLoading(false)
    }
  }

  // 테스트 로그인
  const testLogin = async () => {
    setLoading(true)
    setResult(null)

    try {
      const result = await signIn("developer@portfolio.dev", "dev123456")

      if (result.error) {
        setResult({ success: false, message: `로그인 실패: ${result.error}` })
        return
      }

      await refreshUser()
      setResult({ success: true, message: "테스트 로그인 성공!" })
    } catch (error) {
      setResult({ success: false, message: `오류 발생: ${error}` })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 w-80 z-50">
      <Card className="bg-black/90 text-white border-gray-700">
        <CardHeader>
          <CardTitle className="text-green-400 flex items-center">
            <Key className="mr-2 h-4 w-4" />🔧 개발자 로그인 도우미
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user ? (
            <div className="space-y-2">
              <Badge className="bg-green-600">✅ 로그인됨</Badge>
              <p className="text-sm text-green-300">
                {user.name} ({user.email})
              </p>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <a href="/admin">관리자 대시보드 열기</a>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs text-gray-300">
                <p className="font-medium mb-1">🎯 빠른 로그인 방법:</p>
              </div>

              <Button onClick={createDevAccount} disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
                {loading ? "처리 중..." : "🚀 개발자 계정 생성 & 로그인"}
              </Button>

              <Button
                onClick={testLogin}
                disabled={loading}
                variant="outline"
                className="w-full border-gray-600 text-white hover:bg-gray-800 bg-transparent"
              >
                {loading ? "로그인 중..." : "🔑 테스트 로그인"}
              </Button>

              <div className="text-xs space-y-2 pt-2 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">이메일:</span>
                  <div className="flex items-center space-x-1">
                    <code className="text-green-300">developer@portfolio.dev</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-4 w-4 p-0"
                      onClick={() => copyToClipboard("developer@portfolio.dev")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">비밀번호:</span>
                  <div className="flex items-center space-x-1">
                    <code className="text-green-300">dev123456</code>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-4 w-4 p-0"
                      onClick={() => copyToClipboard("dev123456")}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {result && (
            <Alert className={result.success ? "border-green-600" : "border-red-600"}>
              <AlertDescription className={result.success ? "text-green-300" : "text-red-300"}>
                {result.message}
              </AlertDescription>
            </Alert>
          )}

          <div className="text-xs text-gray-400 pt-2 border-t border-gray-700">
            <p className="flex items-center">
              <Database className="mr-1 h-3 w-3" />
              Supabase 연결: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅" : "❌"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
