import { AlertTriangle } from "lucide-react"
import { getFullProfile } from "@/lib/profile-service"
import {
  HeroSection,
  FeaturedProjects,
  SkillsOverview,
  StatsSection,
  CtaSection,
} from "@/components/home"

export default async function HomePage() {
  const data = await getFullProfile()

  if (!data) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center gradient-bg">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">데이터를 불러올 수 없습니다</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            포트폴리오 정보를 가져오는 데 문제가 발생했습니다. 잠시 후 다시 시도해주세요.
          </p>
        </div>
      </div>
    )
  }

  const { profile, projects } = data
  const featuredProjects = projects.filter((p) => p.is_featured).slice(0, 3)

  return (
    <div className="min-h-screen pt-16">
      <HeroSection profile={profile} />
      <FeaturedProjects projects={featuredProjects} />
      <SkillsOverview />
      <StatsSection featuredProjectsCount={featuredProjects.length} />
      <CtaSection />
    </div>
  )
}
