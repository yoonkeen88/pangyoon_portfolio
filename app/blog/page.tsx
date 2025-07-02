"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Carousel } from "@/components/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Eye, ArrowRight, Play, BookOpen, Wrench } from "lucide-react"
import { TagSidebar } from "@/components/tag-sidebar"
import { getBlogPosts, getPopularTags, searchBlogPosts, type BlogPost } from "@/lib/blog-service"

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])
  const [tags, setTags] = useState<Array<{ name: string; count: number }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadInitialData()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      handleSearch()
    } else if (selectedTag) {
      loadPostsByTag()
    } else {
      loadAllPosts()
    }
  }, [selectedTag])

  const loadInitialData = async () => {
    try {
      const [allPosts, popularTags, topPosts] = await Promise.all([
        getBlogPosts(),
        getPopularTags(),
        getBlogPosts(3), // Get top 3 for featured
      ])

      setPosts(allPosts)
      setTags(popularTags)
      setFeaturedPosts(topPosts)
    } catch (error) {
      console.error("Error loading initial data:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadAllPosts = async () => {
    try {
      const allPosts = await getBlogPosts()
      setPosts(allPosts)
    } catch (error) {
      console.error("Error loading posts:", error)
    }
  }

  const loadPostsByTag = async () => {
    if (!selectedTag) return

    try {
      const tagPosts = await getBlogPosts(undefined, selectedTag)
      setPosts(tagPosts)
    } catch (error) {
      console.error("Error loading posts by tag:", error)
    }
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadAllPosts()
      return
    }

    try {
      const searchResults = await searchBlogPosts(searchTerm)
      setPosts(searchResults)
    } catch (error) {
      console.error("Error searching posts:", error)
    }
  }

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

  const featuredCarouselItems = featuredPosts.map((post) => ({
    id: post.id.toString(),
    title: post.title,
    description: post.excerpt,
    image: post.featured_image || "/placeholder.svg?height=200&width=400",
    link: `/blog/${post.slug}`,
  }))

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">개발 블로그</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">개발 경험과 학습한 내용을 공유합니다</p>
        </div>

        {/* Featured Posts Carousel */}
        {featuredPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">인기 글</h2>
            <Carousel items={featuredCarouselItems} />
          </section>
        )}

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="글 제목, 내용, 태그로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <TagSidebar tags={tags} selectedTag={selectedTag} onTagSelect={setSelectedTag} />
          </div>

          {/* Blog Posts */}
          <div className="lg:col-span-3">
            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedTag ? `"${selectedTag}" 태그 글` : searchTerm ? `"${searchTerm}" 검색 결과` : "전체 글"} (
                {posts.length})
              </h3>
              {(selectedTag || searchTerm) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedTag(null)
                    setSearchTerm("")
                    loadAllPosts()
                  }}
                >
                  필터 초기화
                </Button>
              )}
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group"
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img
                        src={post.featured_image || "/placeholder.svg?height=200&width=400"}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/90 text-gray-900 flex items-center gap-1">
                          {getContentTypeIcon(post.content_type)}
                          {getContentTypeDisplay(post.content_type, post.read_time)}
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
                          {new Date(post.created_at).toLocaleDateString("ko-KR")}
                        </div>
                        <div className="flex items-center">
                          <Eye className="mr-1 h-4 w-4" />
                          {post.view_count.toLocaleString()}
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

            {posts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  {selectedTag
                    ? `"${selectedTag}" 태그에 해당하는 글이 없습니다.`
                    : searchTerm
                      ? `"${searchTerm}"에 대한 검색 결과가 없습니다.`
                      : "아직 작성된 글이 없습니다."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
