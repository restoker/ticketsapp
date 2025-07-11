"use client";

import type { NavbarProps } from "@heroui/react";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Button,
  cn,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { AcmeIcon } from "./social";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";


const BasicNavbar = React.forwardRef<HTMLElement, NavbarProps>(
  ({ classNames = {}, ...props }, ref) => {
    const { data: session } = useSession();
    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
      <Navbar
        ref={ref}
        {...props}
        classNames={{
          base: cn("border-default-100 bg-transparent", {
            "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
          }),
          wrapper: "w-full justify-center",
          item: "hidden md:flex",
          ...classNames,
        }}
        height="60px"
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        {/* Left Content */}
        <NavbarBrand>
          <div className="rounded-full bg-default-foreground text-background">
            <img src="https://cdn.cosmos.so/a480584a-2c25-42f5-a380-b080f07e787a?format=jpeg" alt="" className="size-20 w-auto object-cover" />
          </div>
          <span className="ml-2 text-small font-medium text-default-foreground">Task-Master</span>
        </NavbarBrand>

        {/* Center Content */}
        <NavbarContent justify="center">
          <NavbarItem isActive={pathname === "/"} className="data-[active='true']:font-medium[date-active='true']">
            <Link aria-current="page" className="text-default-foreground " href="/" size="sm">
              Home
            </Link>
          </NavbarItem>
          {/* <NavbarItem>
            <Link className="text-default-500" href="#" size="sm">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-default-500" href="#" size="sm">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-default-500" href="#" size="sm">
              About Us
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-default-500" href="#" size="sm">
              Integrations
            </Link>
          </NavbarItem> */}
        </NavbarContent>

        {/* Right Content */}
        <NavbarContent className="hidden md:flex" justify="end">
          <NavbarItem className="ml-2 !flex gap-2">
            <Link href="/login">
              <Button className="text-default-500" radius="full" variant="light">
                Login
              </Button>
            </Link>
            {!session ? null : <Link href="/dashboard">
              <Button
                className="bg-default-foreground font-medium text-background"
                color="secondary"
                endContent={<Icon icon="solar:alt-arrow-right-linear" />}
                radius="full"
                variant="flat"
              >
                Dashboard
              </Button>
            </Link>}
          </NavbarItem>
        </NavbarContent>

        <NavbarMenuToggle className="text-default-400 md:hidden" />

        <NavbarMenu
          className="top-[calc(var(--navbar-height)_-_1px)] max-h-full bg-zinc-950/50 pb-6 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 "
          motionProps={{
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -20 },
            transition: {
              ease: "easeInOut",
              duration: 0.2,
            },
          }}
        >
          <NavbarMenuItem>
            <Button fullWidth as={Link} href="/login" variant="faded">
              Login
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem className="mb-4">
            <Button fullWidth as={Link} className="bg-foreground text-background" href="/dashboard">
              Dashboard
            </Button>
          </NavbarMenuItem>
          {/* {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="mb-2 w-full text-default-500" href="#" size="md">
                {item}
              </Link>
              {index < menuItems.length - 1 && <Divider className="opacity-50" />}
            </NavbarMenuItem>
          ))} */}
        </NavbarMenu>
      </Navbar>
    );
  },
);

BasicNavbar.displayName = "BasicNavbar";

export default BasicNavbar;
