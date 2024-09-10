"use client";

import Image from "next/image";
import React, { FC } from "react";
import { Button } from "./ui/button";
import { FcBrokenLink } from "react-icons/fc";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ILink } from "@/interfaces";
import { FaSpinner } from "react-icons/fa6";

type Props = {
  currentUser: any;
  links: Array<ILink>;
  loadingPreview: boolean;
};

const ProfilePreview: FC<Props> = ({ currentUser, links, loadingPreview }) => {
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
    <div className="relative border h-[85vh] w-96 flex flex-col items-center justify-between rounded-3xl shadow-2xl">
      {loadingPreview && (
        <FaSpinner className=" animate-spin absolute left-5 top-3" />
      )}
      <div className=" w-full overflow-y-auto scrollbar-thumb-sky-700 scrollbar-track-transparent scrollbar-thin">
        <div className="flex flex-col items-center pt-14">
          <Image
            src={user?.image as string}
            alt="profile"
            width={90}
            height={90}
            className="rounded-full "
          />
          <p className=" font-extrabold font-Merienda my-2 text-base">
            @{user?.username}
          </p>
          <span className=" text-xs text-center w-64 mb-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            tempora mol
          </span>
        </div>
        <div className=" flex flex-col space-y-3 w-full px-10">
          {links
            ?.slice()
            .reverse()
            .map((link, idx) => (
              <Link
                href={link.link.startsWith("https") ? link.link : ""}
                target={link.link.startsWith("https") ? "_blank" : ""}
                key={idx}
              >
                <Button
                  key={idx}
                  className={` w-full ${stylesVariant[idx]?.color}`}
                >
                  {link.title}
                </Button>
              </Link>
            ))}
        </div>
      </div>
      <div className=" my-2">
        {pathname === "/dashboard" ? (
          <div className="bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 px-5 text-sm font-semibold py-2 rounded-full flex items-center space-x-2">
            <span>ConnectifyMe</span>
            <FcBrokenLink size={25} className=" flex-shrink-0" />
          </div>
        ) : (
          <Link
            href={pathname === "/dashboard" ? "#" : "/"}
            className="bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 px-5 text-sm font-semibold py-2 rounded-full flex items-center space-x-2"
          >
            <span>ConnectifyMe</span>
            <FcBrokenLink size={25} className=" flex-shrink-0" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProfilePreview;
