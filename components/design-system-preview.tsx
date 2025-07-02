"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { designTokens } from "@/lib/design-system"
import { ThemeCard } from "@/components/ui/theme-card"
import { ThemeButton } from "@/components/ui/theme-button"
import { ThemeBadge } from "@/components/ui/theme-badge"

export function DesignSystemPreview() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  return (
    <div className="space-y-8 p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">디자인 시스템</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">프로젝트에서 사용되는 모든 디자인 토큰과 컴포넌트들</p>
      </div>

      {/* 색상 팔레트 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">색상 팔레트</h2>

        {/* 브랜드 색상 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">브랜드 색상</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(designTokens.colors.brand).map(([name, color]) => (
              <div
                key={name}
                className="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setSelectedColor(color)}
              >
                <div className="w-8 h-8 rounded-full border-2 border-gray-200" style={{ backgroundColor: color }} />
                <div>
                  <p className="font-medium capitalize">{name.replace(/([A-Z])/g, " $1")}</p>
                  <p className="text-sm text-gray-500">{color}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 의미적 색상 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">의미적 색상</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(designTokens.colors.semantic).map(([name, color]) => (
              <div
                key={name}
                className="flex items-center space-x-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setSelectedColor(color)}
              >
                <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: color }} />
                <div>
                  <p className="font-medium capitalize">{name}</p>
                  <p className="text-xs text-gray-500">{color}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 태그 색상 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">태그 색상</h2>
        <div className="flex flex-wrap gap-2">
          {Object.keys(designTokens.colors.tags).map((tag) => (
            <ThemeBadge key={tag} variant="tag" tag={tag}>
              {tag}
            </ThemeBadge>
          ))}
        </div>
      </section>

      {/* 컴포넌트 예시 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">컴포넌트 예시</h2>

        {/* 버튼 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">버튼</h3>
          <div className="flex flex-wrap gap-4">
            <ThemeButton variant="primary">Primary</ThemeButton>
            <ThemeButton variant="secondary">Secondary</ThemeButton>
            <ThemeButton variant="outline">Outline</ThemeButton>
            <ThemeButton variant="ghost">Ghost</ThemeButton>
          </div>
        </div>

        {/* 카드 */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">카드</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <ThemeCard variant="default">
              <h4 className="font-semibold mb-2">기본 카드</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">기본 스타일의 카드입니다.</p>
            </ThemeCard>

            <ThemeCard variant="glass">
              <h4 className="font-semibold mb-2">글래스 카드</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">글래스모피즘 효과가 적용된 카드입니다.</p>
            </ThemeCard>

            <ThemeCard variant="gradient">
              <h4 className="font-semibold mb-2">그라데이션 카드</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">그라데이션 배경이 적용된 카드입니다.</p>
            </ThemeCard>
          </div>
        </div>
      </section>

      {/* 타이포그래피 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">타이포그래피</h2>
        <div className="space-y-4">
          <div className="text-6xl font-bold">Heading 1</div>
          <div className="text-5xl font-bold">Heading 2</div>
          <div className="text-4xl font-semibold">Heading 3</div>
          <div className="text-3xl font-semibold">Heading 4</div>
          <div className="text-2xl font-medium">Heading 5</div>
          <div className="text-xl font-medium">Heading 6</div>
          <div className="text-lg">Large Text</div>
          <div className="text-base">Body Text</div>
          <div className="text-sm">Small Text</div>
          <div className="text-xs">Extra Small Text</div>
        </div>
      </section>

      {/* 간격 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">간격</h2>
        <div className="space-y-4">
          {Object.entries(designTokens.spacing).map(([name, value]) => (
            <div key={name} className="flex items-center space-x-4">
              <div className="w-20 text-sm font-mono">{name}</div>
              <div className="w-16 text-sm text-gray-500">{value}</div>
              <div className="bg-blue-500 h-4" style={{ width: value }} />
            </div>
          ))}
        </div>
      </section>

      {selectedColor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">선택된 색상</h3>
            <div className="w-full h-32 rounded-lg border mb-4" style={{ backgroundColor: selectedColor }} />
            <p className="font-mono text-sm mb-4">{selectedColor}</p>
            <Button onClick={() => setSelectedColor(null)} className="w-full">
              닫기
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
