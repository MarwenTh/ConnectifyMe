"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { IoLogOut } from "react-icons/io5";
import Image from "next/image";
import { useState } from "react";
import { TbBrandTabler, TbUserBolt } from "react-icons/tb";
import { LuPaintbrush } from "react-icons/lu";
import { FaGear } from "react-icons/fa6";
import { Logo } from "../../components/Logo";
import { LogoIcon } from "../../components/LogoIcon";
import { useSession } from "next-auth/react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  const [tab, setTab] = useState("Dashboard");
  const links = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: (
        <TbBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Appearance",
      href: "/admin/appearance",
      icon: (
        <LuPaintbrush className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "/admin/profile",
      icon: (
        <TbUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: (
        <FaGear className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: session?.user?.name as string,
                href: "#",
                icon: (
                  <Image
                    src={session?.user?.image as string}
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main content */}
      <main style={{ flex: 1, padding: "20px", backgroundColor: "#eee" }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
