import type { VocabularyItem } from './types'

const rawVocabulary = `
爱|ài|yêu, thích
爱好|àihào|sở thích
八|bā|số 8
爸爸|bàba|bố, ba, cha
吧|ba|nào, nhé, chứ, đi
白|bái|trắng
白天|báitiān|ban ngày
百|bǎi|một trăm
班|bān|lớp
半|bàn|một nửa
半年|bànnián|nửa năm
半天|bàntiān|nửa ngày
帮|bāng|giúp đỡ
帮忙|bāngmáng|giúp đỡ
包|bāo|bao, túi, gói
包子|bāozi|bánh bao
杯|bēi|cốc, ly
杯子|bēizi|cốc, chén, ly
北|běi|bắc
北边|běibiān|phía Bắc
北京|Běijīng|Bắc Kinh
本|běn|cuốn, quyển, tập
本子|běnzi|vở, cuốn vở
比|bǐ|so, so với
别|bié|đừng, không được
别的|biéde|cái khác
别人|biérén|người khác, người ta
病|bìng|bệnh
病人|bìngrén|bệnh nhân
不大|bú dà|không lớn
不对|búduì|không đúng
不客气|bú kèqi|không có gì
不用|búyòng|không cần
不|bù|không
菜|cài|đồ ăn, món ăn
差|chà|thiếu, kém
茶|chá|trà
常|cháng|thường
常常|chángcháng|thường thường
唱|chàng|hát
唱歌|chànggē|hát, ca hát
车|chē|xe
车票|chēpiào|vé xe
车上|chē shang|trên xe
车站|chēzhàn|bến xe
吃|chī|ăn
吃饭|chīfàn|ăn cơm
出|chū|ra, xuất
出来|chūlái|đi ra
出去|chūqù|ra ngoài
穿|chuān|mặc
床|chuáng|giường
次|cì|lần
从|cóng|từ, qua, theo
错|cuò|sai
打|dǎ|đánh, bắt
打车|dǎchē|bắt xe
打电话|dǎ diànhuà|gọi điện
打开|dǎkāi|mở, mở ra
打球|dǎqiú|chơi bóng
大|dà|to, lớn
大学|dàxué|đại học
大学生|dàxuéshēng|sinh viên đại học
到|dào|đến, tới
得到|dédào|đạt được, nhận được
地|de|biểu thị trạng ngữ
的|de|biểu thị sở hữu
等|děng|đợi, chờ
地|dì|đất, trái đất
地点|dìdiǎn|địa điểm
地方|dìfang|nơi, địa phương
地上|dìshang|trên mặt đất
地图|dìtú|bản đồ
弟弟|dìdi|em trai
第|dì|thứ, số thứ tự
点|diǎn|ít, chút, điểm
电|diàn|điện, pin
电话|diànhuà|điện thoại
电脑|diànnǎo|máy tính
电视|diànshì|truyền hình, TV
电视机|diànshìjī|chiếc TV
电影|diànyǐng|điện ảnh, phim
电影院|diànyǐngyuàn|rạp chiếu phim
东|dōng|đông
东边|dōngbian|phía đông
东西|dōngxi|đồ đạc, đồ, vật
动|dòng|động, chạm
动作|dòngzuò|động tác, hoạt động
都|dōu|đều
读|dú|đọc
读书|dúshū|đọc sách
对|duì|đúng
对不起|duìbuqǐ|xin lỗi
多|duō|nhiều
多少|duōshǎo|bao nhiêu
饿|è|đói
儿子|érzi|con trai
二|èr|số 2
饭|fàn|cơm
饭店|fàndiàn|quán ăn, nhà hàng
房间|fángjiān|căn phòng
房子|fángzi|căn nhà, căn hộ
放|fàng|thả, đặt, để
放假|fàngjià|nghỉ
放学|fàngxué|tan học
飞|fēi|bay
飞机|fēijī|máy bay
非常|fēicháng|vô cùng, rất
分|fēn|phút
风|fēng|gió
干|gān|khô
干净|gānjìng|sạch sẽ
干|gàn|làm
干什么|gànshénme|làm gì
高|gāo|cao
高兴|gāoxìng|vui vẻ
告诉|gàosù|nói, kể lại
哥哥|gēge|anh trai
歌|gē|bài hát
个|gè|cái
给|gěi|cho
跟|gēn|và, cùng
工人|gōngrén|công nhân
工作|gōngzuò|công việc
关|guān|đóng
关上|guānshàng|khép vào
贵|guì|đắt
国|guó|đất nước
国家|guójiā|đất nước
国外|guówài|nước ngoài
过|guò|đi qua
还|hái|vẫn, còn
还是|háishi|hay là
还有|hái yǒu|còn có
孩子|háizi|đứa trẻ, con
汉语|Hànyǔ|tiếng Trung
汉字|Hànzì|chữ Hán
好|hǎo|tốt, đẹp
好吃|hǎochī|ngon
好看|hǎokàn|đẹp, xinh, hay
好听|hǎotīng|êm tai, dễ nghe
好玩儿|hǎowánr|chơi vui
号|hào|ngày
喝|hē|uống
和|hé|và
很|hěn|rất
后|hòu|sau
后边|hòubian|phía sau
后天|hòutiān|ngày kia
花|huā|hoa
话|huà|lời nói
坏|huài|xấu, hỏng
还|huán|trả
回|huí|quay lại, về
回答|huídá|trả lời
回到|huídào|quay về
回家|huí jiā|về nhà
回来|huílái|về, quay về gần
回去|huíqù|về, quay về xa
会|huì|sẽ, biết làm
火车|huǒchē|xe lửa
机场|jīchǎng|sân bay
机票|jīpiào|vé máy bay
鸡蛋|jīdàn|trứng gà
几|jǐ|mấy, vài
记|jì|nhớ
记得|jìde|ghi nhớ
记住|jìzhù|nhớ kĩ
家|jiā|nhà
家里|jiālǐ|trong nhà
家人|jiārén|người nhà, gia đình
间|jiān|giữa
见|jiàn|gặp, thấy
见面|jiànmiàn|gặp mặt
教|jiāo|dạy
叫|jiào|gọi, kêu
教学楼|jiàoxuélóu|khu nhà dạy học
姐姐|jiějie|chị gái
介绍|jièshào|giới thiệu
今年|jīnnián|năm nay
今天|jīntiān|hôm nay
进|jìn|vào
进来|jìnlái|bước vào gần
进去|jìnqù|bước vào xa
九|jiǔ|số 9
就|jiù|đã, lập tức, ngay
觉得|juéde|cảm thấy
开|kāi|mở
开车|kāichē|lái xe
开会|kāihuì|họp
开玩笑|kāi wánxiào|nói đùa
看|kàn|nhìn, xem
看病|kànbìng|khám bệnh
看到|kàndào|nhìn thấy
看见|kànjiàn|nhìn thấy
考|kǎo|thi
考试|kǎoshì|kì thi
渴|kě|khát
课|kè|tiết học
课本|kèběn|sách giáo khoa
课文|kèwén|bài khóa, bài đọc
口|kǒu|lượng chỉ người trong gia đình
块|kuài|tệ
快|kuài|nhanh
来|lái|đến, tới
来到|láidào|đến
老|lǎo|già, cũ, cổ
老人|lǎorén|người già
老师|lǎoshī|thầy cô giáo
了|le|trợ từ thay đổi
累|lèi|mệt
冷|lěng|lạnh
里|lǐ|trong
里边|lǐbian|phía trong
两|liǎng|hai
零|líng|số 0
六|liù|số 6
楼|lóu|tầng
楼上|lóushàng|tầng trên
楼下|lóuxià|tầng dưới
路|lù|đường
路口|lùkǒu|giao lộ
路上|lùshàng|trên đường
妈妈|māma|mẹ
马路|mǎlù|đường cái
马上|mǎshàng|lập tức
吗|ma|trợ từ hỏi
买|mǎi|mua
慢|màn|chậm
忙|máng|bận
毛|máo|lượng từ
没|méi|không
没关系|méi guānxi|không sao
没什么|méi shénme|không có gì
没事儿|méi shìr|không có việc gì
没有|méiyǒu|không có
妹妹|mèimei|em gái
门|mén|cửa
门口|ménkǒu|cửa, cổng
门票|ménpiào|vé vào cửa
们|men|hậu tố số nhiều
米饭|mǐfàn|cơm
面包|miànbāo|bánh mì
面条儿|miàntiáor|mì sợi
名字|míngzi|tên
明白|míngbai|biết, hiểu
明年|míngnián|năm sau
明天|míngtiān|ngày mai
拿|ná|lấy, cầm
哪|nǎ|nào
哪里|nǎlǐ|ở đâu
哪儿|nǎr|ở đâu
哪些|nǎxiē|những nào
那|nà|kia, ấy
那边|nàbiān|bên kia
那里|nàlǐ|ở đó
那儿|nàr|ở đó
那些|nàxiē|những kia
奶|nǎi|sữa
奶奶|nǎinai|bà nội
男|nán|nam
男孩儿|nánháir|trẻ trai
男朋友|nánpéngyǒu|bạn trai
男人|nánrén|đàn ông
男生|nánshēng|nam sinh
南|nán|nam
南边|nánbian|phía nam
难|nán|khó
呢|ne|trợ từ
能|néng|có thể
你|nǐ|bạn
你们|nǐmen|các bạn
年|nián|năm
您|nín|ngài, ông, bà
牛奶|niúnǎi|sữa bò
女|nǚ|nữ
女儿|nǚ'ér|con gái
女孩儿|nǚháir|cô bé
女朋友|nǚpéngyǒu|bạn gái
女人|nǚrén|phụ nữ
女生|nǚshēng|nữ sinh
旁边|pángbiān|bên cạnh
跑|pǎo|chạy
朋友|péngyǒu|bạn bè
票|piào|vé, phiếu
七|qī|số 7
起|qǐ|dậy
起床|qǐchuáng|thức dậy
起来|qǐlái|đứng dậy, thức dậy
汽车|qìchē|ôtô
前|qián|trước
前边|qiánbian|phía trước
前天|qiántiān|hôm kia
钱|qián|tiền
钱包|qiánbāo|ví tiền
请|qǐng|mời
请假|qǐngjià|xin nghỉ
请进|qǐng jìn|mời vào
请问|qǐngwèn|xin hỏi
请坐|qǐng zuò|mời ngồi
球|qiú|quả bóng
去|qù|đi
去年|qùnián|năm ngoái
热|rè|nóng
人|rén|người
认识|rènshi|biết, quen
认真|rènzhēn|nghiêm túc
日|rì|ngày
日期|rìqī|ngày xác định
肉|ròu|thịt
三|sān|số 3
山|shān|núi
商场|shāngchǎng|trung tâm thương mại
商店|shāngdiàn|cửa hàng
上|shàng|trên
上班|shàngbān|đi làm
上边|shàngbian|bên trên
上车|shàngchē|lên xe
上次|shàngcì|lần trước
上课|shàngkè|vào lớp, đi học
上网|shàngwǎng|lên mạng
上午|shàngwǔ|buổi sáng
上学|shàngxué|đi học
少|shǎo|ít, thiếu
谁|shéi|ai
身上|shēnshang|trên người
身体|shēntǐ|cơ thể, sức khỏe
什么|shénme|cái gì
生病|shēngbìng|bị ốm
生气|shēngqì|tức giận
生日|shēngrì|sinh nhật
十|shí|số 10
时候|shíhòu|thời gian, lúc
时间|shíjiān|thời gian
事|shì|chuyện, việc
试|shì|thử
是|shì|là
是不是|shìbùshì|có phải hay không
手|shǒu|tay
手机|shǒujī|điện thoại
书|shū|sách
书包|shūbāo|cặp sách
书店|shūdiàn|hiệu sách
树|shù|cây
水|shuǐ|nước
水果|shuǐguǒ|nước hoa quả
睡|shuì|ngủ
睡觉|shuìjiào|ngủ
说|shuō|nói
说话|shuōhuà|nói chuyện
四|sì|số 4
送|sòng|tặng, đưa cho
岁|suì|tuổi
他|tā|anh ấy, ông ấy
他们|tāmen|họ nam
她|tā|cô ấy, bà ấy
她们|tāmen|họ nữ
太|tài|quá
天|tiān|trời
天气|tiānqì|thời tiết
听|tīng|nghe
听到|tīngdào|nghe thấy
听见|tīngjiàn|nghe thấy
听写|tīngxiě|nghe viết
同学|tóngxué|bạn học
图书馆|túshūguǎn|thư viện
外|wài|ngoài
外边|wàibiān|bên ngoài
外国|wàiguó|nước ngoài
外语|wàiyǔ|ngoại ngữ
玩儿|wánr|chơi
晚|wǎn|tối, muộn
晚饭|wǎnfàn|bữa tối
晚上|wǎnshang|buổi tối
网上|wǎngshang|trên mạng
网友|wǎngyǒu|bạn trên mạng
忘|wàng|quên
忘记|wàngjì|quên mất
问|wèn|hỏi
我|wǒ|tôi
我们|wǒmen|chúng ta, chúng tôi
五|wǔ|số 5
午饭|wǔfàn|bữa trưa
西|xī|tây
西边|xībian|phía tây
洗|xǐ|rửa
洗手间|xǐshǒujiān|nhà vệ sinh
喜欢|xǐhuān|thích
下|xià|xuống, dưới
下班|xiàbān|tan làm
下边|xiàbian|bên dưới
下车|xiàchē|xuống xe
下次|xiàcì|lần sau
下课|xiàkè|tan học
下午|xiàwǔ|buổi chiều
下雨|xiàyǔ|mưa
先|xiān|trước
先生|xiānsheng|quý ông
现在|xiànzài|bây giờ
想|xiǎng|muốn, suy nghĩ
小|xiǎo|nhỏ
小孩儿|xiǎoháir|trẻ em
小姐|xiǎojiě|cô, tiểu thư
小朋友|xiǎopéngyǒu|trẻ em, bạn nhỏ
小时|xiǎoshí|giờ
小学|xiǎoxué|tiểu học
小学生|xiǎoxuéshēng|học sinh tiểu học
笑|xiào|cười
写|xiě|viết
谢谢|xièxie|cảm ơn
新|xīn|mới
新年|xīnnián|năm mới
星期|xīngqī|tuần, thứ
星期日|xīngqīrì|chủ nhật
星期天|xīngqītiān|chủ nhật
行|xíng|được, ổn
休息|xiūxi|nghỉ
学|xué|học
学生|xuéshēng|học sinh, sinh viên
学习|xuéxí|học tập
学校|xuéxiào|trường học
学院|xuéyuàn|học viện
要|yào|muốn, cần, phải
爷爷|yéye|ông nội
也|yě|cũng
页|yè|trang
一|yī|số 1
衣服|yīfu|quần áo
医生|yīshēng|bác sĩ
医院|yīyuàn|bệnh viện
一半|yíbàn|một nửa
一会儿|yíhuìr|một lát
一块儿|yíkuàir|cùng nhau
一下儿|yíxiàr|một lát
一样|yíyàng|giống nhau
一边|yìbiān|một bên
一点儿|yìdiǎnr|một chút
一起|yìqǐ|cùng
一些|yìxiē|một ít
用|yòng|dùng
有|yǒu|có
有的|yǒude|có
有名|yǒumíng|nổi tiếng
有时候|yǒushíhou|có lúc
有一些|yǒu yìxiē|có một ít
有用|yǒuyòng|có ích
右|yòu|bên phải
右边|yòubian|bên phải
雨|yǔ|mưa
元|yuán|đồng
远|yuǎn|xa
月|yuè|mặt trăng, tháng
再|zài|lại
再见|zàijiàn|tạm biệt
在|zài|đang, ở
在家|zàijiā|ở nhà
早|zǎo|sớm
早饭|zǎofàn|bữa sáng
早上|zǎoshàng|buổi sáng
怎么|zěnme|thế nào
站|zhàn|bến, trạm
找|zhǎo|tìm
找到|zhǎodào|tìm thấy
这|zhè|này, đây
这边|zhèbiān|bên này
这里|zhèlǐ|ở đây
这儿|zhèr|đây
这些|zhèxiē|những cái này
着|zhe|trợ từ
真|zhēn|thật
真的|zhēnde|thật ư, thật đó
正|zhèng|chính, đang
正在|zhèngzài|đang
知道|zhīdào|biết
知识|zhīshì|kiến thức
中|zhōng|giữa
中国|Zhōngguó|Trung Quốc
中间|zhōngjiān|giữa
中文|Zhōngwén|tiếng Trung
中午|zhōngwǔ|buổi trưa
中学|zhōngxué|trung học
中学生|zhōngxuéshēng|học sinh trung học
重|zhòng|nặng
重要|zhòngyào|quan trọng
住|zhù|ở
准备|zhǔnbèi|chuẩn bị
桌子|zhuōzi|cái bàn
字|zì|chữ
子|zi|hậu tố trong từ như 桌子
走|zǒu|đi
走路|zǒulù|đi bộ
最|zuì|nhất
最好|zuìhǎo|tốt nhất
最后|zuìhòu|cuối cùng
昨天|zuótiān|hôm qua
左|zuǒ|bên trái
左边|zuǒbiān|bên trái
坐|zuò|ngồi
坐下|zuòxià|ngồi xuống
做|zuò|làm
`

export const HSK1_VOCABULARY: VocabularyItem[] =
  rawVocabulary
    .trim()
    .split('\n')
    .map((line, index) => {
      const [hanzi, pinyin, meaning] = line.split('|')

      return {
        id: `hsk1-${String(index + 1).padStart(3, '0')}`,
        hanzi,
        pinyin,
        meaning,
        partOfSpeech: '',
        example: '',
        exampleMeaning: '',
        hsk: 1,
      }
    })

export default HSK1_VOCABULARY
