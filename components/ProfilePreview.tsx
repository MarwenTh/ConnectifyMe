"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { FC } from "react";
import { Button } from "./ui/button";
import { FcBrokenLink } from "react-icons/fc";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  currentUser: any;
};

const ProfilePreview: FC<Props> = ({ currentUser }) => {
  const user = currentUser;
  const pathname = usePathname();
  return (
    <div className=" border h-[85vh] w-96 flex flex-col items-center justify-between rounded-3xl shadow-2xl pt-14 pb-8">
      <div className=" w-full ">
        <div className="flex flex-col items-center">
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
          <Button className=" w-full bg-gradient-to-r from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
            Instgaram
          </Button>
          <Button className=" w-full bg-gradient-to-r from-[#3b5998] to-[#FFFFFF]">
            Facebook
          </Button>
          <Button className=" w-full bg-gradient-to-r from-[#1DA1F2] to-[#FFFFFF]">
            Twitter
          </Button>

          <Button className=" w-full bg-gradient-to-r from-[#ff0000] to-[#282828]">
            Youtube
          </Button>
        </div>
      </div>
      <div>
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
