'use client';
import React from 'react'
import { HeroUIProvider } from '@heroui/react'
import { SessionProvider } from 'next-auth/react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <SessionProvider>
            <HeroUIProvider>
                <div className='dark text-foreground bg-background'>
                    {children}
                </div>
            </HeroUIProvider>
        </SessionProvider>
    )
}

export default Layout