"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SkillPieChart, SkillBarChart } from "@/components/charts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar } from "lucide-react"

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState("projects")

  const skillsData = [
    { name: "JavaScript", value: 90, color: "#F7DF1E" },
    { name: "Python", value: 85, color: "#3776AB" },
    { name: "React", value: 88, color: "#61DAFB" },
    { name: "Node.js", value: 80, color: "#339933" },
    { name: "SQL", value: 75, color: "#336791" },
  ]

  const projectCategories = [
    { name: "웹 개발", value: 45, color: "#3B82F6" },
    { name: "데이터 분석", value: 30, color: "#10B981" },
    { name: "모바일 앱", value: 15, color: "#F59E0B" },
    { name: "기타", value: 10, color: "#8B5CF6" },
  ]

  const projects = [
    {
      id: 1,
      title: "E-커머스 플랫폼",
      description: "Next.js와 Supabase를 활용한 풀스택 전자상거래 웹사이트",
      technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
      category: "웹 개발",
      image: "/placeholder.svg?height=200&width=300",
      projectUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
    {
      id: 2,
      title: "데이터 시각화 대시보드",
      description: "Python과 Streamlit을 이용한 실시간 데이터 분석 대시보드",
      technologies: ["Python", "Streamlit", "Pandas", "Plotly"],
      category: "데이터 분석",
      image: "/placeholder.svg?height=200&width=300",
      projectUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
    {
      id: 3,
      title: "모바일 투두 앱",
      description: "React Native로 개발한 크로스플랫폼 할일 관리 앱",
      technologies: ["React Native", "Expo", "Firebase"],
      category: "모바일 앱",
      image: "/placeholder.svg?height=200&width=300",
      projectUrl: "https://example.com",
      githubUrl: "https://github.com/example",
    },
  ]

  const experiences = [
    {
      id: 1,
      company: "테크 스타트업",
      position: "프론트엔드 개발자",
      description: "React와 TypeScript를 활용한 웹 애플리케이션 개발 및 유지보수",
      startDate: "2022-03",
      endDate: null,
      isCurrent: true,
    },
    {
      id: 2,
      company: "IT 컨설팅 회사",
      position: "주니어 개발자",
      description: "다양한 클라이언트 프로젝트 참여 및 웹사이트 개발",
      startDate: "2021-01",
      endDate: "2022-02",
      isCurrent: false,
    },
  ]

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">포트폴리오</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">제가 진행한 프로젝트와 기술 스택을 소개합니다</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {[
              { id: "projects", label: "프로젝트" },
              { id: "skills", label: "기술 스택" },
              { id: "experience", label: "경력" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" asChild>
                        <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          데모
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="mr-2 h-4 w-4" />
                          코드
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>기술 숙련도</CardTitle>
                </CardHeader>
                <CardContent>
                  <SkillBarChart data={skillsData} />
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>프로젝트 분야별 비율</CardTitle>
                </CardHeader>
                <CardContent>
                  <SkillPieChart data={projectCategories} />
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            {experiences.map((exp) => (
              <Card key={exp.id} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.position}</h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400">{exp.company}</p>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-300 mt-2 md:mt-0">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>
                        {exp.startDate} - {exp.isCurrent ? "현재" : exp.endDate}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
