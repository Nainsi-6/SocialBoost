// import type { Metadata } from 'next'
// import { Geist, Geist_Mono } from 'next/font/google'
// import { Analytics } from '@vercel/analytics/next'
// import Sidebar from '@/components/Sidebar'
// import './globals.css'

// const _geist = Geist({ subsets: ["latin"] });
// const _geistMono = Geist_Mono({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: 'SocialBoost - Buy Instagram Followers & Engagement',
//   description: 'Get real Instagram followers, likes, comments, and views. Best social media growth service with fast delivery and 100% satisfaction guarantee.',
//   generator: 'v0.app',
//   icons: {
//     icon: [
//       {
//         url: '/icon-light-32x32.png',
//         media: '(prefers-color-scheme: light)',
//       },
//       {
//         url: '/icon-dark-32x32.png',
//         media: '(prefers-color-scheme: dark)',
//       },
//       {
//         url: '/icon.svg',
//         type: 'image/svg+xml',
//       },
//     ],
//     apple: '/apple-icon.png',
//   },
//   viewport: {
//     width: 'device-width',
//     initialScale: 1,
//     maximumScale: 5,
//   },
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   // return (
//   //   <html lang="en">
//   //     <body className="font-sans antialiased bg-slate-950 text-slate-50 dark">
//   //       <div className="flex">
//   //         <Sidebar />
//   //         <main className="flex-1 min-h-screen lg:ml-0">
//   //           {children}
//   //         </main>
//   //       </div>
//   //       <Analytics />
//   //     </body>
//   //   </html>
//   // )
//   return (
//     <html lang="en">
//       <body className={`${geist.className} bg-slate-950 text-white`}>
//         <Header />
//         <main className="min-h-screen">
//           {children}
//         </main>
//         <Analytics />
//       </body>
//     </html>
//   )
// }


import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Header from '@/components/Header'
import './globals.css'

const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SocialBoost - Buy Instagram Followers & Engagement',
  description:
    'Get real Instagram followers, likes, comments, and views. Best social media growth service with fast delivery.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-slate-950 text-white`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}