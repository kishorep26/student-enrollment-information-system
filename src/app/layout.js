import './globals.css'
import { Inter } from 'next/font/google'
import { AuthContextProvider } from '@/src/context/AuthContext'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SEIS',
  description: 'Student Enrollment Information System',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' data-theme='dark'>
      <body className={inter.className}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  )
}
