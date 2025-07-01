import { Carousel } from "@/components/carousel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Database, Palette } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const featuredItems = [
    {
      id: "1",
      title: "React와 Next.js로 만든 포트폴리오",
      description: "최신 웹 기술을 활용한 반응형 포트폴리오 웹사이트입니다.",
      image: "/placeholder.svg?height=200&width=300",
      link: "/portfolio",
    },
    {
      id: "2",
      title: "데이터 분석 프로젝트",
      description: "Python과 머신러닝을 활용한 데이터 분석 사례를 소개합니다.",
      image: "/placeholder.svg?height=200&width=300",
      link: "/blog/data-analysis",
    },
    {
      id: "3",
      title: "풀스택 개발 경험",
      description: "프론트엔드부터 백엔드까지 전체 개발 과정을 다룹니다.",
      image: "/placeholder.svg?height=200&width=300",
      link: "/about",
    },
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              안녕하세요! 
              <br></br>
              <span className="text-blue-600">개발자 안광윤</span>입니다
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              창의적인 문제 해결과 혁신적인 기술로 더 나은 디지털 경험을 만들어갑니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portfolio">
                <Button size="lg" className="w-full sm:w-auto">
                  포트폴리오 보기 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  연락하기
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Carousel */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">주요 프로젝트 & 글</h2>
          <Carousel items={featuredItems} />
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">전문 분야</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
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

            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
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

            <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
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

      {/* Recent Blog Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">최근 블로그 글</h2>
            <Link href="/blog">
              <Button variant="outline">
                모든 글 보기 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <img
                    src={`/placeholder.svg?height=200&width=400`}
                    alt={`Blog post ${i}`}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">블로그 포스트 제목 {i}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    블로그 포스트의 간단한 설명이 여기에 들어갑니다...
                  </p>
                  <Button variant="ghost" size="sm">
                    읽어보기 <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
