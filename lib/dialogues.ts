export type DialogueLine = {
  speaker: 'A' | 'B'
  hanzi: string
  pinyin: string
  vi: string
}

export type Dialogue = {
  id: string
  title: string
  titleZh: string
  level: string
  scene: string
  lines: DialogueLine[]
}

export const DIALOGUES: Dialogue[] = [
  {
    id: 'chao-hoi',
    title: 'Chào hỏi làm quen',
    titleZh: '认识新朋友',
    level: 'HSK 1',
    scene: 'Hai sinh viên gặp nhau lần đầu ở trường.',
    lines: [
      { speaker: 'A', hanzi: '你好！你叫什么名字？', pinyin: 'Nǐ hǎo! Nǐ jiào shénme míngzi?', vi: 'Xin chào! Bạn tên là gì?' },
      { speaker: 'B', hanzi: '你好！我叫小明。你呢？', pinyin: 'Nǐ hǎo! Wǒ jiào Xiǎo Míng. Nǐ ne?', vi: 'Chào bạn! Mình tên là Tiểu Minh. Còn bạn?' },
      { speaker: 'A', hanzi: '我叫阿兰，我是越南人。', pinyin: 'Wǒ jiào Ā Lán, wǒ shì Yuènán rén.', vi: 'Mình tên là Lan, mình là người Việt Nam.' },
      { speaker: 'B', hanzi: '很高兴认识你！', pinyin: 'Hěn gāoxìng rènshi nǐ!', vi: 'Rất vui được làm quen với bạn!' },
      { speaker: 'A', hanzi: '我也很高兴认识你。', pinyin: 'Wǒ yě hěn gāoxìng rènshi nǐ.', vi: 'Mình cũng rất vui được làm quen với bạn.' },
    ],
  },
  {
    id: 'goi-mon',
    title: 'Gọi món ở nhà hàng',
    titleZh: '在饭馆点菜',
    level: 'HSK 2',
    scene: 'Khách gọi món với phục vụ.',
    lines: [
      { speaker: 'A', hanzi: '欢迎光临！您想吃什么？', pinyin: 'Huānyíng guānglín! Nín xiǎng chī shénme?', vi: 'Hoan nghênh quý khách! Ngài muốn ăn gì ạ?' },
      { speaker: 'B', hanzi: '我要一碗牛肉面和一杯茶。', pinyin: 'Wǒ yào yì wǎn niúròu miàn hé yì bēi chá.', vi: 'Cho tôi một bát mì bò và một cốc trà.' },
      { speaker: 'A', hanzi: '好的，要辣的吗？', pinyin: 'Hǎo de, yào là de ma?', vi: 'Vâng, ngài có muốn cay không?' },
      { speaker: 'B', hanzi: '不要太辣，谢谢。', pinyin: 'Bú yào tài là, xièxie.', vi: 'Đừng cay quá nhé, cảm ơn.' },
      { speaker: 'A', hanzi: '请稍等，马上就来。', pinyin: 'Qǐng shāo děng, mǎshàng jiù lái.', vi: 'Xin đợi một chút, có ngay ạ.' },
    ],
  },
  {
    id: 'mua-sam',
    title: 'Mặc cả khi mua sắm',
    titleZh: '在商店买东西',
    level: 'HSK 2',
    scene: 'Khách hàng mua áo ở chợ.',
    lines: [
      { speaker: 'A', hanzi: '这件衣服多少钱？', pinyin: 'Zhè jiàn yīfu duōshao qián?', vi: 'Chiếc áo này bao nhiêu tiền?' },
      { speaker: 'B', hanzi: '两百块。', pinyin: 'Liǎng bǎi kuài.', vi: 'Hai trăm tệ.' },
      { speaker: 'A', hanzi: '太贵了！便宜一点儿吧。', pinyin: 'Tài guì le! Piányi yìdiǎnr ba.', vi: 'Đắt quá! Rẻ hơn một chút đi.' },
      { speaker: 'B', hanzi: '一百五，怎么样？', pinyin: 'Yìbǎi wǔ, zěnmeyàng?', vi: 'Một trăm năm mươi, được không?' },
      { speaker: 'A', hanzi: '好，我买了。', pinyin: 'Hǎo, wǒ mǎi le.', vi: 'Được, tôi mua.' },
    ],
  },
  {
    id: 'hoi-duong',
    title: 'Hỏi đường',
    titleZh: '问路',
    level: 'HSK 3',
    scene: 'Du khách hỏi đường đến ga tàu điện ngầm.',
    lines: [
      { speaker: 'A', hanzi: '请问，地铁站怎么走？', pinyin: 'Qǐngwèn, dìtiě zhàn zěnme zǒu?', vi: 'Xin hỏi, ga tàu điện ngầm đi thế nào?' },
      { speaker: 'B', hanzi: '一直往前走，到路口往左拐。', pinyin: 'Yìzhí wǎng qián zǒu, dào lùkǒu wǎng zuǒ guǎi.', vi: 'Đi thẳng về phía trước, đến ngã tư thì rẽ trái.' },
      { speaker: 'A', hanzi: '离这儿远吗？', pinyin: 'Lí zhèr yuǎn ma?', vi: 'Có xa đây không?' },
      { speaker: 'B', hanzi: '不远，走路大概五分钟。', pinyin: 'Bù yuǎn, zǒulù dàgài wǔ fēnzhōng.', vi: 'Không xa, đi bộ khoảng năm phút.' },
      { speaker: 'A', hanzi: '太感谢你了！', pinyin: 'Tài gǎnxiè nǐ le!', vi: 'Cảm ơn bạn nhiều lắm!' },
    ],
  },
  {
    id: 'dat-taxi',
    title: 'Gọi taxi',
    titleZh: '打车',
    level: 'HSK 2',
    scene: 'Bạn gọi xe đến sân bay.',
    lines: [
      { speaker: 'A', hanzi: '师傅，去机场多少钱？', pinyin: 'Shīfu, qù jīchǎng duōshao qián?', vi: 'Bác ơi, ra sân bay bao nhiêu tiền?' },
      { speaker: 'B', hanzi: '大概一百块。', pinyin: 'Dàgài yìbǎi kuài.', vi: 'Khoảng một trăm tệ.' },
      { speaker: 'A', hanzi: '好，我们现在走吧。', pinyin: 'Hǎo, wǒmen xiànzài zǒu ba.', vi: 'Được, mình đi ngay nhé.' },
      { speaker: 'B', hanzi: '请系好安全带。', pinyin: 'Qǐng jì hǎo ānquándài.', vi: 'Xin hãy thắt dây an toàn.' },
      { speaker: 'A', hanzi: '谢谢师傅，能快一点儿吗？我赶飞机。', pinyin: 'Xièxie shīfu, néng kuài yìdiǎnr ma? Wǒ gǎn fēijī.', vi: 'Cảm ơn bác, bác đi nhanh hơn được không? Tôi đang kịp máy bay.' },
    ],
  },
  {
    id: 'sinh-nhat',
    title: 'Chúc mừng sinh nhật',
    titleZh: '生日快乐',
    level: 'HSK 1',
    scene: 'Bạn chúc mừng sinh nhật một người bạn.',
    lines: [
      { speaker: 'A', hanzi: '今天是你的生日吗？', pinyin: 'Jīntiān shì nǐ de shēngrì ma?', vi: 'Hôm nay là sinh nhật bạn à?' },
      { speaker: 'B', hanzi: '是的！谢谢你来。', pinyin: 'Shì de! Xièxie nǐ lái.', vi: 'Đúng rồi! Cảm ơn bạn đã đến.' },
      { speaker: 'A', hanzi: '生日快乐！这个礼物送给你。', pinyin: 'Shēngrì kuàilè! Zhège lǐwù sòng gěi nǐ.', vi: 'Chúc mừng sinh nhật! Món quà này tặng bạn.' },
      { speaker: 'B', hanzi: '太漂亮了！我很喜欢。', pinyin: 'Tài piàoliang le! Wǒ hěn xǐhuan.', vi: 'Đẹp quá! Mình rất thích.' },
      { speaker: 'A', hanzi: '我们一起吃蛋糕吧。', pinyin: 'Wǒmen yìqǐ chī dàngāo ba.', vi: 'Mình cùng ăn bánh kem nhé.' },
    ],
  },
]
