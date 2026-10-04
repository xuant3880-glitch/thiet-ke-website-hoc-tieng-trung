"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search, BookOpen, Volume2, ChevronRight } from "lucide-react"

import { HSK1_VOCABULARY } from "@/data/vocabulary/hsk1"

export default function TuVungPage() {
  const [search, setSearch] = useState("")
  const [level, setLevel] = useState("HSK 1")

  const filteredVocabulary = useMemo(() => {
    const keyword = search.trim().toLowerCase()

    return HSK1_VOCABULARY.filter((word) => {
      const matchesLevel =
        level === "Tất cả" || `HSK ${word.hsk}` === level

      if (!matchesLevel) return false

      if (!keyword) return true

      return (
        word.hanzi.toLowerCase().includes(keyword) ||
        word.pinyin.toLowerCase().includes(keyword) ||
        word.meaning.toLowerCase().includes(keyword)
      )
    })
  }, [search, level])

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-300">
            <BookOpen className="h-4 w-4" />
            Kho từ vựng tiếng Trung
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Từ vựng HSK
          </h1>

          <p className="mt-4 max-w-2xl text-slate-400">
            Học và tra cứu từ vựng HSK 1 với Hán tự, Pinyin và nghĩa tiếng Việt.
          </p>

          {/* Search */}
          <div className="relative mt-8 max-w-3xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm Hán tự, Pinyin hoặc nghĩa tiếng Việt..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.06] py-4 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500/50 focus:bg-white/[0.08]"
            />
          </div>

          {/* Filters */}
          <div className="mt-5 flex flex-wrap gap-3">
            {["HSK 1", "Tất cả"].map((item) => (
              <button
                key={item}
                onClick={() => setLevel(item)}
                className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
                  level === item
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "border border-white/10 bg-white/[0.04] text-slate-400 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Vocabulary */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Từ vựng HSK 1
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Hiển thị {filteredVocabulary.length} từ
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-400">
            Tổng kho:{" "}
            <span className="font-semibold text-white">
              {HSK1_VOCABULARY.length}
            </span>
          </div>
        </div>

        {filteredVocabulary.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <Search className="mx-auto h-10 w-10 text-slate-600" />

            <h3 className="mt-4 text-lg font-semibold">
              Không tìm thấy từ phù hợp
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Hãy thử tìm bằng Hán tự, Pinyin hoặc nghĩa tiếng Việt khác.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredVocabulary.map((word) => (
              <Link
                key={word.id}
                href={`/tu-vung/${word.id}`}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.05]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-3xl font-bold tracking-wide text-white">
                      {word.hanzi}
                    </div>

                    <div className="mt-2 text-sm font-medium text-blue-400">
                      {word.pinyin}
                    </div>
                  </div>

                  <span className="rounded-lg bg-blue-500/10 px-2 py-1 text-xs font-semibold text-blue-400">
                    HSK {word.hsk}
                  </span>
                </div>

                <div className="mt-4 min-h-[48px] text-sm leading-6 text-slate-300">
                  {word.meaning}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="flex items-center gap-2 text-xs text-slate-500">
                    <Volume2 className="h-4 w-4" />
                    Phát âm
                  </span>

                  <ChevronRight className="h-4 w-4 text-slate-600 transition group-hover:translate-x-1 group-hover:text-blue-400" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
