"use client";
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { TbBrandTabler, TbUserBolt } from "react-icons/tb";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FaFire, FaGear, FaXmark } from "react-icons/fa6";
import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "./Logo";
import { LogoIcon } from "./LogoIcon";
import { IoLogOut } from "react-icons/io5";
import ProfilePreview from "./ProfilePreview";
import { FcBrokenLink } from "react-icons/fc";
import { Button } from "./ui/button";
import CopyLink from "./links/CopyLink";
import AddLinks from "./links/AddLinks";
import GeneratedLinks from "./links/GeneratedLinks";
import { IoMdAdd } from "react-icons/io";
import { Input } from "./ui/input";
import { GoSearch } from "react-icons/go";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { ILink } from "@/interfaces";
import { ImSpinner10 } from "react-icons/im";

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
  const [modalOpen, setModalOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [link, setLink] = useState("");
  const [isLinkValid, setIsLinkValid] = useState(false);
  const [search, setSearch] = useState("");
  const [shouldFetch, setShouldFetch] = useState(true);
  const [loading, setLoading] = useState<boolean>(false);
  const socialIcons = [
    {
      name: "X",
      icon: "https://link-types-assets.production.linktr.ee/twitter/icon.svg",
    },
    {
      name: "facebook",
      icon: "https://link-types-assets.production.linktr.ee/facebook/icon.svg",
    },
    {
      name: "instagram",
      icon: "https://link-types-assets.production.linktr.ee/instagram/icon.svg",
    },
    {
      name: "tiktok",
      icon: "https://link-types-assets.production.linktr.ee/tiktok/icon.svg",
    },
    {
      name: "youtube",
      icon: "https://link-types-assets.production.linktr.ee/youtube/icon.svg",
    },
    {
      name: "twitch",
      icon: "https://link-types-assets.production.linktr.ee/twitch/icon.svg",
    },
  ];

  // function to check if the link is valid
  const isValidLink = (link: string) => {
    if (link === "" || !link.startsWith("http") || !link.startsWith("https")) {
      return false;
    } else {
      return true;
    }
  };

  const checkLink = (link: string) => {
    if (isValidLink(link)) {
      setIsLinkValid(false);
    } else {
      setIsLinkValid(true);
    }
  };

  const filteredIcons = socialIcons.filter((icon) =>
    icon.name.toLowerCase().includes(search.toLowerCase())
  );

  const addLinkData = async (newLink: ILink) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/page", newLink);

      if (response.status === 200) {
        console.log("Link added successfully");
        setLink(""); // Clear the link input
        setModalOpen(false); // Close the modal
        refreshLinks(); // Refresh the links
      }
    } catch (error) {
      console.error("Error adding link:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshLinks = () => {
    setShouldFetch(true);
  };

  return (
    <div className="md:flex gap-0 w-full bg-[#f3f3f1]">
      <div className="md:col-span-3 overflow-auto h-screen lg:w-[65%] scrollbar-thumb-slate-500 scrollbar-track-transparent scrollbar-thin scrollbar-corner-violet-800">
        <CopyLink currentUser={currentUser} />
        <div className=" flex items-center flex-col w-full px-2 md:px-5">
          <div className=" flex justify-center w-full mt-10">
            <div className=" w-full">
              <div>
                <AnimatePresence mode="wait">
                  {!modalOpen ? (
                    <motion.div
                      key="modal"
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      // transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <Button
                        className=" w-full rounded-full py-5 bg-blue-800 hover:bg-blue-700 flex space-x-1"
                        onClick={() => {
                          setLink("");
                          setModalOpen(true);
                        }}
                        disabled={loading}
                      >
                        {loading ? (
                          <ImSpinner10 size={20} className=" animate-spin" />
                        ) : (
                          <>
                            <IoMdAdd className=" text-white text-xl" />
                            <span className=" font-semibold">Add Link</span>
                          </>
                        )}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="button"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                      className="bg-white rounded-2xl w-full p-4"
                    >
                      <FaXmark
                        className=" flex justify-end cursor-pointer hover:bg-neutral-600/20 rounded-full h-10 w-10 p-3 transition duration-200 mb-3"
                        onClick={() => {
                          setLink("");
                          setModalOpen(false);
                        }}
                      />
                      <div className=" flex items-center space-x-5">
                        <Input
                          placeholder="Enter URL"
                          value={link}
                          onChange={(e) => {
                            setLink(e.target.value);
                            checkLink(e.target.value);
                          }}
                        />
                        <Button
                          className="  rounded-full py-5 bg-blue-800 hover:bg-blue-700"
                          disabled={isLinkValid}
                          onClick={() =>
                            addLinkData({
                              title: "Link",
                              link,
                              active: true,
                            })
                          }
                        >
                          <span className=" font-semibold">Add</span>
                        </Button>
                      </div>
                      <hr className=" my-8" />
                      <div className=" my-6  mr-3 ">
                        {!searchOpen ? (
                          <div className=" flex justify-between items-center">
                            <span className=" text-sm font-bold">
                              Most used social
                            </span>
                            <GoSearch
                              className=" h-12 w-12 bg-white border rounded-full p-3 cursor-pointer hover:bg-[#f6f7f5]"
                              onClick={() => setSearchOpen(true)}
                            />
                          </div>
                        ) : (
                          <Input
                            placeholder="Search"
                            className=" w-full"
                            onChange={(e) => {
                              setSearch(e.target.value);
                            }}
                          />
                        )}
                      </div>
                      <div className="w-full overflow-x-auto scrollbar-thumb-slate-500 scrollbar-track-transparent scrollbar-thin scrollbar-corner-violet-800">
                        <div className={`flex flex-row space-x-4 `}>
                          {filteredIcons.map((icon, idx) => (
                            <div
                              key={idx}
                              className="flex items-center flex-col space-y-2 min-w-max"
                            >
                              <div
                                className="rounded-3xl grid place-items-center py-5 px-5 bg-[#f3f3f1] cursor-pointer hover:bg-[#d5d6d4] transition duration-200"
                                onClick={() => {
                                  addLinkData({
                                    title: icon.name,
                                    link: "",
                                    active: true,
                                  });
                                  setModalOpen(false);
                                }}
                              >
                                <Image
                                  src={icon.icon}
                                  width={40}
                                  height={40}
                                  alt={icon.name}
                                />
                              </div>
                              <span className="font-semibold text-xs capitalize">
                                {icon.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <GeneratedLinks
            currentUser={currentUser}
            modalOpen={modalOpen}
            refreshLinks={refreshLinks}
            setShouldFetch={setShouldFetch}
            shouldFetch={shouldFetch}
          />
        </div>
      </div>
      <div className="hidden md:flex justify-center items-center w-full lg:w-[35%] md:border-l border-red-500">
        {/* <ProfilePreview currentUser={currentUser} links={links} /> */}
      </div>
    </div>
  );
};
