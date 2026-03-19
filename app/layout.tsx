import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Header from '@/components/Header'
import QueryProvider from '@/components/QueryProvider'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fastxera — #1 Social Media Growth Service',
  description:
    'Grow your social media presence with real followers, likes, comments, and views. Fast delivery, best prices, 100% safe.',
}

export default function RootsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-amber-50/40 text-gray-900`}>
        <QueryProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  )
}
