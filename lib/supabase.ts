import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 개발 환경에서 환경변수 체크
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Supabase 환경변수가 설정되지 않았습니다!")
  console.error("프로젝트 루트에 .env.local 파일을 만들고 다음을 추가하세요:")
  console.error("NEXT_PUBLIC_SUPABASE_URL=your_supabase_url")
  console.error("NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key")

  // 개발 환경에서는 에러를 던지지 않고 더미 클라이언트 생성
  if (process.env.NODE_ENV === "development") {
    console.warn("⚠️ 개발 모드에서 더미 Supabase 클라이언트를 사용합니다.")
  }
}

// 환경변수가 없으면 더미 값 사용 (에러 방지)
const url = supabaseUrl || "https://dummy.supabase.co"
const key = supabaseAnonKey || "dummy-key"

export const supabase = createClient(url, key)

export const createServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!serviceRoleKey) {
    return supabase
  }

  return createClient(url, serviceRoleKey)
}
