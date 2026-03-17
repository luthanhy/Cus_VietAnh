'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [tenKhach, setTenKhach] = useState('')
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState('')

  const getInviteUrl = useCallback(() => {
    if (typeof window === 'undefined') return ''
    const base = window.location.origin
    const guest = tenKhach.trim() || 'quý khách'
    return `${base}/?guest=${encodeURIComponent(guest)}`
  }, [tenKhach])

  const copyLink = useCallback(async () => {
    const url = getInviteUrl()
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setMessage('Đã copy link vào clipboard.')
      setTimeout(() => {
        setCopied(false)
        setMessage('')
      }, 3000)
    } catch {
      setMessage('Không copy được. Bạn có thể copy link bên dưới thủ công.')
    }
  }, [getInviteUrl])

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Admin – Thay tên khách mời</h1>
          <Link
            href="/"
            className="text-sm text-[#1e3a5f] hover:underline"
          >
            ← Về trang chủ
          </Link>
        </div>

        <p className="text-gray-600 mb-6">
          Nhập tên hoặc xưng hô thay cho &quot;quý khách&quot; trên trang mời. Sau đó tạo link và gửi cho khách; khi họ mở link, trang sẽ hiển thị đúng tên bạn đã điền.
        </p>

        <div className="mb-6">
          <label htmlFor="guest-name" className="block text-sm font-medium text-gray-700 mb-2">
            Tên khách mời (thay cho &quot;quý khách&quot;)
          </label>
          <input
            id="guest-name"
            type="text"
            value={tenKhach}
            onChange={(e) => setTenKhach(e.target.value)}
            placeholder="Ví dụ: Phụ huynh lớp Lá, Anh/Chị, ..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
          />
        </div>

        <div className="mb-6">
          <button
            type="button"
            onClick={copyLink}
            className="w-full py-3 px-4 bg-[#e8b923] text-[#1e3a5f] font-bold rounded-lg hover:bg-amber-500 transition-colors"
          >
            {copied ? 'Đã copy!' : 'Tạo link mời và copy'}
          </button>
        </div>

        {message && (
          <p className="mb-4 text-sm text-green-600" role="alert">
            {message}
          </p>
        )}

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Link mời (copy và gửi cho khách)
          </label>
          <input
            type="text"
            readOnly
            value={getInviteUrl()}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600"
          />
        </div>

        <Link
          href={getInviteUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block py-2 px-4 text-[#1e3a5f] font-medium hover:underline"
        >
          Mở trang mời với tên này →
        </Link>
      </div>

      {/* Menu Admin */}
      <div className="max-w-xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-bold text-[#1e3a5f] mb-4">Menu Admin</h2>
        <div className="space-y-2">
          <Link
            href="/admin/rsvp"
            className="block py-3 px-4 bg-[#1e3a5f] text-white rounded-lg hover:bg-[#2a4a73] transition-colors text-center font-medium"
          >
            📋 Danh sách RSVP (phản hồi)
          </Link>
        </div>
      </div>
    </main>
  )
}
