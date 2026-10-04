'use client'

import { speakChinese } from '@/lib/speak'

type Sound = { py: string; hanzi: string; example: string }

const INITIALS: { group: string; items: Sound[] }[] = [
  { group: 'Âm môi', items: [{ py: 'b', hanzi: '八', example: 'bā' }, { py: 'p', hanzi: '怕', example: 'pà' }, { py: 'm', hanzi: '妈', example: 'mā' }, { py: 'f', hanzi: '飞', example: 'fēi' }] },
  { group: 'Âm đầu lưỡi', items: [{ py: 'd', hanzi: '大', example: 'dà' }, { py: 't', hanzi: '他', example: 'tā' }, { py: 'n', hanzi: '你', example: 'nǐ' }, { py: 'l', hanzi: '来', example: 'lái' }] },
  { group: 'Âm cuống lưỡi', items: [{ py: 'g', hanzi: '哥', example: 'gē' }, { py: 'k', hanzi: '开', example: 'kāi' }, { py: 'h', hanzi: '好', example: 'hǎo' }] },
  { group: 'Âm mặt lưỡi', items: [{ py: 'j', hanzi: '家', example: 'jiā' }, { py: 'q', hanzi: '七', example: 'qī' }, { py: 'x', hanzi: '小', example: 'xiǎo' }] },
  { group: 'Âm uốn lưỡi', items: [{ py: 'zh', hanzi: '中', example: 'zhōng' }, { py: 'ch', hanzi: '吃', example: 'chī' }, { py: 'sh', hanzi: '是', example: 'shì' }, { py: 'r', hanzi: '日', example: 'rì' }] },
  { group: 'Âm đầu lưỡi trước', items: [{ py: 'z', hanzi: '字', example: 'zì' }, { py: 'c', hanzi: '菜', example: 'cài' }, { py: 's', hanzi: '三', example: 'sān' }] },
]

const FINALS: { group: string; items: Sound[] }[] = [
  { group: 'Vận mẫu đơn', items: [{ py: 'a', hanzi: '啊', example: 'ā' }, { py: 'o', hanzi: '哦', example: 'ò' }, { py: 'e', hanzi: '饿', example: 'è' }, { py: 'i', hanzi: '一', example: 'yī' }, { py: 'u', hanzi: '五', example: 'wǔ' }, { py: 'ü', hanzi: '鱼', example: 'yú' }] },
  { group: 'Vận mẫu kép', items: [{ py: 'ai', hanzi: '爱', example: 'ài' }, { py: 'ei', hanzi: '黑', example: 'hēi' }, { py: 'ao', hanzi: '好', example: 'hǎo' }, { py: 'ou', hanzi: '狗', example: 'gǒu' }, { py: 'ia', hanzi: '家', example: 'jiā' }, { py: 'ie', hanzi: '谢', example: 'xiè' }, { py: 'uo', hanzi: '我', example: 'wǒ' }, { py: 'üe', hanzi: '学', example: 'xué' }] },
  { group: 'Vận mẫu mũi', items: [{ py: 'an', hanzi: '三', example: 'sān' }, { py: 'en', hanzi: '人', example: 'rén' }, { py: 'ang', hanzi: '忙', example: 'máng' }, { py: 'eng', hanzi: '冷', example: 'lěng' }, { py: 'ong', hanzi: '中', example: 'zhōng' }, { py: 'in', hanzi: '心', example: 'xīn' }, { py: 'ing', hanzi: '听', example: 'tīng' }] },
]

function SoundGroup({ title, groups }: { title: string; groups: typeof INITIALS }) {
  return (
    <div>
      <h3 className="text-xl font-bold">{title}</h3>
      <div className="mt-4 flex flex-col gap-5">
        {groups.map((g) => (
          <div key={g.group}>
            <p className="text-sm font-semibold text-muted-foreground">{g.group}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {g.items.map((s) => (
                <li key={s.py}>
                  <button
                    type="button"
                    onClick={() => speakChinese(s.hanzi, 0.6)}
                    className="flex min-w-20 flex-col items-center rounded-xl border border-border bg-card px-3 py-2.5 transition-colors hover:border-primary hover:bg-primary/5"
                    aria-label={`Âm ${s.py}, ví dụ ${s.hanzi} ${s.example}`}
                  >
                    <span className="text-2xl font-bold text-primary">{s.py}</span>
                    <span className="mt-0.5 text-xs text-muted-foreground">
                      <span lang="zh-CN" className="font-serif text-sm text-foreground">
                        {s.hanzi}
                      </span>
                      {` ${s.example}`}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PinyinTable() {
  return (
    <section aria-label="Bảng thanh mẫu và vận mẫu" className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2">
        <SoundGroup title="Thanh mẫu (phụ âm đầu)" groups={INITIALS} />
        <SoundGroup title="Vận mẫu (vần)" groups={FINALS} />
      </div>
    </section>
  )
}
