import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Billing & Invoice Manager',
  description: 'Manage your invoices and billing with ease',
  icons: {
    icon: [
      {
        url: '/Dashboard1.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/Dashboard1.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/Dashboard1.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/Dashboard1.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
