"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { TbBrandTabler, TbUserBolt } from "react-icons/tb";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FaGear } from "react-icons/fa6";
import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "./Logo";
import { LogoIcon } from "./LogoIcon";
import { IoLogOut } from "react-icons/io5";
import Dashboard from "./dashboard/Dashboard";
import Appearance from "./appearance/Appearance";
import ProfilePreview from "./ProfilePreview";
import { ILink } from "@/interfaces";
import { LuPaintbrush } from "react-icons/lu";
import axios from "axios";
import { PropagateLoader } from "react-spinners";

export function SidebarMenu({ currentUser }: any) {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useSearchParams();
  const initialTab = params.get("tab") || "Dashboard";
  const [tab, setTab] = useState(initialTab);
  const [loadingPreview, setLoadingPreview] = useState<boolean>(false);

  const [linksArray, setLinksArray] = useState<ILink[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);

  // console.log(linksArray);

  const fetchData = async () => {
    try {
      setLoading(true);
      setLoadingPreview(true);
      const response = await axios.get("/api/page");
      if (response.status === 200) {
        const data = response.data;
        // setLinks(data.links);
        setData(data);
        setLinksArray(data.links);
        setShouldFetch(false);
        // console.log("Links fetched successfully", data);
      }
      // else {
      //   setLinks([]);
      // }
    } catch (error) {
      console.error("Error fetching links:", error);
    } finally {
      setLoading(false);
      setLoadingPreview(false);
    }
  };

  useEffect(() => {
    if (tab) {
      router.push(`/dashboard?tab=${tab}`, undefined);
    }

    // Check if data is empty (e.g., after a page refresh)
    // const isDataEmpty = Object.keys(data).length === 0;

    if (shouldFetch) {
      fetchData();
    }
  }, [tab, shouldFetch]);

  const sidebarLinks = [
    {
      label: "Dashboard",
      icon: (
        <TbBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Appearance",
      icon: (
        <LuPaintbrush className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
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
  ];

  // console.log(data);

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
              {sidebarLinks.map((label, idx) => (
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
        <div className="md:flex gap-0 w-full bg-[#f3f3f1]">
          <Dashboard
            currentUser={currentUser}
            data={data}
            // linksArray={linksArray}
            loading={loading}
            setLoading={setLoading}
            setShouldFetch={setShouldFetch}
          />
          <ProfilePreview
            currentUser={currentUser}
            links={linksArray}
            loading={loading}
            data={data}
          />
        </div>
      ) : tab === "Appearance" ? (
        <div className="md:flex gap-0 w-full bg-[#f3f3f1]">
          <Appearance
            currentUser={currentUser}
            data={data}
            setShouldFetch={setShouldFetch}
            setLoadingPreview={setLoadingPreview}
          />
          <ProfilePreview
            currentUser={currentUser}
            links={linksArray}
            loading={loading}
            data={data}
          />
        </div>
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
