const features = [
  'Song ngữ – hội nhập quốc tế',
  'Phát triển tư duy sáng tạo',
  'Học qua trải nghiệm – STEAM',
  'Giáo dục nhân cách',
  'Trí Tuệ - Thấu Hiểu - Yêu Thương',
]

export default function SchoolFeatures() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="aspect-[4/3] rounded-xl bg-gray-100 border border-gray-200 min-h-[240px]" aria-label="Ảnh thầy cô / không gian học (để trống, thêm sau)" />
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-6">
              TRƯỜNG TIỂU HỌC & THCS VIỆT - ANH
            </h2>
            <ul className="space-y-3">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700">
                  <span className="text-[#e8b923]">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
