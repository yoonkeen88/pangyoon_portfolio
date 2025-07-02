"use client"

import { useState, useEffect } from "react"
import { Carousel } from "@/components/carousel"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Database, Palette, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { getFullProfile } from "@/lib/profile-service"
import type { Profile, Project } from "@/lib/profile-service"

export default function HomePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHomeData()
  }, [])

  const loadHomeData = async () => {
    try {
      const data = await getFullProfile()
      if (data) {
        setProfile(data.profile)
        setFeaturedProjects(data.projects.filter((p) => p.is_featured).slice(0, 3))
      }
    } catch (error) {
      console.error("Error loading home data:", error)
    } finally {
      setLoading(false)
    }
  }

  const featuredItems = featuredProjects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image_url || "/placeholder.svg?height=200&width=300",
    link: `/portfolio#project-${project.id}`,
  }))

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center gradient-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">포트폴리오를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20">
              <img
                src={profile?.avatar_url || "/placeholder.svg?height=128&width=128"}
                alt="프로필 사진"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              안녕하세요, <span className="text-gradient">{profile?.name || "안광윤"}</span>입니다
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              {profile?.bio || "창의적인 문제 해결과 혁신적인 기술로 더 나은 디지털 경험을 만들어갑니다."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/portfolio">
                <Button size="lg" className="w-full sm:w-auto">
                  포트폴리오 보기 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                  연락하기
                </Button>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-4">
              {profile?.github_url && (
                <Button variant="ghost" size="sm" asChild>
                  <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
              )}
              {profile?.linkedin_url && (
                <Button variant="ghost" size="sm" asChild>
                  <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              )}
              {profile?.email && (
                <Button variant="ghost" size="sm" asChild>
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Carousel */}
      {featuredItems.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">주요 프로젝트</h2>
            <Carousel items={featuredItems} />
          </div>
        </section>
      )}

      {/* Skills Overview */}
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

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">3+</div>
              <div className="text-gray-600 dark:text-gray-300">년 경험</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">{featuredProjects.length}+</div>
              <div className="text-gray-600 dark:text-gray-300">완료 프로젝트</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
              <div className="text-gray-600 dark:text-gray-300">기술 스택</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-300">만족도</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">함께 프로젝트를 시작해보세요</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">새로운 아이디어를 현실로 만들어드립니다</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">프로젝트 문의하기</Button>
            </Link>
            <Link href="/blog">
              <Button variant="outline" size="lg" className="bg-transparent">
                블로그 둘러보기
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
