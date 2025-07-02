"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Eye, MessageCircle, Heart, Share2 } from "lucide-react"
import Link from "next/link"
import { getBlogPostBySlug, getBlogComments, addBlogComment, type BlogPost, type BlogComment } from "@/lib/blog-service"
import { useAuth } from "@/contexts/auth-context"

export default function BlogPostPage() {
  const params = useParams()
  const { user } = useAuth()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [comments, setComments] = useState<BlogComment[]>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(true)
  const [submittingComment, setSubmittingComment] = useState(false)

  useEffect(() => {
    if (params.slug) {
      loadPostData(params.slug as string)
    }
  }, [params.slug])

  const loadPostData = async (slug: string) => {
    try {
      const [postData, commentsData] = await Promise.all([
        getBlogPostBySlug(slug),
        getBlogComments(Number.parseInt(slug)), // This needs to be fixed - we need post ID, not slug
      ])

      if (postData) {
        setPost(postData)
        // Load comments with post ID
        const actualComments = await getBlogComments(postData.id)
        setComments(actualComments)
      }
    } catch (error) {
      console.error("Error loading post data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user || !post || !newComment.trim()) return

    setSubmittingComment(true)
    try {
      const comment = await addBlogComment(post.id, newComment.trim(), user.id)
      if (comment) {
        setComments([...comments, comment])
        setNewComment("")
      }
    } catch (error) {
      console.error("Error adding comment:", error)
    } finally {
      setSubmittingComment(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">글을 찾을 수 없습니다</h1>
          <Link href="/blog">
            <Button>블로그로 돌아가기</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          {post.featured_image && (
            <img
              src={post.featured_image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
            />
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>

          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="개발자" />
                <AvatarFallback>개발자</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">개발자</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">풀스택 개발자</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {new Date(post.created_at).toLocaleDateString("ko-KR")}
              </div>
              <div className="flex items-center">
                <Eye className="mr-1 h-4 w-4" />
                {post.view_count.toLocaleString()}
              </div>
              <span>{post.read_time}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Heart className="mr-2 h-4 w-4" />
              좋아요
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              공유
            </Button>
          </div>
        </div>

        {/* Content */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mb-12">
          <CardContent className="p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: post.content.replace(/\n/g, "<br />"),
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center mb-6">
              <MessageCircle className="mr-2 h-5 w-5" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">댓글 ({comments.length})</h3>
            </div>

            {/* Comment Form */}
            {user ? (
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <Textarea
                  placeholder="댓글을 작성해주세요..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-4 bg-white/50 dark:bg-gray-800/50"
                  disabled={submittingComment}
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={submittingComment || !newComment.trim()}>
                    {submittingComment ? "작성 중..." : "댓글 작성"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300 mb-4">댓글을 작성하려면 로그인이 필요합니다.</p>
                <div className="flex space-x-2">
                  <Link href="/login">
                    <Button size="sm">로그인</Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="outline" size="sm">
                      회원가입
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={comment.user.avatar_url || "/placeholder.svg?height=40&width=40"}
                      alt={comment.user.name}
                    />
                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900 dark:text-white">{comment.user.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(comment.created_at).toLocaleDateString("ko-KR")}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                  </div>
                </div>
              ))}

              {comments.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
