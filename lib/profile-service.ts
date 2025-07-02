import { supabase } from "./supabase"

export interface Profile {
  id: string
  user_id: string
  name: string
  title: string
  bio: string
  avatar_url?: string
  email?: string
  phone?: string
  location?: string
  github_url?: string
  linkedin_url?: string
  twitter_url?: string
  resume_url?: string
  created_at: string
  updated_at: string
}

export interface AboutSection {
  id: string
  profile_id: string
  title: string
  content: string
  section_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  profile_id: string
  name: string
  category: string
  proficiency: number
  years_of_experience: number
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  profile_id: string
  title: string
  description: string
  detailed_description?: string
  project_type: "work" | "personal" | "freelance" | "open-source"
  company?: string
  role?: string
  start_date?: string
  end_date?: string
  is_current: boolean
  technologies: string[]
  project_url?: string
  github_url?: string
  image_url?: string
  achievements: string[]
  challenges: string[]
  is_featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface Education {
  id: string
  profile_id: string
  institution: string
  degree?: string
  field_of_study?: string
  start_date?: string
  end_date?: string
  is_current: boolean
  description?: string
  grade?: string
  education_type: "degree" | "certification" | "course" | "bootcamp"
  created_at: string
  updated_at: string
}

export interface Interest {
  id: string
  profile_id: string
  name: string
  description?: string
  created_at: string
}

// 환경변수 체크 함수
function checkSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.error("❌ Supabase 환경변수가 설정되지 않았습니다!")
    console.error("NEXT_PUBLIC_SUPABASE_URL:", url ? "✅" : "❌")
    console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY:", key ? "✅" : "❌")
    return false
  }

  console.log("✅ Supabase 환경변수 설정 완료")
  return true
}

// 프로필 관련 함수들
export async function getProfile(userId?: string): Promise<Profile | null> {
  if (!checkSupabaseConfig()) {
    return null
  }

  try {
    let query = supabase.from("profiles").select("*")

    if (userId) {
      query = query.eq("user_id", userId)
    } else {
      // 기본적으로 첫 번째 프로필을 가져옴 (단일 사용자 포트폴리오)
      query = query.limit(1)
    }

    const { data, error } = await query.single()

    if (error) {
      console.error("❌ Error fetching profile:", error)
      console.error("Error details:", {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      })
      return null
    }

    console.log("✅ Profile fetched successfully:", data?.name)
    return data
  } catch (err) {
    console.error("❌ Unexpected error in getProfile:", err)
    return null
  }
}

export async function updateProfile(userId: string, updates: Partial<Profile>): Promise<Profile | null> {
  if (!checkSupabaseConfig()) {
    return null
  }

  try {
    const { data, error } = await supabase.from("profiles").update(updates).eq("user_id", userId).select().single()

    if (error) {
      console.error("❌ Error updating profile:", error)
      return null
    }

    console.log("✅ Profile updated successfully")
    return data
  } catch (err) {
    console.error("❌ Unexpected error in updateProfile:", err)
    return null
  }
}

// 소개 섹션 관련 함수들
export async function getAboutSections(profileId: string): Promise<AboutSection[]> {
  if (!checkSupabaseConfig()) {
    return []
  }

  try {
    const { data, error } = await supabase
      .from("about_sections")
      .select("*")
      .eq("profile_id", profileId)
      .eq("is_active", true)
      .order("section_order")

    if (error) {
      console.error("❌ Error fetching about sections:", error)
      return []
    }

    console.log(`✅ About sections fetched: ${data?.length || 0} sections`)
    return data || []
  } catch (err) {
    console.error("❌ Unexpected error in getAboutSections:", err)
    return []
  }
}

export async function updateAboutSection(id: string, updates: Partial<AboutSection>): Promise<AboutSection | null> {
  if (!checkSupabaseConfig()) {
    return null
  }

  try {
    const { data, error } = await supabase.from("about_sections").update(updates).eq("id", id).select().single()

    if (error) {
      console.error("❌ Error updating about section:", error)
      return null
    }

    return data
  } catch (err) {
    console.error("❌ Unexpected error in updateAboutSection:", err)
    return null
  }
}

export async function createAboutSection(section: Omit<AboutSection, "id" | "created_at" | "updated_at">) {
  if (!checkSupabaseConfig()) {
    return null
  }

  try {
    const { data, error } = await supabase.from("about_sections").insert(section).select().single()

    if (error) {
      console.error("❌ Error creating about section:", error)
      return null
    }

    return data
  } catch (err) {
    console.error("❌ Unexpected error in createAboutSection:", err)
    return null
  }
}

