'use client';

import { MenuItem } from "@headlessui/react";
import { signOut } from "next-auth/react";

const MenuPerfil = () => {
    return (
        <>
            <MenuItem>
                <div
                    className="block cursor-pointer px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-zinc-950 data-focus:text-white data-focus:outline-hidden"
                >
                    Tu perfil
                </div>
            </MenuItem>
            <MenuItem>
                <div
                    className="block cursor-pointer px-3 py-1 text-sm/6 text-gray-900 data-focus:bg-zinc-950 data-focus:text-white data-focus:outline-hidden"
                    onClick={() => signOut()}
                >
                    Cerrar Sesión
                </div>
            </MenuItem>
        </>
    )
}

export default MenuPerfil