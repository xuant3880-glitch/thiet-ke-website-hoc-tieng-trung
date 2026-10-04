import { getCurrentUserId } from './auth'

export type StudyProgress = {
  known: string[]
  unknown: string[]
  starred: string[]
  quizBest: Record<string, number>
  streak: number
  lastStudy: string | null
  reviews: number
}

const KEY_PREFIX = 'hnd-progress-v1'

const EMPTY: StudyProgress = {
  known: [],
  unknown: [],
  starred: [],
  quizBest: {},
  streak: 0,
  lastStudy: null,
  reviews: 0,
}

function getKey(userId: string | null): string {
  return userId ? `${KEY_PREFIX}-${userId}` : KEY_PREFIX
}

function localDate(offsetDays = 0) {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function loadProgress(): StudyProgress {
  if (typeof window === 'undefined') return { ...EMPTY, known: [], unknown: [], starred: [], quizBest: {} }

  const userId = getCurrentUserId()
  const key = getKey(userId)

  try {
    const raw = localStorage.getItem(key)
    if (!raw) return { ...EMPTY, known: [], unknown: [], starred: [], quizBest: {} }
    const parsed = JSON.parse(raw) as Partial<StudyProgress>
    return {
      ...EMPTY,
      ...parsed,
      known: Array.isArray(parsed.known) ? parsed.known : [],
      unknown: Array.isArray(parsed.unknown) ? parsed.unknown : [],
      starred: Array.isArray(parsed.starred) ? parsed.starred : [],
      quizBest: parsed.quizBest && typeof parsed.quizBest === 'object' ? parsed.quizBest : {},
    }
  } catch {
    return { ...EMPTY, known: [], unknown: [], starred: [], quizBest: {} }
  }
}

export function saveProgress(progress: StudyProgress) {
  const userId = getCurrentUserId()
  const key = getKey(userId)
  localStorage.setItem(key, JSON.stringify(progress))
  window.dispatchEvent(new Event('hnd-progress'))
}

export function touchStudy() {
  const progress = loadProgress()
  const today = localDate()
  if (progress.lastStudy !== today) {
    progress.streak = progress.lastStudy === localDate(-1) ? progress.streak + 1 : 1
    progress.lastStudy = today
  }
  progress.reviews += 1
  saveProgress(progress)
  return progress
}

export function setWordStatus(hanzi: string, status: 'known' | 'unknown' | 'clear') {
  const progress = loadProgress()
  progress.known = progress.known.filter((h) => h !== hanzi)
  progress.unknown = progress.unknown.filter((h) => h !== hanzi)
  if (status === 'known') progress.known.push(hanzi)
  if (status === 'unknown') progress.unknown.push(hanzi)
  saveProgress(progress)
  return progress
}

export function toggleStarred(hanzi: string) {
  const progress = loadProgress()
  progress.starred = progress.starred.includes(hanzi)
    ? progress.starred.filter((h) => h !== hanzi)
    : [...progress.starred, hanzi]
  saveProgress(progress)
  return progress
}

export function recordQuizScore(level: string, score: number, total: number) {
  const progress = loadProgress()
  const percent = Math.round((score / total) * 100)
  progress.quizBest[level] = Math.max(progress.quizBest[level] ?? 0, percent)
  saveProgress(progress)
  return progress
}
