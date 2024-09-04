"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { FcBrokenLink } from "react-icons/fc";

type Props = {};

const ProfilePreview = (props: Props) => {
  const { data: session } = useSession();
  return (
    <div className=" border h-[85vh] w-96 flex flex-col items-center justify-between rounded-3xl shadow-2xl pt-14 pb-8">
      <div className=" w-full ">
        <div className="flex flex-col items-center">
          <Image
            src={session?.user?.image || "/profile.png"}
            alt="profile"
            width={90}
            height={90}
            className="rounded-full "
          />
          <p className=" font-bold font-Merienda my-2 text-lg">
            @{session?.user?.name}
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
        <div className="bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 px-5 text-sm font-semibold py-2 rounded-full flex items-center space-x-2">
          <span>ConnectifyMe</span>
          <FcBrokenLink size={25} className=" flex-shrink-0" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePreview;
