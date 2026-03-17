interface CallToActionProps {
  onRegister?: () => void
}

export default function CallToAction({ onRegister }: CallToActionProps) {
  return (
    <section className="py-14 bg-[#1e3a5f] text-white" id="dang-ky">
      <div className="container mx-auto px-6 text-center">
        <button
          onClick={onRegister}
          className="inline-block px-10 py-4 bg-[#e8b923] text-[#1e3a5f] font-bold rounded-lg hover:bg-amber-500 transition-colors shadow-lg text-lg"
        >
          ĐĂNG KÝ THAM DỰ HỘI THẢO
        </button>
      </div>
    </section>
  )
}
