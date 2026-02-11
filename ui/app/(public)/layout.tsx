"use client"
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import '../../styles/globals.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css'
const metadata: Metadata = {
    title: 'v0 App',
    description: 'Created with v0',
    generator: 'v0.app',
}

export default function PublicLayout ( {
    children,
}: Readonly<{
    children: React.ReactNode
}> ) {
    return (
        <html lang="en">
            <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} flex min-h-screen bg-background`}>
                <ToastContainer />
                {children}
                <Analytics />
            </body>
        </html>
    )
}
