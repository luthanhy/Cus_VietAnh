const benefits = [
  {
    title: 'Gặp gỡ chuyên gia',
    icon: '👥',
  },
  {
    title: 'Hiểu rõ hành trang lớp 1',
    icon: '🎓',
  },
  {
    title: 'Trải nghiệm lớp học mẫu',
    icon: '💻',
  },
  {
    title: 'Nhận ưu đãi tuyển sinh',
    icon: '🎁',
  },
]

export default function WhyAttend() {
  return (
    <section className="py-14 bg-[#1e3a5f] text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          VÌ SAO NÊN THAM DỰ?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl mb-3" aria-hidden>{b.icon}</div>
              <h3 className="font-semibold text-lg">{b.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
