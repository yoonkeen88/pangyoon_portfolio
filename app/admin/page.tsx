"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, MessageSquare, Eye, BarChart3 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { getAdminStats } from "@/lib/admin-service"
import { BlogPostManager } from "@/components/admin/blog-post-manager"
import { ContactMessageManager } from "@/components/admin/contact-message-manager"
import { ProfileManager } from "@/components/admin/profile-manager"
import { StatsOverview } from "@/components/admin/stats-overview"

export default function AdminPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalMessages: 0,
    totalViews: 0,
    recentActivity: [],
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      loadAdminData()
    }
  }, [user])

  const loadAdminData = async () => {
    try {
      const adminStats = await getAdminStats()
      setStats(adminStats)
    } catch (error) {
      console.error("Error loading admin data:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">관리자 대시보드</h1>
          <p className="text-gray-600 dark:text-gray-300">포트폴리오 사이트를 관리하세요</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">블로그 포스트</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalPosts}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">연락 메시지</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalMessages}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">총 조회수</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalViews.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">이번 달 방문</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">1,234</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="blog">블로그 관리</TabsTrigger>
            <TabsTrigger value="messages">메시지 관리</TabsTrigger>
            <TabsTrigger value="profile">프로필 관리</TabsTrigger>
            <TabsTrigger value="settings">설정</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <StatsOverview stats={stats} />
          </TabsContent>

          <TabsContent value="blog">
            <BlogPostManager />
          </TabsContent>

          <TabsContent value="messages">
            <ContactMessageManager />
          </TabsContent>

          <TabsContent value="profile">
            <ProfileManager />
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>사이트 설정</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">일반 설정</h3>
                    <p className="text-gray-600 dark:text-gray-400">사이트 기본 설정을 관리합니다.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">SEO 설정</h3>
                    <p className="text-gray-600 dark:text-gray-400">검색 엔진 최적화 설정을 관리합니다.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">백업</h3>
                    <p className="text-gray-600 dark:text-gray-400">데이터 백업 및 복원을 관리합니다.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
