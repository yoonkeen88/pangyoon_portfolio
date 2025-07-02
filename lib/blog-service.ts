import { supabase } from "./supabase"

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string | null
  view_count: number
  content_type: "article" | "video" | "tutorial"
  read_time: string
  created_at: string
  updated_at: string
  tags: string[]
}

export interface BlogTag {
  id: number
  name: string
  color: string | null
  count: number
}

export interface BlogComment {
  id: number
  content: string
  created_at: string
  user: {
    id: string
    name: string
    avatar_url: string | null
  }
}

export async function getBlogPosts(limit?: number, tag?: string) {
  let query = supabase
    .from("blog_posts")
    .select(`
      *,
      blog_post_tags!inner(
        blog_tags(name, color)
      )
    `)
    .order("created_at", { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  if (tag) {
    query = query.eq("blog_post_tags.blog_tags.name", tag)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }

  // Transform data to include tags array
  const posts =
    data?.map((post) => ({
      ...post,
      tags: post.blog_post_tags?.map((pt: any) => pt.blog_tags.name) || [],
    })) || []

  return posts as BlogPost[]
}

export async function getBlogPostBySlug(slug: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_post_tags(
        blog_tags(name, color)
      )
    `)
    .eq("slug", slug)
    .single()

  if (error) {
    console.error("Error fetching blog post:", error)
    return null
  }

  // Increment view count
  await supabase
    .from("blog_posts")
    .update({ view_count: data.view_count + 1 })
    .eq("id", data.id)

  return {
    ...data,
    tags: data.blog_post_tags?.map((pt: any) => pt.blog_tags.name) || [],
  } as BlogPost
}

export async function getBlogTags() {
  const { data, error } = await supabase
    .from("blog_tags")
    .select(`
      *,
      blog_post_tags(count)
    `)
    .order("name")

  if (error) {
    console.error("Error fetching blog tags:", error)
    return []
  }

  return (
    data?.map((tag) => ({
      ...tag,
      count: tag.blog_post_tags?.length || 0,
    })) || []
  )
}

export async function getPopularTags(limit = 10) {
  const { data, error } = await supabase.rpc("get_popular_tags", { tag_limit: limit })

  if (error) {
    console.error("Error fetching popular tags:", error)
    return []
  }

  return data || []
}

export async function getBlogComments(postId: number) {
  const { data, error } = await supabase
    .from("blog_comments")
    .select(`
      *,
      users(id, name, avatar_url)
    `)
    .eq("post_id", postId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching comments:", error)
    return []
  }

  return (
    data?.map((comment) => ({
      ...comment,
      user: comment.users,
    })) || []
  )
}

export async function addBlogComment(postId: number, content: string, userId: string) {
  const { data, error } = await supabase
    .from("blog_comments")
    .insert({
      post_id: postId,
      user_id: userId,
      content: content,
    })
    .select(`
      *,
      users(id, name, avatar_url)
    `)
    .single()

  if (error) {
    console.error("Error adding comment:", error)
    return null
  }

  return {
    ...data,
    user: data.users,
  }
}

export async function searchBlogPosts(searchTerm: string) {
  const { data, error } = await supabase
    .from("blog_posts")
    .select(`
      *,
      blog_post_tags(
        blog_tags(name, color)
      )
    `)
    .or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error searching blog posts:", error)
    return []
  }

  return (
    data?.map((post) => ({
      ...post,
      tags: post.blog_post_tags?.map((pt: any) => pt.blog_tags.name) || [],
    })) || []
  )
}
