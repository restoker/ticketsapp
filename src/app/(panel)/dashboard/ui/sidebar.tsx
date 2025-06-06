
import {
    Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import { ExtendUser } from '../../../../../next-auth';
import { cookies, headers } from 'next/headers';
import SidebarList from './SidebarList';

export interface Navigation {
    name: string;
    href: string;
    icon: string;
    current: boolean;
}



const Sidebar = async ({ user }: { user: ExtendUser }) => {
    // console.log(user);
    const headerList = await headers();
    const cookie = await cookies();
    const csrfToken = cookie.getAll().find((cookie) => cookie.name === 'authjs.csrf-token')?.value;
    const sessionToken = cookie.getAll().find((cookie) => cookie.name === 'authjs.session-token')?.value;
    const pathname = headerList.get('x-pathname');
    let navigation: Navigation[] = [];
    switch (user.role) {
        case 'user':
            navigation = [
                { name: 'Home', href: '/dashboard/home', icon: 'HomeIcon', current: pathname === '/dashboard/home' },
                { name: 'Crear ticket', href: '/dashboard/task', icon: 'TicketIcon', current: pathname === '/dashboard/task' },
            ];
            break;
        case 'agent':
            navigation = [
                { name: 'Home', href: '/dashboard/home', icon: 'HomeIcon', current: pathname === '/dashboard/home' },
                // { name: 'Crear ticket', href: '/dashboard/task', icon: UsersIcon, current: false },
            ];
            break;
        case 'admin':
            navigation = [
                { name: 'Gestion', href: '/dashboard/gestion', icon: 'HomeIcon', current: pathname === '/dashboard/gestion' },
                { name: 'usuarios', href: '/dashboard/users', icon: 'UsersIcon', current: pathname === '/dashboard/users' },
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
                            <SidebarList navigation={navigation} />
                            {/* <li>
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
                            </li> */}
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