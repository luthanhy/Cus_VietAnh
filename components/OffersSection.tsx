const offers = [
  { title: 'Kiểm tra năng lực đầu vào', icon: '📄' },
  { title: 'Tư vấn lộ trình học tập', icon: '❤️' },
  { title: 'Đặc biệt ưu đãi khi đăng ký sớm', icon: '🐷' },
]

export default function OffersSection() {
  return (
    <section className="py-14 bg-amber-50/80 border-y border-amber-200/50">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] text-center mb-12">
          ƯU ĐÃI TUYỂN SINH ĐẶC BIỆT
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((o, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl mb-3" aria-hidden>{o.icon}</div>
              <h3 className="font-semibold text-[#1e3a5f]">{o.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
