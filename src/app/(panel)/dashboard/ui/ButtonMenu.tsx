'use client';

import useMenuStore from '@/store/menuStore';
import { Bars3Icon } from '@heroicons/react/24/outline'
import React from 'react'

const ButtonMenu = () => {
    const { open, setOpen } = useMenuStore();
    return (
        <button type="button" onClick={() => setOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
    )
}

export default ButtonMenu