"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Copy, Key, Settings } from "lucide-react"
import { signUp, signIn } from "@/lib/auth-service"

export default function DevSetupPage() {
  const [setupStep, setSetupStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<string[]>([])

  const addResult = (message: string) => {
    setResults((prev) => [...prev, message])
  }

  const runFullSetup = async () => {
    setLoading(true)
    setResults([])
    setSetupStep(0)

    try {
      // Step 1: 환경변수 확인
      setSetupStep(1)
      addResult("🔍 환경변수 확인 중...")

      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        addResult("❌ Supabase 환경변수가 설정되지 않았습니다!")
        addResult("💡 .env.local 파일을 확인해주세요")
        return
      }
      addResult("✅ Supabase 환경변수 확인 완료")

      // Step 2: 개발자 계정 생성
      setSetupStep(2)
      addResult("👤 개발자 계정 생성 중...")

      const devEmail = "developer@portfolio.dev"
      const devPassword = "dev123456"
      const devName = "안광윤 (개발자)"

      const signUpResult = await signUp(devEmail, devPassword, devName)

      if (signUpResult.error && !signUpResult.error.includes("already registered")) {
        addResult(`❌ 계정 생성 실패: ${signUpResult.error}`)
        return
      }

      if (signUpResult.error?.includes("already registered")) {
        addResult("ℹ️ 개발자 계정이 이미 존재합니다")
      } else {
        addResult("✅ 개발자 계정 생성 완료")
      }

      // Step 3: 로그인 테스트
      setSetupStep(3)
      addResult("🔑 로그인 테스트 중...")

      const signInResult = await signIn(devEmail, devPassword)

      if (signInResult.error) {
        addResult(`❌ 로그인 실패: ${signInResult.error}`)
        return
      }

      addResult("✅ 로그인 테스트 성공")

      // Step 4: 완료
      setSetupStep(4)
      addResult("🎉 개발 환경 설정 완료!")
      addResult("🚀 이제 /admin 페이지에 접근할 수 있습니다")
    } catch (error) {
      addResult(`❌ 오류 발생: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const copyCredentials = () => {
    const credentials = `이메일: developer@portfolio.dev
비밀번호: dev123456`
    navigator.clipboard.writeText(credentials)
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🔧 개발 환경 설정</h1>
          <p className="text-gray-600 dark:text-gray-300">포트폴리오 사이트 개발을 위한 초기 설정을 진행합니다</p>
        </div>

        <Tabs defaultValue="quick" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quick">빠른 설정</TabsTrigger>
            <TabsTrigger value="manual">수동 설정</TabsTrigger>
            <TabsTrigger value="guide">설정 가이드</TabsTrigger>
          </TabsList>

          <TabsContent value="quick">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  자동 설정 실행
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div>
                    <h3 className="font-medium">원클릭 설정</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      개발자 계정 생성부터 로그인까지 자동으로 처리합니다
                    </p>
                  </div>
                  <Button onClick={runFullSetup} disabled={loading} size="lg">
                    {loading ? "설정 중..." : "🚀 자동 설정 시작"}
                  </Button>
                </div>

                {/* 진행 상황 */}
                {setupStep > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${setupStep >= 1 ? "bg-green-500" : "bg-gray-300"}`} />
                      <span className={setupStep >= 1 ? "text-green-600" : "text-gray-500"}>환경변수 확인</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${setupStep >= 2 ? "bg-green-500" : "bg-gray-300"}`} />
                      <span className={setupStep >= 2 ? "text-green-600" : "text-gray-500"}>개발자 계정 생성</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${setupStep >= 3 ? "bg-green-500" : "bg-gray-300"}`} />
                      <span className={setupStep >= 3 ? "text-green-600" : "text-gray-500"}>로그인 테스트</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-4 h-4 rounded-full ${setupStep >= 4 ? "bg-green-500" : "bg-gray-300"}`} />
                      <span className={setupStep >= 4 ? "text-green-600" : "text-gray-500"}>설정 완료</span>
                    </div>
                  </div>
                )}

                {/* 결과 로그 */}
                {results.length > 0 && (
                  <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-60 overflow-y-auto">
                    {results.map((result, index) => (
                      <div key={index}>{result}</div>
                    ))}
                  </div>
                )}

                {/* 로그인 정보 */}
                {setupStep >= 4 && (
                  <Alert>
                    <Key className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <p className="font-medium">개발자 로그인 정보:</p>
                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm">
                          <div>이메일: developer@portfolio.dev</div>
                          <div>비밀번호: dev123456</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={copyCredentials}>
                            <Copy className="mr-1 h-3 w-3" />
                            복사
                          </Button>
                          <Button size="sm" asChild>
                            <a href="/login">로그인 페이지로</a>
                          </Button>
                          <Button size="sm" asChild>
                            <a href="/admin">관리자 대시보드</a>
                          </Button>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manual">
            <Card>
              <CardHeader>
                <CardTitle>수동 설정</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">1. 환경변수 설정</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      .env.local 파일에 Supabase 정보를 추가하세요:
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm">
                      <div>NEXT_PUBLIC_SUPABASE_URL=your_supabase_url</div>
                      <div>NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key</div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">2. 데이터베이스 설정</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Supabase에서 SQL 스크립트를 실행하세요:
                    </p>
                    <Button size="sm" variant="outline">
                      SQL 스크립트 보기
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">3. 개발자 계정 생성</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      /signup 페이지에서 계정을 생성하거나 아래 정보를 사용하세요:
                    </p>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm">
                      <div>이메일: developer@portfolio.dev</div>
                      <div>비밀번호: dev123456</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guide">
            <Card>
              <CardHeader>
                <CardTitle>상세 설정 가이드</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h3>🎯 개발자 로그인 방법</h3>

                  <h4>방법 1: 자동 설정 (추천)</h4>
                  <ol>
                    <li>위의 "빠른 설정" 탭에서 "자동 설정 시작" 클릭</li>
                    <li>설정 완료 후 제공되는 로그인 정보 사용</li>
                    <li>/admin 페이지 접근</li>
                  </ol>

                  <h4>방법 2: 수동 로그인</h4>
                  <ol>
                    <li>/login 페이지로 이동</li>
                    <li>이메일: developer@portfolio.dev</li>
                    <li>비밀번호: dev123456</li>
                    <li>로그인 후 /admin 접근</li>
                  </ol>

                  <h4>방법 3: 새 계정 생성</h4>
                  <ol>
                    <li>/signup 페이지에서 새 계정 생성</li>
                    <li>생성한 계정으로 로그인</li>
                    <li>/admin 페이지 접근</li>
                  </ol>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>주의:</strong> 개발 환경에서만 사용하세요. 프로덕션에서는 보안을 위해 다른 인증 방법을
                      사용해야 합니다.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
