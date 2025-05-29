'use client';
import React from 'react'
import { HeroUIProvider } from '@heroui/react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <HeroUIProvider>
            <div className='dark text-foreground bg-background'>
                {children}
            </div>
        </HeroUIProvider>
    )
}

export default Layout