export default function ExploreSchool() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a5f] mb-4">
              Khám phá môi trường học tập tại Trường Việt – Anh
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Nơi mỗi học sinh được phát triển toàn diện về trí tuệ – nhân cách – kỹ năng.
            </p>
            <div className="space-y-2 text-gray-700">
              <p className="flex items-center gap-2">
                <span aria-hidden>🏣</span>
                751 Nguyễn Văn Linh, phường An Biên, thành phố Hải Phòng
              </p>
              <p className="flex items-center gap-2">
                <span aria-hidden>📱</span>
                Hotline: 0904399929
              </p>
            </div>
          </div>
          <div className="aspect-video rounded-xl bg-gray-100 border border-gray-200 min-h-[200px]" aria-label="Ảnh hoặc video trường (để trống, thêm sau)" />
        </div>
      </div>
    </section>
  )
}
