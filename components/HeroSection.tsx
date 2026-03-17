'use client'

interface HeroSectionProps {
  quyKhach: string
  onRegister?: () => void
}

export default function HeroSection({ quyKhach, onRegister }: HeroSectionProps) {
  return (
    <>
      {/* Hero: full-width banner như giao diện mẫu */}
      <section className="relative w-full min-h-[560px] md:min-h-[620px] flex flex-col">
        {/* Layer 1: Hai vùng ảnh học sinh trái + phải (để trống, thêm ảnh sau) */}
        <div className="absolute inset-0 flex">
          {/* Ảnh bên trái */}
          <div 
            className="flex-1 min-h-[280px] md:min-h-[310px] bg-cover bg-center bg-no-repeat bg-gray-200"
            aria-label="Ảnh học sinh (trái) - để trống, thêm ảnh sau"
          />
          {/* Ảnh bên phải */}
          <div 
            className="flex-1 min-h-[280px] md:min-h-[310px] bg-cover bg-center bg-no-repeat bg-gray-300"
            aria-label="Ảnh học sinh (phải) - để trống, thêm ảnh sau"
          />
        </div>

        {/* Layer 2: Overlay xanh đậm */}
        <div
          className="absolute inset-0 bg-[#1e3a5f]/85 z-[1]"
          aria-hidden
        />

        {/* Layer 3: Nội dung trên overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[560px] md:min-h-[620px] text-center px-4 py-10">
          {/* Header nhỏ */}
          <p className="text-white/95 text-sm tracking-wide mb-4">
            TRƯỜNG TIỂU HỌC & THCS VIỆT – ANH
          </p>

          {/* Tiêu đề chính */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl mb-2">
            CANH TÝ SẴN SÀNG – VỮNG VÀNG LỚP 1
          </h1>
          <p className="text-white/90 text-sm md:text-base mb-4">— READY FOR GRADE 1 —</p>

          <p className="text-white/95 text-sm md:text-base max-w-xl mb-2">
            Hội thảo dành cho phụ huynh có con chuẩn bị vào lớp 1
          </p>
          <p className="text-white/80 text-sm mb-6">Năm học 2026-2027</p>

          {/* Trân trọng kính mời [tên từ admin/link] */}
          <p className="text-white/95 text-sm md:text-base mb-6">
            Trân trọng kính mời <strong className="text-[#e8b923]">{quyKhach}</strong> tham dự.
          </p>

          {/* Thời gian & Địa điểm */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center text-white/95 text-sm mb-8">
            <span className="flex items-center justify-center gap-2">
              <span className="text-[#e8b923]" aria-hidden>⏰</span>
              Thời gian: 90 phút
            </span>
            <span className="flex items-center justify-center gap-2">
              <span className="text-[#e8b923]" aria-hidden>📍</span>
              Địa điểm: Trường Mầm non
            </span>
          </div>

          {/* CTA */}
          <button
            onClick={onRegister}
            className="inline-block px-8 py-3.5 bg-[#e8b923] text-[#1e3a5f] font-bold rounded-md hover:bg-amber-500 transition-colors shadow-lg"
          >
            ĐĂNG KÝ THAM DỰ NGAY
          </button>
        </div>
      </section>
    </>
  )
}
