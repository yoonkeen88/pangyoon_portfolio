"use client"

import type React from "react"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Eye, MessageCircle, Heart, Share2 } from "lucide-react"
import Link from "next/link"

export default function BlogPostPage() {
  const params = useParams()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([
    {
      id: 1,
      content: "정말 유익한 글이네요! React 18의 새로운 기능들을 이해하는데 많은 도움이 되었습니다.",
      author: "개발자김씨",
      avatar: "/placeholder.svg?height=40&width=40",
      createdAt: "2024-01-16T10:30:00Z",
    },
    {
      id: 2,
      content: "Concurrent Features 부분이 특히 인상깊었어요. 실제 프로젝트에 적용해보고 싶습니다.",
      author: "프론트엔드러버",
      avatar: "/placeholder.svg?height=40&width=40",
      createdAt: "2024-01-16T14:20:00Z",
    },
  ])

  // Mock blog post data
  const post = {
    title: "React 18의 새로운 기능들",
    content: `
# React 18의 새로운 기능들

React 18은 많은 새로운 기능과 개선사항을 포함하고 있습니다. 이번 글에서는 가장 중요한 변화점들을 살펴보겠습니다.

## Concurrent Features

React 18의 가장 큰 변화는 Concurrent Features입니다. 이는 React가 여러 작업을 동시에 처리할 수 있게 해주는 기능입니다.

### useTransition

\`useTransition\` 훅을 사용하면 상태 업데이트를 논블로킹으로 만들 수 있습니다:

\`\`\`javascript
import { useTransition, useState } from 'react';

function App() {
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  
  function handleClick() {
    startTransition(() => {
      setCount(c => c + 1);
    });
  }

  return (
    <div>
      {isPending && <Spinner />}
      <button onClick={handleClick}>{count}</button>
    </div>
  );
}
\`\`\`

## Suspense 개선사항

React 18에서는 Suspense가 더욱 강력해졌습니다. 이제 서버 사이드 렌더링에서도 Suspense를 사용할 수 있습니다.

## 자동 배치 (Automatic Batching)

React 18은 더 많은 경우에 상태 업데이트를 자동으로 배치합니다. 이는 성능 향상으로 이어집니다.

## 결론

React 18은 개발자 경험과 사용자 경험 모두를 크게 개선했습니다. 새로운 기능들을 활용해서 더 나은 애플리케이션을 만들어보세요!
    `,
    excerpt: "Concurrent Features와 Suspense를 중심으로 살펴보는 React 18의 주요 변화점을 자세히 알아보겠습니다.",
    featuredImage: "/placeholder.svg?height=400&width=800",
    tags: ["React", "JavaScript", "Frontend"],
    viewCount: 1250,
    createdAt: "2024-01-15T09:00:00Z",
    readTime: "8분",
    author: {
      name: "개발자",
      avatar: "/placeholder.svg?height=50&width=50",
      bio: "풀스택 개발자",
    },
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoggedIn) {
      alert("댓글을 작성하려면 로그인이 필요합니다.")
      return
    }
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        content: comment,
        author: "현재 사용자",
        avatar: "/placeholder.svg?height=40&width=40",
        createdAt: new Date().toISOString(),
      }
      setComments([...comments, newComment])
      setComment("")
    }
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <img
            src={post.featuredImage || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
          />

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
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{post.author.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{post.author.bio}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                {new Date(post.createdAt).toLocaleDateString("ko-KR")}
              </div>
              <div className="flex items-center">
                <Eye className="mr-1 h-4 w-4" />
                {post.viewCount.toLocaleString()}
              </div>
              <span>{post.readTime}</span>
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
              <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }} />
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
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <Textarea
                placeholder={isLoggedIn ? "댓글을 작성해주세요..." : "댓글을 작성하려면 로그인이 필요합니다."}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="mb-4 bg-white/50 dark:bg-gray-800/50"
                disabled={!isLoggedIn}
              />
              <div className="flex justify-between items-center">
                {!isLoggedIn ? (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    댓글을 작성하려면{" "}
                    <Link href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                      로그인
                    </Link>
                    이 필요합니다.
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="flex space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsLoggedIn(!isLoggedIn)}>
                    {isLoggedIn ? "로그아웃" : "로그인 시뮬레이션"}
                  </Button>
                  <Button type="submit" disabled={!isLoggedIn || !comment.trim()}>
                    댓글 작성
                  </Button>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <Avatar>
                    <AvatarImage src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                    <AvatarFallback>{comment.author[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-gray-900 dark:text-white">{comment.author}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString("ko-KR")}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
