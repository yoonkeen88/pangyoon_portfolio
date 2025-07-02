"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save } from "lucide-react"
import { getFullProfile, updateProfile } from "@/lib/profile-service"
import type { Profile, Skill, Project, AboutSection } from "@/lib/profile-service"

export function ProfileManager() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [skills, setSkills] = useState<Skill[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [aboutSections, setAboutSections] = useState<AboutSection[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProfile, setEditingProfile] = useState(false)
  const [profileForm, setProfileForm] = useState({
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    github_url: "",
    linkedin_url: "",
  })

  useEffect(() => {
    loadProfileData()
  }, [])

  const loadProfileData = async () => {
    try {
      const data = await getFullProfile()
      if (data) {
        setProfile(data.profile)
        setSkills(data.skills)
        setProjects(data.projects)
        setAboutSections(data.aboutSections)
        setProfileForm({
          name: data.profile.name,
          title: data.profile.title,
          bio: data.profile.bio,
          email: data.profile.email || "",
          phone: data.profile.phone || "",
          location: data.profile.location || "",
          github_url: data.profile.github_url || "",
          linkedin_url: data.profile.linkedin_url || "",
        })
      }
    } catch (error) {
      console.error("Error loading profile data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    if (!profile) return

    try {
      const updatedProfile = await updateProfile(profile.user_id, profileForm)
      if (updatedProfile) {
        setProfile(updatedProfile)
        setEditingProfile(false)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">프로필 관리</h2>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList>
          <TabsTrigger value="basic">기본 정보</TabsTrigger>
          <TabsTrigger value="skills">기술 스택</TabsTrigger>
          <TabsTrigger value="projects">프로젝트</TabsTrigger>
          <TabsTrigger value="about">소개 섹션</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>기본 정보</CardTitle>
              <Button
                variant={editingProfile ? "default" : "outline"}
                onClick={() => {
                  if (editingProfile) {
                    handleSaveProfile()
                  } else {
                    setEditingProfile(true)
                  }
                }}
              >
                {editingProfile ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    저장
                  </>
                ) : (
                  <>
                    <Edit className="mr-2 h-4 w-4" />
                    편집
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    disabled={!editingProfile}
                  />
                </div>
                <div>
                  <Label htmlFor="title">직책</Label>
                  <Input
                    id="title"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    disabled={!editingProfile}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">소개</Label>
                <Textarea
                  id="bio"
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  disabled={!editingProfile}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">이메일</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    disabled={!editingProfile}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">전화번호</Label>
                  <Input
                    id="phone"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    disabled={!editingProfile}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">위치</Label>
                <Input
                  id="location"
                  value={profileForm.location}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  disabled={!editingProfile}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input
                    id="github_url"
                    value={profileForm.github_url}
                    onChange={(e) => setProfileForm({ ...profileForm, github_url: e.target.value })}
                    disabled={!editingProfile}
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                  <Input
                    id="linkedin_url"
                    value={profileForm.linkedin_url}
                    onChange={(e) => setProfileForm({ ...profileForm, linkedin_url: e.target.value })}
                    disabled={!editingProfile}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>기술 스택</CardTitle>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                기술 추가
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium">{skill.name}</h3>
                        <Badge variant="secondary">{skill.category}</Badge>
                        {skill.is_featured && <Badge variant="default">추천</Badge>}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>숙련도: {skill.proficiency}%</span>
                        <span>경험: {skill.years_of_experience}년</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>프로젝트</CardTitle>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                프로젝트 추가
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium">{project.title}</h3>
                        <Badge variant="secondary">{project.project_type}</Badge>
                        {project.is_featured && <Badge variant="default">추천</Badge>}
                        {project.is_current && <Badge variant="outline">진행중</Badge>}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>소개 섹션</CardTitle>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                섹션 추가
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {aboutSections.map((section) => (
                  <div key={section.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{section.title}</h3>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{section.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
