"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { TbBrandTabler, TbUserBolt } from "react-icons/tb";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FaFire, FaGear } from "react-icons/fa6";
import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "./Logo";
import { LogoIcon } from "./LogoIcon";
import { IoLogOut } from "react-icons/io5";
import ProfilePreview from "./ProfilePreview";
import { FcBrokenLink } from "react-icons/fc";
import { Button } from "./ui/button";
import Link from "next/link";
import CopyLink from "./links/CopyLink";
import AddLinks from "./links/AddLinks";

export function SidebarMenu({ currentUser }: any) {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const initialTab = params.get("tab") || "Dashboard";
  const [tab, setTab] = useState(initialTab);

  useEffect(() => {
    if (tab) {
      router.push(`/dashboard?tab=${tab}`, undefined);
    }
  }, [tab]);

  const links = [
    {
      label: "Dashboard",
      icon: (
        <TbBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      icon: (
        <TbUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      icon: (
        <FaGear className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    // {
    //   label: "Logout",
    //   icon: (
    //     <FaArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    //   ),
    // },
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
              {links.map((label, idx) => (
                <SidebarLink key={idx} link={label} setTab={setTab} />
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-col items-start gap-2">
            <SidebarLink
              setTab={setTab}
              link={{
                label: "Logout",
                icon: (
                  <IoLogOut
                    size={25}
                    className="text-neutral-700 dark:text-neutral-200 flex-shrink-0"
                  />
                ),
              }}
            />
            <SidebarLink
              setTab={setTab}
              link={{
                label: session?.user?.name as string,
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
      {tab === "Dashboard" ? (
        <Dashboard currentUser={currentUser} />
      ) : tab === "Profile" ? (
        "Profile"
      ) : tab === "Settings" ? (
        "Settings"
      ) : (
        tab === "Logout" && signOut()
      )}
    </div>
  );
}

// Dummy dashboard component with content
const Dashboard = ({ currentUser }: any) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-1 gap-0 w-full bg-[#f3f3f1]">
      <div className="md:col-span-3 overflow-y-auto ">
        <CopyLink currentUser={currentUser} />
        <AddLinks />
      </div>
      <div className="md:col-span-2 md:col-start-4 flex justify-center items-center md:border-l border-red-500">
        <ProfilePreview currentUser={currentUser} />
      </div>
    </div>
  );
};