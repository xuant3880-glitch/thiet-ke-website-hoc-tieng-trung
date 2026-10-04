"use client"

import Link from "next/link"

export default function GiaSuAIPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
        <div className="w-full rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400/10 text-4xl">
            🛠️
          </div>

          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-yellow-400">
            Hệ thống đang bảo trì
          </p>

          <h1 className="mb-5 text-4xl font-bold">
            Gia sư AI
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-base leading-7 text-slate-300">
            Tính năng Gia sư AI hiện đang được bảo trì và nâng cấp.
            Chúng tôi đang cải thiện hệ thống để mang đến trải nghiệm
            học tiếng Trung tốt hơn.
          </p>

          <div className="mb-8 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5 text-left">
            <p className="font-semibold text-yellow-300">
              🔧 Trạng thái
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Gia sư AI tạm thời chưa khả dụng.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
          >
            ← Quay về trang chủ
          </Link>
        </div>
      </div>
    </main>
  )
}