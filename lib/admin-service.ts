import { supabase } from "./supabase"

// 관리자 통계 가져오기
export async function getAdminStats() {
  try {
    const [postsResult, messagesResult, viewsResult] = await Promise.all([
      supabase.from("blog_posts").select("id", { count: "exact" }),
      supabase.from("contact_messages").select("id", { count: "exact" }),
      supabase.from("blog_posts").select("view_count"),
    ])

    const totalViews = viewsResult.data?.reduce((sum, post) => sum + (post.view_count || 0), 0) || 0

    return {
      totalPosts: postsResult.count || 0,
      totalMessages: messagesResult.count || 0,
      totalViews,
      recentActivity: [], // 실제로는 최근 활동 데이터를 가져와야 함
    }
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return {
      totalPosts: 0,
      totalMessages: 0,
      totalViews: 0,
      recentActivity: [],
    }
  }
}

// 연락 메시지 가져오기
export async function getContactMessages() {
  try {
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching contact messages:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching contact messages:", error)
    return []
  }
}

// 메시지 상태 업데이트
export async function updateMessageStatus(messageId: number, status: string) {
  try {
    const { error } = await supabase.from("contact_messages").update({ status }).eq("id", messageId)

    if (error) {
      console.error("Error updating message status:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error updating message status:", error)
    return false
  }
}

// 블로그 포스트 생성
export async function createBlogPost(postData: any) {
  try {
    const { data, error } = await supabase.from("blog_posts").insert(postData).select().single()

    if (error) {
      console.error("Error creating blog post:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error creating blog post:", error)
    return null
  }
}

// 블로그 포스트 업데이트
export async function updateBlogPost(postId: number, postData: any) {
  try {
    const { data, error } = await supabase.from("blog_posts").update(postData).eq("id", postId).select().single()

    if (error) {
      console.error("Error updating blog post:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error updating blog post:", error)
    return null
  }
}

// 블로그 포스트 삭제
export async function deleteBlogPost(postId: number) {
  try {
    const { error } = await supabase.from("blog_posts").delete().eq("id", postId)

    if (error) {
      console.error("Error deleting blog post:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return false
  }
}
