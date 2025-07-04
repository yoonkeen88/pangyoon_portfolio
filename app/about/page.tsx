import { getFullProfile } from "@/lib/profile-service"
import { AboutPageClient } from "./about-page-client"
import { Button } from "@/components/ui/button"

export default async function AboutPage() {
  const data = await getFullProfile()

  if (!data) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">프로필을 찾을 수 없습니다</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">데이터베이스 연결을 확인해주세요.</p>
          <Button asChild>
            <a href="/">홈으로 돌아가기</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <AboutPageClient
      initialProfile={data.profile}
      initialAboutSections={data.aboutSections}
      initialSkills={data.skills}
      initialEducations={data.educations}
      initialInterests={data.interests}
    />
  )
}