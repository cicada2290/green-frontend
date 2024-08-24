import { APP_NAME, APP_DESCRIPTION } from '@/config'
import { Inter } from 'next/font/google'
import { Container } from '@mui/material'
import DynamicProvider from '@/components/providers/DynamicProvider'
import BiconomyProvider from '@/components/providers/BiconomyProvider'
import Header from '@/components/layout/Header'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DynamicProvider>
          <BiconomyProvider>
            <Header />
            <Container maxWidth="lg" sx={{ my: 10 }}>
              {children}
            </Container>
          </BiconomyProvider>
        </DynamicProvider>
      </body>
    </html>
  )
}
