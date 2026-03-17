'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface RSVPData {
  id: string
  timestamp: string
  ten: string
  diDuoc: 'co' | 'khong'
  soNguoi: number
  loiNhan: string
  guestName?: string
}

export default function RSVPListPage() {
  const [rsvps, setRsvps] = useState<RSVPData[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'co' | 'khong'>('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('vietanh_rsvp')
    if (stored) {
      try {
        const list: RSVPData[] = JSON.parse(stored)
        // Sort by timestamp descending (newest first)
        list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        setRsvps(list)
      } catch {
        console.error('Failed to parse RSVP data')
      }
    }
    setLoading(false)
  }, [])

  const filteredRsvps = rsvps.filter(r => {
    const matchFilter = filter === 'all' || r.diDuoc === filter
    const matchSearch = r.ten.toLowerCase().includes(search.toLowerCase()) ||
                       (r.guestName?.toLowerCase().includes(search.toLowerCase()))
    return matchFilter && matchSearch
  })

  const totalAttendees = rsvps
    .filter(r => r.diDuoc === 'co')
    .reduce((sum, r) => sum + r.soNguoi, 0)

  const deleteRSVP = (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa phản hồi này?')) return
    const updated = rsvps.filter(r => r.id !== id)
    setRsvps(updated)
    localStorage.setItem('vietanh_rsvp', JSON.stringify(updated))
  }

  const formatDate = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Đang tải...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#1e3a5f] text-white py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin – Danh sách RSVP</h1>
          <Link href="/admin" className="text-sm hover:underline">
            ← Quay lại Admin
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-3xl font-bold text-[#1e3a5f]">{rsvps.length}</p>
            <p className="text-gray-600 text-sm">Tổng số phản hồi</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-3xl font-bold text-green-600">
              {rsvps.filter(r => r.diDuoc === 'co').length}
            </p>
            <p className="text-gray-600 text-sm">Sẽ tham dự</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-3xl font-bold text-amber-600">{totalAttendees}</p>
            <p className="text-gray-600 text-sm">Tổng số người tham dự</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Tìm theo tên hoặc người mời..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1e3a5f] focus:border-[#1e3a5f] outline-none"
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'co', 'khong'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === f
                      ? 'bg-[#1e3a5f] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {f === 'all' ? 'Tất cả' : f === 'co' ? 'Sẽ tham dự' : 'Không tham dự'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {filteredRsvps.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              Chưa có phản hồi nào.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Thời gian</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tên</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Trạng thái</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Số người</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Người mời</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Lời nhắn</th>
                    <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredRsvps.map(r => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                        {formatDate(r.timestamp)}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-800">
                        {r.ten}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                          r.diDuoc === 'co' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {r.diDuoc === 'co' ? '✅ Có' : '❌ Không'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {r.diDuoc === 'co' ? r.soNguoi : '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {r.guestName || '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 max-w-[200px] truncate">
                        {r.loiNhan || '—'}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => deleteRSVP(r.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
