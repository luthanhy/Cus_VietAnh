const timeline = [
  { time: '00:00 – 00:10', content: 'Đón tiếp phụ huynh – Check in' },
  { time: '00:10 – 00:15', content: 'Khai mạc chương trình – Giới thiệu diễn giả' },
  { time: '00:15 – 00:35', content: 'Chia sẻ chuyên gia: Trẻ cần chuẩn bị gì trước khi vào lớp 1?' },
  { time: '00:35 – 00:55', content: 'Hoạt động trải nghiệm: Ba mẹ thấu hiểu con' },
  { time: '00:55 – 01:15', content: 'Chia sẻ chuyên môn: 5 năng lực quan trọng giúp trẻ vững vàng lớp 1' },
  { time: '01:15 – 01:25', content: 'Giới thiệu chương trình: Canh Tý Sẵn Sàng – Vững Vàng Lớp 1' },
  { time: '01:25 – 01:30', content: 'Giao lưu – Hỏi đáp cùng chuyên gia' },
]

export default function TimelineSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-2 border-b-2 border-[#1e3a5f] pb-2 inline-block">
          NỘI DUNG HỘI THẢO
        </h2>
        <p className="text-gray-600 mb-10">Khung chương trình tọa đàm phụ huynh – Canh Tý Sẵn Sàng – Vững Vàng Lớp 1</p>

        <div className="max-w-3xl">
          {timeline.map((item, i) => (
            <div
              key={i}
              className="flex gap-6 py-4 border-l-2 border-[#e8b923] pl-6 relative -ml-[5px]"
            >
              <span
                className="absolute left-0 w-3 h-3 rounded-full bg-[#e8b923] -translate-x-[7px] mt-1"
                aria-hidden
              />
              <span className="text-[#1e3a5f] font-semibold whitespace-nowrap text-sm md:text-base">
                {item.time}
              </span>
              <span className="text-gray-700">{item.content}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
