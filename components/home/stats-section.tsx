interface StatsSectionProps {
  featuredProjectsCount: number
}

export function StatsSection({ featuredProjectsCount }: StatsSectionProps) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">3+</div>
            <div className="text-gray-600 dark:text-gray-300">년 경험</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">{featuredProjectsCount}+</div>
            <div className="text-gray-600 dark:text-gray-300">완료 프로젝트</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">10+</div>
            <div className="text-gray-600 dark:text-gray-300">기술 스택</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
            <div className="text-gray-600 dark:text-gray-300">만족도</div>
          </div>
        </div>
      </div>
    </section>
  )
}
