"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar, Building, User, ChevronDown, ChevronUp } from "lucide-react"
import type { Project, Skill } from "@/lib/profile-service"

interface Props {
  projects: Project[]
  skills: Skill[]
}

export default function PortfolioContent({ projects, skills }: Props) {
  const [activeTab, setActiveTab] = useState<"projects" | "skills">("projects")
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => setExpanded((p) => ({ ...p, [id]: !p[id] }))

  const skillsByCat = skills.reduce<Record<string, Skill[]>>((a, s) => {
    a[s.category] = [...(a[s.category] || []), s]
    return a
  }, {})

  const catLabel: Record<string, string> = {
    frontend: "프론트엔드",
    backend: "백엔드",
    database: "데이터베이스",
    tools: "개발 도구",
    cloud: "클라우드",
  }

  const typeLabel: Record<string, string> = {
    work: "회사 프로젝트",
    personal: "개인 프로젝트",
    freelance: "프리랜스",
    "open-source": "오픈소스",
  }

  const typeColor: Record<string, string> = {
    work: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    personal: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    freelance: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    "open-source": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
  }

  return (
    <>
      {/* tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {(["projects", "skills"] as const).map((id) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === id
                  ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {id === "projects" ? "프로젝트 경험" : "기술 스택"}
            </button>
          ))}
        </div>
      </div>

      {/* projects */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          {projects.map((p) => (
            <Card key={p.id} className="glass hover-lift">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {p.image_url && (
                    <img
                      src={p.image_url || "/placeholder.svg"}
                      alt={p.title}
                      className="lg:w-1/3 h-48 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-2xl font-bold">{p.title}</h3>
                          <Badge className={typeColor[p.project_type]}>
                            {typeLabel[p.project_type] || p.project_type}
                          </Badge>
                          {p.is_current && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              진행중
                            </Badge>
                          )}
                        </div>
                        {p.company && (
                          <p className="flex items-center text-blue-600 mb-1">
                            <Building className="mr-1 h-4 w-4" />
                            {p.company}
                          </p>
                        )}
                        {p.role && (
                          <p className="flex items-center text-gray-500 mb-1">
                            <User className="mr-1 h-4 w-4" />
                            {p.role}
                          </p>
                        )}
                        {(p.start_date || p.end_date) && (
                          <p className="flex items-center text-gray-500 mb-1">
                            <Calendar className="mr-1 h-4 w-4" />
                            {p.start_date} - {p.is_current ? "현재" : p.end_date}
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 mt-2 lg:mt-0">
                        {p.project_url && (
                          <Button size="sm" asChild>
                            <a href={p.project_url} target="_blank" rel="noreferrer">
                              <ExternalLink className="mr-1 h-4 w-4" />
                              데모
                            </a>
                          </Button>
                        )}
                        {p.github_url && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={p.github_url} target="_blank" rel="noreferrer">
                              <Github className="mr-1 h-4 w-4" />
                              코드
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 mb-4">{p.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.technologies.map((t) => (
                        <Badge key={t} variant="secondary">
                          {t}
                        </Badge>
                      ))}
                    </div>

                    {(p.detailed_description || p.achievements.length || p.challenges.length) && (
                      <Button variant="ghost" size="sm" className="mb-2" onClick={() => toggle(p.id)}>
                        {expanded[p.id] ? (
                          <>
                            간단히 보기 <ChevronUp className="ml-1 h-4 w-4" />
                          </>
                        ) : (
                          <>
                            자세히 보기 <ChevronDown className="ml-1 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    )}

                    {expanded[p.id] && (
                      <div className="space-y-4 pt-4 border-t">
                        {p.detailed_description && (
                          <div>
                            <h4 className="font-semibold mb-2">상세 설명</h4>
                            <p className="whitespace-pre-wrap">{p.detailed_description}</p>
                          </div>
                        )}

                        {!!p.achievements.length && (
                          <div>
                            <h4 className="font-semibold mb-2">주요 성과</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {p.achievements.map((a, i) => (
                                <li key={i}>{a}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {!!p.challenges.length && (
                          <div>
                            <h4 className="font-semibold mb-2">해결한 문제</h4>
                            <ul className="list-disc list-inside space-y-1">
                              {p.challenges.map((c, i) => (
                                <li key={i}>{c}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* skills */}
      {activeTab === "skills" && (
        <div className="space-y-8">
          {Object.entries(skillsByCat).map(([cat, list]) => (
            <Card key={cat} className="glass">
              <CardHeader>
                <CardTitle>{catLabel[cat] || cat}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {list.map((s) => (
                    <div key={s.id} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{s.name}</span>
                        <span>{s.proficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${s.proficiency}%` }} />
                      </div>
                      <span className="text-xs text-gray-500">{s.years_of_experience}년 경험</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  )
}
