import { Carousel } from "@/components/carousel"
import type { Project } from "@/lib/profile-service"

interface FeaturedProjectsProps {
  projects: Project[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const featuredItems = projects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image_url || "/placeholder.svg?height=200&width=300",
    link: `/portfolio#project-${project.id}`,
  }))

  if (featuredItems.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">주요 프로젝트</h2>
        <Carousel items={featuredItems} />
      </div>
    </section>
  )
}
