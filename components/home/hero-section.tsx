import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import type { Profile } from "@/lib/profile-service"

interface HeroSectionProps {
  profile: Profile | null
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="gradient-bg py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white/20">
            <img
              src={profile?.avatar_url || "/placeholder.svg?height=128&width=128"}
              alt="프로필 사진"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            안녕하세요, <span className="text-gradient">{profile?.name || "안광윤"}</span>입니다
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {profile?.bio || "창의적인 문제 해결과 혁신적인 기술로 더 나은 디지털 경험을 만들어갑니다."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/portfolio">
              <Button size="lg" className="w-full sm:w-auto">
                포트폴리오 보기 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent">
                연락하기
              </Button>
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            {profile?.github_url && (
              <Button variant="ghost" size="sm" asChild>
                <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            )}
            {profile?.linkedin_url && (
              <Button variant="ghost" size="sm" asChild>
                <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
            )}
            {profile?.email && (
              <Button variant="ghost" size="sm" asChild>
                <a href={`mailto:${profile.email}`}>
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
