function pickVoice() {
  const voices = window.speechSynthesis.getVoices()
  const normalized = (lang: string) => lang.replace('_', '-').toLowerCase()
  return (
    voices.find((v) => normalized(v.lang) === 'zh-cn') ||
    voices.find((v) => normalized(v.lang).startsWith('zh-cn')) ||
    voices.find((v) => normalized(v.lang).startsWith('zh'))
  )
}

function speakNow(text: string, rate: number, onStart?: () => void, onEnd?: () => void) {
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'zh-CN'
  utterance.rate = rate
  const voice = pickVoice()
  if (voice) utterance.voice = voice
  if (onStart) utterance.onstart = onStart
  if (onEnd) utterance.onend = onEnd
  window.speechSynthesis.speak(utterance)
}

function whenVoicesReady(run: () => void) {
  if (window.speechSynthesis.getVoices().length > 0) {
    run()
    return
  }
  const onVoices = () => {
    window.clearTimeout(fallback)
    run()
  }
  window.speechSynthesis.addEventListener('voiceschanged', onVoices, { once: true })
  const fallback = window.setTimeout(() => {
    window.speechSynthesis.removeEventListener('voiceschanged', onVoices)
    run()
  }, 250)
}

export function stopSpeaking() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  window.speechSynthesis.cancel()
}

export function speakChinese(text: string, rate = 0.85, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  stopSpeaking()
  whenVoicesReady(() => speakNow(text, rate, undefined, onEnd))
}

export function speakSequence(
  texts: string[],
  options?: {
    rate?: number
    onStart?: (index: number) => void
    onComplete?: () => void
  },
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window) || texts.length === 0) return
  stopSpeaking()
  const rate = options?.rate ?? 0.85
  whenVoicesReady(() => {
    texts.forEach((text, i) => {
      speakNow(
        text,
        rate,
        () => options?.onStart?.(i),
        i === texts.length - 1 ? options?.onComplete : undefined,
      )
    })
  })
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}
