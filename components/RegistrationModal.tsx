'use client'

import { useState, useEffect } from 'react'

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

interface RSVPData {
  id: string
  timestamp: string
  ten: string
  diDuoc: 'co' | 'khong'
  soNguoi: number
  loiNhan: string
  guestName?: string // ai mời
}

function generateId() {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [ten, setTen] = useState('')
  const [diDuoc, setDiDuoc] = useState<'co' | 'khong'>('co')
  const [soNguoi, setSoNguoi] = useState(2)
  const [loiNhan, setLoiNhan] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  // Lấy guest từ URL để lưu cùng
  const [guestName, setGuestName] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const guest = params.get('guest')
      setGuestName(guest || '')
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!ten.trim()) {
      setError('Vui lòng nhập tên của quý khách.')
      return
    }

    const rsvpData: RSVPData = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      ten: ten.trim(),
      diDuoc,
      soNguoi: diDuoc === 'co' ? soNguoi : 0,
      loiNhan: loiNhan.trim(),
      guestName: guestName || undefined,
    }

    // Lưu vào localStorage (demo)
    const existing = localStorage.getItem('vietanh_rsvp')
    const list: RSVPData[] = existing ? JSON.parse(existing) : []
    list.push(rsvpData)
    localStorage.setItem('vietanh_rsvp', JSON.stringify(list))

    setSubmitted(true)
  }

  const handleClose = () => {
    setTen('')
    setDiDuoc('co')
    setSoNguoi(2)
    setLoiNhan('')
    setSubmitted(false)
    setError('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60" 
        onClick={handleClose}
        aria-hidden
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-[#1e3a5f]">
            Xác nhận tham dự
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Đóng"
          >
            ×
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">
              Cảm ơn bạn!
            </h3>
            <p className="text-gray-600 mb-6">
              Thông tin xác nhận của bạn đã được ghi lại. Chúng tôi sẽ liên hệ sớm.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2a4a73]"
            >
              Đóng
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Tên */}
            <div>
              <label htmlFor="rsvp-ten" className="block text-sm font-medium text-gray-700 mb-1">
                Tên của quý khách <span className="text-red-500">*</span>
              </label>
              <input
                id="rsvp-ten"
                type="text"
                value={ten}
                onChange={(e) => setTen(e.target.value)}
                placeholder="Nhập tên"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
              />
            </div>

            {/* Có đi không? */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quý khách có thể tham dự không?
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="diDuoc"
                    checked={diDuoc === 'co'}
                    onChange={() => setDiDuoc('co')}
                    className="w-4 h-4 text-[#1e3a5f]"
                  />
                  <span className="text-gray-700">Có</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="diDuoc"
                    checked={diDuoc === 'khong'}
                    onChange={() => setDiDuoc('khong')}
                    className="w-4 h-4 text-[#1e3a5f]"
                  />
                  <span className="text-gray-700">Không</span>
                </label>
              </div>
            </div>

            {/* Số người (nếu đi) */}
            {diDuoc === 'co' && (
              <div>
                <label htmlFor="rsvp-soNguoi" className="block text-sm font-medium text-gray-700 mb-1">
                  Số người tham dự
                </label>
                <select
                  id="rsvp-soNguoi"
                  value={soNguoi}
                  onChange={(e) => setSoNguoi(Number(e.target.value))}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <option key={n} value={n}>{n} người</option>
                  ))}
                </select>
              </div>
            )}

            {/* Lời nhắn */}
            <div>
              <label htmlFor="rsvp-loiNhan" className="block text-sm font-medium text-gray-700 mb-1">
                Lời nhắn (tùy chọn)
              </label>
              <textarea
                id="rsvp-loiNhan"
                value={loiNhan}
                onChange={(e) => setLoiNhan(e.target.value)}
                placeholder="Nhập lời nhắn..."
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none resize-none"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#e8b923] text-[#1e3a5f] font-bold rounded-lg hover:bg-amber-500 transition-colors"
            >
              XÁC NHẬN
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
