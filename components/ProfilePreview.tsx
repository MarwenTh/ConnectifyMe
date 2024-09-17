"use client";

import Image from "next/image";
import React, { FC, useEffect } from "react";
import { Button } from "./ui/button";
import { FcBrokenLink } from "react-icons/fc";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ILink } from "@/interfaces";
import { FaSpinner } from "react-icons/fa6";

type Props = {
  currentUser?: any;
  links: Array<ILink>;
  loadingPreview?: boolean;
  isPublic?: boolean;
  userData?: any;
  data?: any;
};

const ProfilePreview: FC<Props> = ({
  currentUser,
  links,
  loadingPreview,
  isPublic,
  userData,
  data,
}) => {
  const user = currentUser;
  const pathname = usePathname();

  const stylesVariant = [
    {
      title: "Instagram",
      color: "bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    },
    {
      title: "Facebook",
      color: "bg-gradient-to-r from-[#3b5998] to-[#FFFFFF]",
    },
    {
      title: "Twitter",
      color: "bg-gradient-to-r from-[#1DA1F2] to-[#FFFFFF]",
    },
    {
      title: "Youtube",
      color: "bg-gradient-to-r from-[#ff0000] to-[#282828]",
    },
  ];

  return (
    <div
      className={`${
        !isPublic
          ? "hidden md:flex justify-center items-center w-full lg:w-[40%] md:border-l border-[#e0e2d9]"
          : "w-full h-screen overflow-y-auto flex justify-center items-center pb-2 scrollbar-thumb-sky-700 scrollbar-track-transparent scrollbar-thin"
      }`}
    >
      <div
        className={`${
          !isPublic
            ? "relative border h-[85vh] w-96 flex flex-col items-center overflow-y-auto rounded-3xl shadow-2xl scrollbar-thumb-sky-700 scrollbar-track-transparent scrollbar-thin"
            : " flex flex-col items-center w-full lg:w-[35%] h-screen"
        }`}
      >
        {loadingPreview && (
          <FaSpinner className=" animate-spin absolute left-5 top-3" />
        )}
        <div className={`w-full  `}>
          <div className="flex flex-col items-center pt-14">
            <Image
              src={!isPublic ? data?.image : userData?.image}
              alt="profile"
              width={90}
              height={90}
              className="rounded-full "
            />
            <p className=" font-extrabold font-Merienda my-2 text-base">
              @{!isPublic ? data?.username : userData?.username}
            </p>
            <span className=" text-xs text-center w-64 mb-5">
              {!isPublic ? data?.bio : userData?.bio}
            </span>
          </div>
          <div className=" flex flex-col space-y-3 w-full px-10 mb-2">
            {links
              ?.filter((link) => link.active)
              ?.slice()
              .reverse()
              .map((link, idx) => (
                <Link
                  href={link.link.startsWith("https") ? link.link : ""}
                  target={link.link.startsWith("https") ? "_blank" : ""}
                  key={idx}
                  className=" w-full"
                >
                  <Button key={idx} className={` w-full ${link.variant} `}>
                    {link.title}
                  </Button>
                </Link>
              ))}
          </div>
        </div>
        {/* <div className="mt-auto w-full px-10">
          {pathname === "/dashboard" ? (
            <div className="text-center bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 px-5 text-sm font-semibold py-2 rounded-full flex items-center space-x-2 sticky bottom-0">
              <span>ConnectifyMe</span>
              <FcBrokenLink size={25} className="flex-shrink-0" />
            </div>
          ) : (
            <Link
              href={pathname === "/dashboard" ? "#" : "/"}
              target="_blank"
              className="text-center bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 px-5 text-sm font-semibold py-2 rounded-full flex items-center space-x-2 sticky bottom-0"
            >
              <span>Join {userData.username} on ConnectifyMe</span>
              <FcBrokenLink size={25} className="flex-shrink-0" />
            </Link>
          )}
        </div> */}
        <div className=" mt-auto ">
          {pathname === "/dashboard" ? (
            <div className="font-Poppins  dark:text-neutral-900  px-5 text-sm font-semibold py-2 rounded-full flex items-center space-x-2 sticky bottom-0 mb-1 mt-5">
              <span>ConnectifyMe</span>
              <FcBrokenLink size={25} className=" flex-shrink-0" />
            </div>
          ) : (
            <Link
              href={pathname === "/dashboard" ? "#" : "/"}
              target="_blank"
              className="font-Poppins bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 px-5 text-sm font-semibold py-2 rounded-full flex items-center space-x-2 sticky bottom-0 mt-10 mb-3"
            >
              <span>Join {userData.username} on ConnectifyMe</span>
              <FcBrokenLink size={25} className=" flex-shrink-0" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
