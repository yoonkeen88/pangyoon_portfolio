import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaSection() {
  return (
    <section className="py-16 gradient-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">함께 프로젝트를 시작해보세요</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">새로운 아이디어를 현실로 만들어드립니다</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button size="lg">프로젝트 문의하기</Button>
          </Link>
          <Link href="/blog">
            <Button variant="outline" size="lg" className="bg-transparent">
              블로그 둘러보기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
