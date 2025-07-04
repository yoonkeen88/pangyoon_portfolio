"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Key, Settings } from "lucide-react"
import Link from "next/link"

export default function DevSetupPage() {
  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🔧 개발 환경 설정</h1>
          <p className="text-gray-600 dark:text-gray-300">포트폴리오 사이트 개발을 위한 초기 설정을 진행합니다</p>
        </div>

        <Tabs defaultValue="manual" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual">수동 설정</TabsTrigger>
            <TabsTrigger value="guide">설정 가이드</TabsTrigger>
          </TabsList>

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
                    <h3 className="font-medium mb-2">3. 관리자 계정 로그인</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Supabase에서 생성한 관리자 계정으로 로그인하세요.
                    </p>
                    <Button size="sm" asChild>
                      <Link href="/admin/login">관리자 로그인 페이지로</Link>
                    </Button>
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
                  <h3>🎯 관리자 로그인 방법</h3>
                  <ol>
                    <li>Supabase에서 관리자 계정을 생성합니다.</li>
                    <li>/admin/login 페이지로 이동합니다.</li>
                    <li>생성한 관리자 계정으로 로그인합니다.</li>
                    <li>로그인 후 /admin 페이지에 접근할 수 있습니다.</li>
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