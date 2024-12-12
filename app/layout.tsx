import type { Metadata } from 'next'
import { Inter } from 'next/font/google'


import { ToasterProvider } from '@/components/toaster-provider'
import { ModalProvider } from '@/components/modal-provider'
import { CrispProvider } from '@/components/crisp-provider'

import './globals.css'

const font = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Psb-Reports',
  description: 'PSB Reports',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
      <html lang="en" suppressHydrationWarning>
      
        <body className={font.className}>
          <ToasterProvider />
          <ModalProvider />
          {children}
        </body>
      </html>

  )
}
