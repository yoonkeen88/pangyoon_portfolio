"use client"

import { useState } from "react"
import Link from "next/link"
import { Carousel } from "@/components/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Eye, ArrowRight, Play, BookOpen, Wrench } from "lucide-react"
import { TagSidebar } from "@/components/tag-sidebar"

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const featuredPosts = [
    {
      id: "1",
      title: "React 18의 새로운 기능들",
      description: "Concurrent Features와 Suspense를 중심으로 살펴보는 React 18의 주요 변화점",
      image: "/placeholder.svg?height=200&width=400",
      link: "/blog/react-18-features",
    },
    {
      id: "2",
      title: "Next.js 13 App Router 완전 정복",
      description: "새로운 App Router의 모든 것을 실제 예제와 함께 알아보세요",
      image: "/placeholder.svg?height=200&width=400",
      link: "/blog/nextjs-13-app-router",
    },
    {
      id: "3",
      title: "TypeScript 고급 타입 활용법",
      description: "실무에서 유용한 TypeScript 고급 타입 패턴들을 소개합니다",
      image: "/placeholder.svg?height=200&width=400",
      link: "/blog/typescript-advanced-types",
    },
  ]

  const blogPosts = [
    {
      id: 1,
      title: "React 18의 새로운 기능들",
      excerpt: "Concurrent Features와 Suspense를 중심으로 살펴보는 React 18의 주요 변화점을 자세히 알아보겠습니다.",
      slug: "react-18-features",
      featuredImage: "/placeholder.svg?height=200&width=400",
      tags: ["React", "JavaScript", "Frontend", "웹개발"],
      viewCount: 1250,
      createdAt: "2024-01-15",
      readTime: "8분",
      contentType: "article", // 추가
    },
    {
      id: 2,
      title: "Next.js 13 App Router 완전 정복",
      excerpt:
        "새로운 App Router의 모든 것을 실제 예제와 함께 알아보고, 기존 Pages Router와의 차이점을 비교해보겠습니다.",
      slug: "nextjs-13-app-router",
      featuredImage: "/placeholder.svg?height=200&width=400",
      tags: ["Next.js", "React", "SSR", "웹개발", "Frontend"],
      viewCount: 980,
      createdAt: "2024-01-10",
      readTime: "12분",
      contentType: "video", // 추가
    },
    {
      id: 3,
      title: "TypeScript 고급 타입 활용법",
      excerpt: "실무에서 유용한 TypeScript 고급 타입 패턴들을 소개하고, 타입 안정성을 높이는 방법을 알아보겠습니다.",
      slug: "typescript-advanced-types",
      featuredImage: "/placeholder.svg?height=200&width=400",
      tags: ["TypeScript", "JavaScript", "개발도구"],
      viewCount: 756,
      createdAt: "2024-01-05",
      readTime: "10분",
      contentType: "tutorial", // 추가
    },
    {
      id: 4,
      title: "Python으로 데이터 분석 시작하기",
      excerpt: "Pandas와 Matplotlib을 활용한 기초 데이터 분석 방법을 단계별로 설명합니다.",
      slug: "python-data-analysis-basics",
      featuredImage: "/placeholder.svg?height=200&width=400",
      tags: ["Python", "데이터분석", "Pandas", "시각화"],
      viewCount: 642,
      createdAt: "2023-12-28",
      readTime: "15분",
      contentType: "article",
    },
    {
      id: 5,
      title: "머신러닝 모델 성능 최적화 기법",
      excerpt: "실제 프로젝트에서 사용할 수 있는 머신러닝 모델의 성능을 향상시키는 다양한 기법들을 소개합니다.",
      slug: "ml-model-optimization",
      featuredImage: "/placeholder.svg?height=200&width=400",
      tags: ["머신러닝", "Python", "AI", "데이터분석"],
      viewCount: 834,
      createdAt: "2023-12-25",
      readTime: "20분",
      contentType: "article",
    },
    {
      id: 6,
      title: "Supabase로 풀스택 앱 만들기",
      excerpt: "Supabase를 활용해서 인증, 데이터베이스, 실시간 기능을 포함한 풀스택 애플리케이션을 구축해보겠습니다.",
      slug: "fullstack-app-with-supabase",
      featuredImage: "/placeholder.svg?height=200&width=400",
      tags: ["Supabase", "Fullstack", "Database", "Backend"],
      viewCount: 523,
      createdAt: "2023-12-20",
      readTime: "18분",
      contentType: "tutorial",
    },
    {
      id: 7,
      title: "Docker로 개발 환경 구축하기",
      excerpt: "Docker를 활용해서 일관된 개발 환경을 구축하고, 팀 협업을 효율적으로 만드는 방법을 알아보겠습니다.",
      slug: "docker-development-environment",
      featuredImage: "/placeholder.svg?height=200&width=400",
      tags: ["Docker", "DevOps", "개발환경", "컨테이너"],
      viewCount: 712,
      createdAt: "2023-12-18",
      readTime: "14분",
      contentType: "article",
    },
    {
      id: 8,
      title: "AWS로 서버리스 아키텍처 구현하기",
      excerpt: "AWS Lambda, API Gateway, DynamoDB를 활용한 서버리스 아키텍처 설계와 구현 방법을 다룹니다.",
      slug: "aws-serverless-architecture",
      featuredImage: "/placeholder.svg?height=200&width=400",
      tags: ["AWS", "서버리스", "클라우드", "Backend"],
      viewCount: 945,
      createdAt: "2023-12-15",
      readTime: "22분",
      contentType: "article",
    },
    {
      id: 9,
      title: "CSS Grid vs Flexbox 완벽 비교",
      excerpt: "CSS Grid와 Flexbox의 차이점을 이해하고, 언제 어떤 것을 사용해야 하는지 알아보겠습니다.",
      slug: "css-grid-vs-flexbox",
      featuredImage: "/placeholder.svg?height=200&width=400",
      tags: ["CSS", "Layout", "Frontend", "웹디자인"],
      viewCount: 891,
      createdAt: "2023-12-12",
      readTime: "7분",
      contentType: "article",
    },
    {
      id: 10,
      title: "Git 고급 사용법과 협업 전략",
      excerpt: "Git의 고급 기능들과 팀 프로젝트에서 효과적인 Git 워크플로우를 구축하는 방법을 소개합니다.",
      slug: "advanced-git-collaboration",
      featuredImage: "/placeholder.svg?height=200&width=400",
      tags: ["Git", "협업", "개발도구", "버전관리"],
      viewCount: 678,
      createdAt: "2023-12-10",
      readTime: "16분",
      contentType: "video",
    },
    {
      id: 11,
      title: "UI/UX 디자인 원칙과 실무 적용",
      excerpt: "사용자 중심의 인터페이스 디자인 원칙과 실제 프로젝트에 적용하는 방법을 알아보겠습니다.",
      slug: "ui-ux-design-principles",
      featuredImage: "/placeholder.svg?height=200&width=400",
      tags: ["UI/UX", "디자인", "사용자경험", "웹디자인"],
      viewCount: 567,
      createdAt: "2023-12-08",
      readTime: "11분",
      contentType: "article",
    },
    {
      id: 12,
      title: "모바일 앱 개발: React Native vs Flutter",
      excerpt: "크로스플랫폼 모바일 앱 개발 프레임워크인 React Native와 Flutter를 비교 분석합니다.",
      slug: "react-native-vs-flutter",
      featuredImage: "/placeholder.svg?height=200&width=400",
      tags: ["모바일", "React Native", "Flutter", "크로스플랫폼"],
      viewCount: 723,
      createdAt: "2023-12-05",
      readTime: "13분",
      contentType: "article",
    },
  ]

  const getContentTypeDisplay = (contentType: string, readTime: string) => {
    switch (contentType) {
      case "video":
        return `📹 ${readTime} 시청`
      case "tutorial":
        return `🛠️ ${readTime} 따라하기`
      case "article":
      default:
        return `📖 ${readTime} 읽기`
    }
  }

  const getContentTypeIcon = (contentType: string) => {
    switch (contentType) {
      case "video":
        return <Play className="h-3 w-3" />
      case "tutorial":
        return <Wrench className="h-3 w-3" />
      case "article":
      default:
        return <BookOpen className="h-3 w-3" />
    }
  }

  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags)))
  const tagCounts = allTags
    .map((tag) => ({
      name: tag,
      count: blogPosts.filter((post) => post.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.count - a.count)

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true

    return matchesSearch && matchesTag
  })

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">개발 블로그</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">개발 경험과 학습한 내용을 공유합니다</p>
        </div>

        {/* Featured Posts Carousel */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">인기 글</h2>
          <Carousel items={featuredPosts} />
        </section>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="글 제목, 내용, 태그로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <TagSidebar tags={tagCounts} selectedTag={selectedTag} onTagSelect={setSelectedTag} />
          </div>

          {/* Blog Posts */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedTag ? `"${selectedTag}" 태그 글` : "전체 글"} ({filteredPosts.length})
              </h3>
              {selectedTag && (
                <Button variant="outline" size="sm" onClick={() => setSelectedTag(null)}>
                  필터 초기화
                </Button>
              )}
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.featuredImage || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/90 text-gray-900 flex items-center gap-1">
                          {getContentTypeIcon(post.contentType)}
                          {getContentTypeDisplay(post.contentType, post.readTime)}
                        </Badge>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            onClick={() => setSelectedTag(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>

                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {new Date(post.createdAt).toLocaleDateString("ko-KR")}
                        </div>
                        <div className="flex items-center">
                          <Eye className="mr-1 h-4 w-4" />
                          {post.viewCount.toLocaleString()}
                        </div>
                      </div>

                      <Link href={`/blog/${post.slug}`}>
                        <Button
                          variant="ghost"
                          className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20"
                        >
                          읽어보기 <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {selectedTag ? `"${selectedTag}" 태그에 해당하는 글이 없습니다.` : "검색 결과가 없습니다."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
