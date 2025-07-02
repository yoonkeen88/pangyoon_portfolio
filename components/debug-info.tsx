"use client"

export function DebugInfo() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs max-w-sm z-50 backdrop-blur-sm">
      <h3 className="font-bold mb-2 text-green-400">🔧 개발 디버그 정보</h3>
      <div className="space-y-1">
        <p>Supabase URL: {supabaseUrl ? "✅ 설정됨" : "❌ 누락"}</p>
        <p>Supabase Key: {supabaseKey ? "✅ 설정됨" : "❌ 누락"}</p>
        {supabaseUrl && <p className="text-gray-300">URL: {supabaseUrl.substring(0, 30)}...</p>}
        {!supabaseUrl && (
          <div className="mt-2 p-2 bg-red-900/50 rounded text-red-200">
            <p className="font-medium">환경변수 설정 필요:</p>
            <p className="text-xs mt-1">.env.local 파일 생성</p>
          </div>
        )}
      </div>
    </div>
  )
}
