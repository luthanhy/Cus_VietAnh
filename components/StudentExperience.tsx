const experiences = [
  {
    title: 'TOÁN – STEAM',
    subtitle: 'Khám phá tư duy logic',
  },
  {
    title: 'TIẾNG VIỆT – STEAM',
    subtitle: 'Phát triển ngôn ngữ',
  },
  {
    title: 'ENGLISH SCIENCE',
    subtitle: 'Khám phá khoa học',
  },
]

export default function StudentExperience() {
  return (
    <section className="py-14 bg-[#1e3a5f] text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          TRẢI NGHIỆM DÀNH CHO HỌC SINH
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((e, i) => (
            <div
              key={i}
              className="bg-white/10 rounded-xl overflow-hidden border border-white/20 text-center"
            >
              <div className="aspect-[4/3] bg-white/5 min-h-[160px]" aria-label="Ảnh trải nghiệm (để trống, thêm sau)" />
              <div className="p-6">
                <h3 className="font-bold text-lg text-[#e8b923] mb-2">{e.title}</h3>
                <p className="text-white/90">{e.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
