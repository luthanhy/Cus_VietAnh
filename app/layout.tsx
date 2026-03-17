import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'

const beVietnam = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-be-vietnam',
})

export const metadata: Metadata = {
  title: 'Canh Tý Sẵn Sàng – Vững Vàng Lớp 1 | Trường TH & THCS Việt – Anh',
  description: 'Hội thảo dành cho phụ huynh có con chuẩn bị vào lớp 1. Trường Tiểu học & THCS Việt – Anh.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
