import PortfolioContent from "@/components/portfolio-content"
import { getFullProfile } from "@/lib/profile-service"

// 폴백 데이터
const fallbackProjects = [
  {
    id: "fallback-1",
    profile_id: "fallback",
    title: "데이터베이스 연결 확인 필요",
    description: "Supabase 환경변수를 설정하고 데이터베이스에 샘플 데이터를 추가해주세요.",
    project_type: "personal" as const,
    is_current: false,
    technologies: ["Next.js", "Supabase"],
    achievements: [],
    challenges: [],
    is_featured: false,
    display_order: 0,
    created_at: "",
    updated_at: "",
  },
]

const fallbackSkills = [
  {
    id: "fallback-1",
    profile_id: "fallback",
    name: "JavaScript",
    category: "frontend",
    proficiency: 90,
    years_of_experience: 3,
    is_featured: true,
    created_at: "",
    updated_at: "",
  },
]

export default async function PortfolioPage() {
  console.log("🔄 Loading portfolio page...")

  // 서버에서 Supabase 호출
  const data = await getFullProfile()

  const projects = data?.projects?.length ? data.projects : fallbackProjects
  const skills = data?.skills?.length ? data.skills : fallbackSkills

  console.log(`📊 Portfolio data: ${projects.length} projects, ${skills.length} skills`)

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">포트폴리오</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">안광윤의 프로젝트 경험과 기술 스택을 소개합니다</p>
          {!data && (
            <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg border border-yellow-300 dark:border-yellow-700">
              <div className="flex items-center justify-center mb-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
                <p className="text-yellow-800 dark:text-yellow-200 font-medium">데이터베이스 연결 확인 필요</p>
              </div>
              <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                .env.local 파일에 Supabase 환경변수를 설정하고 샘플 데이터를 추가해주세요.
              </p>
            </div>
          )}
        </div>

        <PortfolioContent projects={projects} skills={skills} />
      </div>
    </div>
  )
}
