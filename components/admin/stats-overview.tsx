"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp } from "lucide-react"

interface StatsOverviewProps {
  stats: {
    totalPosts: number
    totalMessages: number
    totalViews: number
    recentActivity: any[]
  }
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              최근 활동
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-sm">새 블로그 포스트 "React 성능 최적화" 작성</span>
                </div>
                <span className="text-xs text-gray-500">2시간 전</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">연락 메시지 3개 답변 완료</span>
                </div>
                <span className="text-xs text-gray-500">1일 전</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                  <span className="text-sm">프로필 정보 업데이트</span>
                </div>
                <span className="text-xs text-gray-500">3일 전</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>빠른 작업</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full p-3 text-left bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="font-medium text-sm">새 블로그 포스트</div>
              <div className="text-xs text-gray-500">새로운 글 작성하기</div>
            </button>
            <button className="w-full p-3 text-left bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="font-medium text-sm">프로젝트 추가</div>
              <div className="text-xs text-gray-500">새 프로젝트 등록</div>
            </button>
            <button className="w-full p-3 text-left bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <div className="font-medium text-sm">메시지 확인</div>
              <div className="text-xs text-gray-500">읽지 않은 메시지 보기</div>
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            이번 달 통계
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">12</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">새 방문자</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">새 메시지</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">2</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">새 포스트</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">89%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">만족도</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Popular Content */}
      <Card>
        <CardHeader>
          <CardTitle>인기 콘텐츠</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium text-sm">Next.js 13 App Router 가이드</div>
                <div className="text-xs text-gray-500">블로그 포스트</div>
              </div>
              <Badge variant="secondary">1,234 조회</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium text-sm">전자상거래 플랫폼 프로젝트</div>
                <div className="text-xs text-gray-500">포트폴리오</div>
              </div>
              <Badge variant="secondary">856 조회</Badge>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium text-sm">React 성능 최적화 팁</div>
                <div className="text-xs text-gray-500">블로그 포스트</div>
              </div>
              <Badge variant="secondary">642 조회</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
