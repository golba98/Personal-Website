import type { Metadata } from 'next'
import { DM_Sans, DM_Mono } from 'next/font/google'
import { SessionProvider } from '@/components/SessionProvider'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Jordan Vorster — CS Student & Developer',
  description:
    'CS student at the University of London building real software. Open to internships and junior roles in web development, AI/ML, and software engineering.',
  keywords: [
    'Jordan Vorster',
    'CS student',
    'developer',
    'portfolio',
    'South Africa',
    'internship',
    'web development',
    'TypeScript',
    'Next.js',
  ],
  openGraph: {
    title: 'Jordan Vorster — CS Student & Developer',
    description:
      'CS student at the University of London. Open to internships and junior roles.',
    url: 'https://jordanvorsterwebsite.online',
    siteName: 'Jordan Vorster',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Jordan Vorster — CS Student & Developer',
    description:
      'CS student at the University of London. Open to internships and junior roles.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`} style={{ colorScheme: 'dark' }}>
      <body className="bg-[#0a0a0a] text-[#f5f5f5] font-sans min-h-screen">
        <SmoothScrollProvider>
          <SessionProvider>{children}</SessionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
