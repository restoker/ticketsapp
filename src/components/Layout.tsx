'use client';
import React from 'react'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { SessionProvider } from 'next-auth/react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <HeroUIProvider>
                <ToastProvider />
                <div className='dark'>
                    {children}
                </div>
            </HeroUIProvider>
        </SessionProvider>
    )
}

export default Layout