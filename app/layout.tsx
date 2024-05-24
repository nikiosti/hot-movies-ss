import '@mantine/core/styles.css'

import { MantineProvider } from '@mantine/core'
import { theme } from '@/theme/mantine-theme'

import { Provider } from '@/providers/query-client-provider'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ArrowFlicks',
  description: 'Only hot movies',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <MantineProvider theme={theme}>{children}</MantineProvider>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
