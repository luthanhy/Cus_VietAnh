'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

export default function AdminPage() {
  const [tenKhach, setTenKhach] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [copied, setCopied] = useState(false)
  const [message, setMessage] = useState('')

  const formatDateTime = (dtStr: string) => {
    if (!dtStr) return ''
    const date = new Date(dtStr)
    // Extract time (HH:MM)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    // Extract date (DD/MM/YYYY)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    
    return `${hours}:${minutes} Ngày ${day}/${month}/${year}`
  }

  const getInviteUrl = useCallback(() => {
    if (typeof window === 'undefined') return ''
    const base = window.location.origin
    const guest = tenKhach.trim() || 'quý khách'
    const formattedTime = formatDateTime(dateTime)
    
    const params = new URLSearchParams()
    if (guest !== 'quý khách') params.append('guest', guest)
    if (formattedTime) params.append('time', formattedTime)
    
    const queryString = params.toString()
    return queryString ? `${base}/?${queryString}` : `${base}/`
  }, [tenKhach, dateTime])

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
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Admin – Thông tin khách mời</h1>
          <Link
            href="/"
            className="text-sm text-[#1e3a5f] hover:underline"
          >
            ← Về trang chủ
          </Link>
        </div>

        <p className="text-gray-600 mb-6">
          Nhập tên và chọn thời gian để tạo link mời riêng. Thiết lập này sẽ cập nhật trực tiếp lên thời gian trên link đăng ký khách.
        </p>

        <div className="mb-4">
          <label htmlFor="guest-name" className="block text-sm font-medium text-gray-700 mb-2">
            Tên khách mời
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
          <label htmlFor="guest-datetime" className="block text-sm font-medium text-gray-700 mb-2">
            Thời gian tổ chức (tùy chọn)
          </label>
          <input
            id="guest-datetime"
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
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
          Mở trang mời với URL này →
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
