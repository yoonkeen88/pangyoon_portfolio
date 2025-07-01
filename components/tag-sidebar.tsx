"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TagSidebarProps {
  tags: Array<{ name: string; count: number; color?: string }>
  selectedTag: string | null
  onTagSelect: (tag: string | null) => void
}

export function TagSidebar({ tags, selectedTag, onTagSelect }: TagSidebarProps) {
  const getTagColor = (tagName: string) => {
    const colors: Record<string, string> = {
      React: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      JavaScript: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      TypeScript: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      Python: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      데이터분석: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      머신러닝: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      AI: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      Frontend: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-300",
      Backend: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
      웹개발: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
      모바일: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      DevOps: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      클라우드: "bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-300",
      AWS: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      CSS: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      "UI/UX": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      디자인: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
      Git: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
      Docker: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    }
    return colors[tagName] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }

  return (
    <div className="space-y-6">
      {/* Popular Tags */}
      <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">인기 태그</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button
              variant={selectedTag === null ? "default" : "ghost"}
              size="sm"
              onClick={() => onTagSelect(null)}
              className="w-full justify-between"
            >
              <span>전체</span>
              <Badge variant="secondary">{tags.reduce((sum, tag) => sum + tag.count, 0)}</Badge>
            </Button>
            {tags.slice(0, 10).map((tag) => (
              <Button
                key={tag.name}
                variant={selectedTag === tag.name ? "default" : "ghost"}
                size="sm"
                onClick={() => onTagSelect(tag.name)}
                className="w-full justify-between"
              >
                <span className={`px-2 py-1 rounded text-xs ${getTagColor(tag.name)}`}>{tag.name}</span>
                <Badge variant="secondary">{tag.count}</Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Categories */}
      <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">카테고리</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[
              { name: "웹 개발", tags: ["React", "JavaScript", "TypeScript", "Frontend", "웹개발"] },
              { name: "데이터 & AI", tags: ["Python", "데이터분석", "머신러닝", "AI"] },
              { name: "백엔드 & 인프라", tags: ["Backend", "DevOps", "클라우드", "AWS", "Docker"] },
              { name: "모바일 & 디자인", tags: ["모바일", "UI/UX", "디자인", "CSS"] },
              { name: "개발 도구", tags: ["Git", "개발도구", "개발환경"] },
            ].map((category) => {
              const categoryCount = tags
                .filter((tag) => category.tags.includes(tag.name))
                .reduce((sum, tag) => sum + tag.count, 0)

              return (
                <div key={category.name} className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
                  <Badge variant="outline">{categoryCount}</Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