export async function deleteAboutSection(id: string): Promise<boolean> {
  if (!checkSupabaseConfig()) {
    return false
  }

  try {
    const { error } = await supabase.from("about_sections").delete().eq("id", id)

    if (error) {
      console.error("❌ Error deleting about section:", error)
      return false
    }

    return true
  } catch (err) {
    console.error("❌ Unexpected error in deleteAboutSection:", err)
    return false
  }
}

// 기술 스택 관련 함수들
export async function getSkills(profileId: string): Promise<Skill[]> {
  if (!checkSupabaseConfig()) {
    return []
  }

  try {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .eq("profile_id", profileId)
      .order("proficiency", { ascending: false })

    if (error) {
      console.error("❌ Error fetching skills:", error)
      return []
    }

    console.log(`✅ Skills fetched: ${data?.length || 0} skills`)
    return data || []
  } catch (err) {
    console.error("❌ Unexpected error in getSkills:", err)
    return []
  }
}

export async function getFeaturedSkills(profileId: string): Promise<Skill[]> {
  if (!checkSupabaseConfig()) {
    return []
  }

  try {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .eq("profile_id", profileId)
      .eq("is_featured", true)
      .order("proficiency", { ascending: false })

    if (error) {
      console.error("❌ Error fetching featured skills:", error)
      return []
    }

    return data || []
  } catch (err) {
    console.error("❌ Unexpected error in getFeaturedSkills:", err)
    return []
  }
}

// 프로젝트 관련 함수들
export async function getProjects(profileId: string): Promise<Project[]> {
  if (!checkSupabaseConfig()) {
    return []
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("profile_id", profileId)
      .order("display_order")

    if (error) {
      console.error("❌ Error fetching projects:", error)
      return []
    }

    console.log(`✅ Projects fetched: ${data?.length || 0} projects`)
    return data || []
  } catch (err) {
    console.error("❌ Unexpected error in getProjects:", err)
    return []
  }
}

export async function getFeaturedProjects(profileId: string): Promise<Project[]> {
  if (!checkSupabaseConfig()) {
    return []
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("profile_id", profileId)
      .eq("is_featured", true)
      .order("display_order")

    if (error) {
      console.error("❌ Error fetching featured projects:", error)
      return []
    }

    return data || []
  } catch (err) {
    console.error("❌ Unexpected error in getFeaturedProjects:", err)
    return []
  }
}

// 교육/자격증 관련 함수들
export async function getEducations(profileId: string): Promise<Education[]> {
  if (!checkSupabaseConfig()) {
    return []
  }

  try {
    const { data, error } = await supabase
      .from("educations")
      .select("*")
      .eq("profile_id", profileId)
      .order("start_date", { ascending: false })

    if (error) {
      console.error("❌ Error fetching educations:", error)
      return []
    }

    console.log(`✅ Educations fetched: ${data?.length || 0} educations`)
    return data || []
  } catch (err) {
    console.error("❌ Unexpected error in getEducations:", err)
    return []
  }
}

// 관심 분야 관련 함수들
export async function getInterests(profileId: string): Promise<Interest[]> {
  if (!checkSupabaseConfig()) {
    return []
  }

  try {
    const { data, error } = await supabase.from("interests").select("*").eq("profile_id", profileId).order("name")

    if (error) {
      console.error("❌ Error fetching interests:", error)
      return []
    }

    console.log(`✅ Interests fetched: ${data?.length || 0} interests`)
    return data || []
  } catch (err) {
    console.error("❌ Unexpected error in getInterests:", err)
    return []
  }
}

// 전체 프로필 데이터 가져오기
export async function getFullProfile(userId?: string) {
  console.log("🔄 Starting getFullProfile...")

  if (!checkSupabaseConfig()) {
    console.error("❌ Supabase configuration failed")
    return null
  }

  try {
    const profile = await getProfile(userId)
    if (!profile) {
      console.error("❌ No profile found")
      return null
    }

    console.log("✅ Profile found, fetching related data...")

    const [aboutSections, skills, projects, educations, interests] = await Promise.all([
      getAboutSections(profile.id),
      getSkills(profile.id),
      getProjects(profile.id),
      getEducations(profile.id),
      getInterests(profile.id),
    ])

    console.log("✅ Full profile data loaded successfully")

    return {
      profile,
      aboutSections,
      skills,
      projects,
      educations,
      interests,
    }
  } catch (err) {
    console.error("❌ Unexpected error in getFullProfile:", err)
    return null
  }
}
