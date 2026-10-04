import {
  BookOpen,
  Bot,
  Brush,
  Layers,
  MessagesSquare,
  Mic,
  Trophy,
  CreditCard,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  href: string
  label: string
  hanzi: string
  description: string
  icon: LucideIcon
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/tu-vung', label: 'Từ vựng', hanzi: '词汇', description: 'Kho từ vựng HSK 1–3 có phát âm chuẩn, lọc theo chủ đề.', icon: BookOpen },
  { href: '/flashcard', label: 'Flashcard', hanzi: '卡片', description: 'Lật thẻ ghi nhớ, đánh dấu từ đã thuộc và ôn lại từ khó.', icon: Layers },
  { href: '/phat-am', label: 'Phát âm', hanzi: '发音', description: 'Nắm vững 4 thanh điệu, thanh mẫu và vận mẫu pinyin.', icon: Mic },
  { href: '/luyen-viet', label: 'Luyện viết', hanzi: '写字', description: 'Xem thứ tự nét và tự tay viết chữ Hán trên ô mễ tự.', icon: Brush },
  { href: '/hoi-thoai', label: 'Hội thoại', hanzi: '对话', description: 'Hội thoại tình huống thực tế kèm pinyin và bản dịch.', icon: MessagesSquare },
  { href: '/trac-nghiem', label: 'Trắc nghiệm', hanzi: '测验', description: 'Kiểm tra kiến thức với câu hỏi đa dạng và chấm điểm tức thì.', icon: Trophy },
  { href: '/gia-su-ai', label: 'Gia sư AI', hanzi: '老师', description: 'Hỏi đáp ngữ pháp, dịch câu, luyện hội thoại cùng AI 24/7.', icon: Bot },
  { href: '/pricing', label: 'Gói học', hanzi: '价格', description: 'Chọn gói học phù hợp với mục tiêu của bạn.', icon: CreditCard },
]
