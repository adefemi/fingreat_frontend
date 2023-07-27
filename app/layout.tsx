import type { Metadata } from 'next'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "./main.css"

export const metadata: Metadata = {
  title: 'Fingreat - Financial App',
  description: 'Fingreat - Financial App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
