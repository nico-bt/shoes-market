import { UserProvider } from "./context/userContext"
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Shoe Market",
  description: "Trending shoes",
}

export default function RootLayout({ children }) {
  return (
    <UserProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </UserProvider>
  )
}
