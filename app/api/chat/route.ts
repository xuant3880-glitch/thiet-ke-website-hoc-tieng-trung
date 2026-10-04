import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai'

export const maxDuration = 30

const INSTRUCTIONS = `Bạn là "Lão sư Hán" — gia sư tiếng Trung thân thiện, kiên nhẫn dành cho người Việt.
- Luôn trả lời bằng tiếng Việt, trừ khi người học yêu cầu khác.
- Khi đưa ra từ/câu tiếng Trung, luôn ghi kèm: chữ Hán giản thể, pinyin có dấu thanh, và nghĩa tiếng Việt.
- Giải thích ngữ pháp ngắn gọn, có 1–3 ví dụ.
- Khi người học viết tiếng Trung, nhẹ nhàng sửa lỗi và giải thích.
- Nếu được yêu cầu luyện hội thoại, đóng vai và nói câu ngắn phù hợp trình độ HSK của người học.
- Dùng Markdown đơn giản (gạch đầu dòng, in đậm). Giữ câu trả lời súc tích.`

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: 'google/gemini-3.8-flash',
    instructions: INSTRUCTIONS,
    messages: await convertToModelMessages(messages),
  })

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onError: (error) => {
        const message = error instanceof Error ? error.message : String(error)
        if (message.includes('credit card')) {
          return 'AI Gateway chưa được kích hoạt: hãy thêm thẻ thanh toán trong tài khoản Vercel để mở khoá credit miễn phí.'
        }
        return 'Gia sư AI tạm thời không phản hồi. Vui lòng thử lại sau.'
      },
    }),
  })
}
