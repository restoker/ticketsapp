import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ButtonMenu from "./ui/ButtonMenu";
import {
    Menu,
    MenuButton,
    MenuItems,
} from '@headlessui/react'
import SidebarMobil from "./ui/SidebarMobil";
import Sidebar from "./ui/Sidebar";
import MenuPerfil from "./ui/MenuPerfil";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        return redirect('/login');
    }
    const user = session.user;
    return (
        <>
            <div className="">
                <SidebarMobil />

                {/* Static sidebar for desktop */}
                <Sidebar user={user} />

                <div className="lg:pl-72">
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-zinc-200 px-4 shadow-xs sm:gap-x-6 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-lg">
                        <ButtonMenu />

                        {/* Separator */}
                        <div aria-hidden="true" className="h-6 w-px bg-zinc-900/10 lg:hidden" />

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <div className="flex items-center justify-end gap-x-4 lg:gap-x-6 flex-1">
                                {/* <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="size-6" />
                                </button> */}

                                {/* Separator */}
                                <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative">
                                    <MenuButton className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            alt=""
                                            src="https://cdn.cosmos.so/03c3c2be-9f18-4718-8a01-9c952941298b?format=jpeg"
                                            className="size-10 rounded-full bg-gray-50 object-cover"
                                        />
                                        <span className="hidden lg:flex lg:items-center">
                                            <span aria-hidden="true" className="ml-4 text-sm/6 font-semibold text-gray-50">
                                                {session?.user?.name}
                                            </span>
                                            <ChevronDownIcon aria-hidden="true" className="ml-2 size-5 text-gray-400" />
                                        </span>
                                    </MenuButton>
                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md py-2 ring-1 shadow-lg ring-gray-900/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in bg-white backdrop-blur-lg"
                                    >
                                        <MenuPerfil />
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <main className="py-10 h-full">
                        <div className="px-4 sm:px-6 lg:px-8">
                            {/* Your content */}
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}