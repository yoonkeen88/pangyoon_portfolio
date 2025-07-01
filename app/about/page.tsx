import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Mail, Github, Linkedin } from "lucide-react"

export default function AboutPage() {
  const skills = ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Python", "SQL", "Git", "Docker", "AWS"]

  const interests = ["웹 개발", "데이터 분석", "UI/UX 디자인", "오픈소스", "머신러닝", "클라우드 컴퓨팅"]

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
            <img src="/placeholder.svg?height=128&width=128" alt="프로필 사진" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">안녕하세요, 성장하는 개발자 안광윤입니다</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            창의적인 문제 해결과 혁신적인 기술로 더 나은 디지털 경험을 추구합니다
          </p>
          <div className="flex justify-center space-x-4">
            <Button>
              <Download className="mr-2 h-4 w-4" />
              이력서 다운로드
            </Button>
            <Button variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              연락하기
            </Button>
          </div>
        </div>

        {/* About Me */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle>소개</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              안녕하세요! 저는 풀스택 개발자로, 사용자 중심의 웹 애플리케이션을 개발하는 것에 열정을 가지고
              있습니다. React와 Next.js를 주로 사용하여 프론트엔드를 개발하고, Node.js와 Python으로 백엔드 시스템을
              구축합니다.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              통계학을 전공하며 데이터 분석과 머신러닝에도 관심을 가지고 있어, Python과 R을 활용한 데이터 분석 프로젝트와 예측 모델 구축
              프로젝트를 진행한 바 있습니다. 새로운 기술을 학습하고 이를 실제 프로젝트에 적용하는 것을 즐깁니다.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              개발자로서 단순히 코드를 작성하는 것을 넘어서, 사용자의 문제를 해결하고 비즈니스 가치를 창출하는 솔루션을
              만드는 것이 목표입니다.
            </p>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle>기술 스택</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interests */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle>관심 분야</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge key={interest} variant="outline" className="text-sm">
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Education & Certifications */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle>학력 및 자격증</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">통계학,철학 학사</h3>
              <p className="text-gray-600 dark:text-gray-400">인하대학교 (2020 - 2026)</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">정보처리기사</h3>
              <p className="text-gray-600 dark:text-gray-400">한국산업인력공단 (2022)</p>
            </div>
             <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">ADsP</h3>
              <p className="text-gray-600 dark:text-gray-400">한국데이터산업진증원 (2022)</p>
            </div>
             <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">빅데이터분석기사</h3>
              <p className="text-gray-600 dark:text-gray-400">한국데이터산업진증원 (2022)</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">K-Software Empowerment Bootcamp 3기 수료</h3>
              <p className="text-gray-600 dark:text-gray-400">정보통신기획평가원 (2023)</p>
            </div>
             <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">AWS Solutions Architect Associate</h3>
              <p className="text-gray-600 dark:text-gray-400">Amazon Web Services (2023)</p>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>연락처</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="mailto:rhkddbs0808@naver.com" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  이메일 보내기
                </Button>
              </a>
              <a href="https://github.com/yoonkeen88" target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="outline" className="w-full">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
              </a>
              <Button variant="outline" className="flex-1">
                <Linkedin className="mr-2 h-4 w-4" />
                LinkedIn
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
