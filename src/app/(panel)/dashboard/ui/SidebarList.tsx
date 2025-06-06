'use client';


import React from 'react'
import { Navigation } from './Sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation';

import {
    HomeIcon,
    UsersIcon,
    TicketIcon,
} from '@heroicons/react/24/outline'


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const SidebarList = ({ navigation }: { navigation: Navigation[] }) => {
    const pathname = usePathname();

    // console.log(pathname);

    return (
        <>
            <li>
                <ul className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={classNames(
                                    pathname === item.href
                                        ? 'bg-gray-800 text-white'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                    'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                )}
                            >
                                {item.icon === 'HomeIcon' && <HomeIcon aria-hidden="true" className="size-6 shrink-0" />}
                                {item.icon === 'UsersIcon' && <UsersIcon aria-hidden="true" className="size-6 shrink-0" />}
                                {item.icon === 'TicketIcon' && <TicketIcon aria-hidden="true" className="size-6 shrink-0" />}
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </li>
        </>
    )
}

export default SidebarList