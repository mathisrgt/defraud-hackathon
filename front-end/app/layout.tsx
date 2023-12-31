import { Inter } from 'next/font/google'
import Providers from "@/app/providers";
import "@suiet/wallet-kit/style.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'DeFraud',
  description: 'DeFraud DApp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  )
}
