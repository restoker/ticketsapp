
import {
    Cog6ToothIcon,
    HomeIcon,
    UsersIcon,
    TicketIcon,
} from '@heroicons/react/24/outline'
import { ExtendUser } from '../../../../../next-auth';
import { cookies, headers } from 'next/headers';

const teams = [
    { id: 1, name: 'Heroicons', href: '#', initial: 'H', current: false },
    { id: 2, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
    { id: 3, name: 'Workcation', href: '#', initial: 'W', current: false },
];


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

interface Navigation {
    name: string;
    href: string;
    icon: any;
    current: boolean;
}

const Sidebar = async ({ user }: { user: ExtendUser }) => {
    // console.log(user);
    const headerList = await headers();
    const csrfToken = (await cookies()).getAll().find((cookie) => cookie.name === 'authjs.csrf-token')?.value;
    const sessionToken = (await cookies()).getAll().find((cookie) => cookie.name === 'authjs.session-token')?.value;
    const pathname = headerList.get("x-current-path");
    console.log(csrfToken);
    console.log(sessionToken);
    let navigation: Navigation[] = [];

    switch (user.role) {
        case 'user':
            navigation = [
                { name: 'Home', href: '/dashboard', icon: HomeIcon, current: true },
                { name: 'Crear ticket', href: '/dashboard/task', icon: TicketIcon, current: false },
            ];
            break;
        case 'agent':
            navigation = [
                { name: 'Home', href: '/dashboard', icon: HomeIcon, current: true },
                // { name: 'Crear ticket', href: '/dashboard/task', icon: UsersIcon, current: false },
            ];
            break;
        case 'admin':
            navigation = [
                { name: 'Home', href: '/dashboard', icon: HomeIcon, current: true },
                { name: 'usuarios', href: '/dashboard/users', icon: UsersIcon, current: false },
            ];
            break;
    }

    return (
        <>
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                        <img
                            alt="Your Company"
                            src="https://cdn.cosmos.so/a480584a-2c25-42f5-a380-b080f07e787a?format=jpeg"
                            className="size-20 w-auto object-cover"
                        />
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul role="list" className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-800 text-white'
                                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                )}
                                            >
                                                <item.icon aria-hidden="true" className="size-6 shrink-0" />
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <div className="text-xs/6 font-semibold text-gray-400">Your teams</div>
                                <ul role="list" className="-mx-2 mt-2 space-y-1">
                                    {teams.map((team) => (
                                        <li key={team.name}>
                                            <a
                                                href={team.href}
                                                className={classNames(
                                                    team.current
                                                        ? 'bg-gray-800 text-white'
                                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                )}
                                            >
                                                <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                                    {team.initial}
                                                </span>
                                                <span className="truncate">{team.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="mt-auto">
                                <a
                                    href="#"
                                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                                >
                                    <Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0" />
                                    Settings
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Sidebar