"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Download, Mail, Github, Linkedin, Edit, Save, X, MapPin, Phone } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { getFullProfile, updateProfile, updateAboutSection, deleteAboutSection } from "@/lib/profile-service"
import type { Profile, AboutSection, Skill, Education, Interest } from "@/lib/profile-service"

export default function AboutPage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [aboutSections, setAboutSections] = useState<AboutSection[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [educations, setEducations] = useState<Education[]>([])
  const [interests, setInterests] = useState<Interest[]>([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [editingProfile, setEditingProfile] = useState<Partial<Profile>>({})
  const [editingSections, setEditingSections] = useState<{ [key: string]: AboutSection }>({})

  useEffect(() => {
    loadProfileData()
  }, [])

  const loadProfileData = async () => {
    try {
      const data = await getFullProfile()
      if (data) {
        setProfile(data.profile)
        setAboutSections(data.aboutSections)
        setSkills(data.skills)
        setEducations(data.educations)
        setInterests(data.interests)
      }
    } catch (error) {
      console.error("Error loading profile data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditProfile = () => {
    setEditMode(true)
    setEditingProfile(profile || {})
  }

  const handleSaveProfile = async () => {
    if (!user || !profile) return

    try {
      const updatedProfile = await updateProfile(user.id, editingProfile)
      if (updatedProfile) {
        setProfile(updatedProfile)
        setEditMode(false)
      }
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const handleCancelEdit = () => {
    setEditMode(false)
    setEditingProfile({})
    setEditingSections({})
  }

  const handleEditSection = (section: AboutSection) => {
    setEditingSections({
      ...editingSections,
      [section.id]: { ...section },
    })
  }

  const handleSaveSection = async (sectionId: string) => {
    const section = editingSections[sectionId]
    if (!section) return

    try {
      const updatedSection = await updateAboutSection(sectionId, section)
      if (updatedSection) {
        setAboutSections(aboutSections.map((s) => (s.id === sectionId ? updatedSection : s)))
        const newEditingSections = { ...editingSections }
        delete newEditingSections[sectionId]
        setEditingSections(newEditingSections)
      }
    } catch (error) {
      console.error("Error updating section:", error)
    }
  }

  const handleDeleteSection = async (sectionId: string) => {
    if (!confirm("이 섹션을 삭제하시겠습니까?")) return

    try {
      const success = await deleteAboutSection(sectionId)
      if (success) {
        setAboutSections(aboutSections.filter((s) => s.id !== sectionId))
      }
    } catch (error) {
      console.error("Error deleting section:", error)
    }
  }

  const isOwner = user && profile && user.id === profile.user_id

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center gradient-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">프로필을 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!profile) {
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
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-200 dark:border-blue-800">
            <img
              src={profile.avatar_url || "/placeholder.svg?height=128&width=128"}
              alt="프로필 사진"
              className="w-full h-full object-cover"
            />
          </div>

          {editMode ? (
            <div className="space-y-4 max-w-md mx-auto">
              <Input
                value={editingProfile.name || ""}
                onChange={(e) => setEditingProfile({ ...editingProfile, name: e.target.value })}
                className="text-center text-2xl font-bold"
                placeholder="이름"
              />
              <Input
                value={editingProfile.title || ""}
                onChange={(e) => setEditingProfile({ ...editingProfile, title: e.target.value })}
                className="text-center text-lg"
                placeholder="직책"
              />
              <Textarea
                value={editingProfile.bio || ""}
                onChange={(e) => setEditingProfile({ ...editingProfile, bio: e.target.value })}
                className="text-center"
                placeholder="소개"
                rows={3}
              />
              <div className="flex justify-center space-x-2">
                <Button onClick={handleSaveProfile} size="sm">
                  <Save className="mr-2 h-4 w-4" />
                  저장
                </Button>
                <Button onClick={handleCancelEdit} variant="outline" size="sm">
                  <X className="mr-2 h-4 w-4" />
                  취소
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                안녕하세요, {profile.name}입니다
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">{profile.title}</p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">{profile.bio}</p>

              {/* Contact Info */}
              <div className="flex flex-wrap justify-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                {profile.location && (
                  <div className="flex items-center">
                    <MapPin className="mr-1 h-4 w-4" />
                    {profile.location}
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center">
                    <Phone className="mr-1 h-4 w-4" />
                    {profile.phone}
                  </div>
                )}
              </div>

              <div className="flex justify-center space-x-4">
                {profile.resume_url && (
                  <Button asChild>
                    <a href={profile.resume_url} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      이력서 다운로드
                    </a>
                  </Button>
                )}
                {profile.email && (
                  <Button variant="outline" asChild>
                    <a href={`mailto:${profile.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      연락하기
                    </a>
                  </Button>
                )}
                {isOwner && (
                  <Button onClick={handleEditProfile} variant="ghost" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    편집
                  </Button>
                )}
              </div>
            </>
          )}
        </div>

        {/* About Sections */}
        {aboutSections.map((section) => (
          <Card key={section.id} className="glass mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{section.title}</CardTitle>
              {isOwner && (
                <div className="flex space-x-2">
                  {editingSections[section.id] ? (
                    <>
                      <Button onClick={() => handleSaveSection(section.id)} size="sm">
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          const newEditingSections = { ...editingSections }
                          delete newEditingSections[section.id]
                          setEditingSections(newEditingSections)
                        }}
                        variant="outline"
                        size="sm"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => handleEditSection(section)} variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => handleDeleteSection(section.id)} variant="ghost" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              )}
            </CardHeader>
            <CardContent>
              {editingSections[section.id] ? (
                <div className="space-y-4">
                  <Input
                    value={editingSections[section.id].title}
                    onChange={(e) =>
                      setEditingSections({
                        ...editingSections,
                        [section.id]: { ...editingSections[section.id], title: e.target.value },
                      })
                    }
                    placeholder="섹션 제목"
                  />
                  <Textarea
                    value={editingSections[section.id].content}
                    onChange={(e) =>
                      setEditingSections({
                        ...editingSections,
                        [section.id]: { ...editingSections[section.id], content: e.target.value },
                      })
                    }
                    placeholder="섹션 내용"
                    rows={4}
                  />
                </div>
              ) : (
                <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                  {section.content}
                </p>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Skills */}
        <Card className="glass mb-8">
          <CardHeader>
            <CardTitle>기술 스택</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill) => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="text-sm">
                      {skill.name}
                    </Badge>
                    <span className="text-xs text-gray-500">{skill.years_of_experience}년</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 text-center">{skill.proficiency}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Interests */}
        <Card className="glass mb-8">
          <CardHeader>
            <CardTitle>관심 분야</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {interests.map((interest) => (
                <div key={interest.id} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{interest.name}</h3>
                  {interest.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{interest.description}</p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Education & Certifications */}
        <Card className="glass mb-8">
          <CardHeader>
            <CardTitle>학력 및 자격증</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {educations.map((education) => (
              <div key={education.id} className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {education.degree || education.field_of_study}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">{education.institution}</p>
                {education.start_date && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {education.start_date} - {education.is_current ? "현재" : education.end_date}
                  </p>
                )}
                {education.description && (
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">{education.description}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Contact */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>연락처</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              {profile.email && (
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <a href={`mailto:${profile.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    {profile.email}
                  </a>
                </Button>
              )}
              {profile.github_url && (
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
              {profile.linkedin_url && (
                <Button variant="outline" className="flex-1 bg-transparent" asChild>
                  <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
