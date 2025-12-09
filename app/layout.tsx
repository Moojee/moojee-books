import './globals.css'
import type { Metadata } from 'next'
import { Prompt } from 'next/font/google'

// ตั้งค่า Prompt (เพิ่มน้ำหนักเผื่อไว้ให้สวยงามครับ)
const prompt = Prompt({
  subsets: ['latin', 'thai'], 
  weight: ['300', '400', '500', '700'], 
  variable: '--font-prompt', // เก็บไว้เผื่อใช้ใน Tailwind
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Moojee Books',
  description: 'รีวิวหนังสือ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className="scroll-smooth">
      {/* แก้ตรงนี้: ใช้ prompt.className เพื่อให้ฟอนต์มีผลกับทุกตัวอักษรในเว็บ */}
      <body className={prompt.className}>
        {children}
      </body>
    </html>
  )
}