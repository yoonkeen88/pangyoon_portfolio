import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Database, Palette } from "lucide-react"

export function SkillsOverview() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">전문 분야</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="mr-2 h-5 w-5 text-blue-600" />웹 개발
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                React, Next.js, TypeScript를 활용한 모던 웹 애플리케이션 개발
              </p>
            </CardContent>
          </Card>

          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5 text-green-600" />
                데이터 분석
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                Python, SQL을 이용한 데이터 분석 및 머신러닝 모델 구축
              </p>
            </CardContent>
          </Card>

          <Card className="glass hover-lift">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="mr-2 h-5 w-5 text-purple-600" />
                UI/UX 디자인
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">사용자 중심의 직관적이고 아름다운 인터페이스 설계</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
