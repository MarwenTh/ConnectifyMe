"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { FcBrokenLink } from "react-icons/fc";
import { Button } from "../ui/button";

type Props = {
  currentUser: any;
};

const CopyLink: FC<Props> = ({ currentUser }) => {
  const [isCopied, setIsCopied] = useState(false);
  // console.log(currentUser);
  const handleClick = () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/${currentUser?.username}`
    );
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 6000);
    }
  }, [isCopied]);
  return (
    <div className="bg-[#dfe8f9] flex flex-col md:justify-between justify-start items-start space-y-5 md:mx-8 md:my-5 rounded-2xl py-4 px-6">
      <div className=" flex items-center flex-col space-x-2">
        <div className=" flex items-center space-x-2">
          <FcBrokenLink className="text-2xl" />
          <p className=" font-medium md:text-sm text-xs ">
            Your ConnectifyMe is live:{" "}
          </p>
        </div>
        <Link
          target="_blank"
          className=" underline md:text-sm text-blue-900/80 text-xs"
          href={`http://localhost:3000/${currentUser?.username}`}
        >
          connectify.me/{currentUser?.username}
        </Link>
      </div>
      <div>
        <Button
          className={` bg-white rounded-full  font-bold hover:bg-[#eee]/60
            ${isCopied ? "text-green-500" : "text-black"}
            `}
          onClick={handleClick}
        >
          {isCopied ? (
            <span>Copied!</span>
          ) : (
            <span>Copy your ConnectifyMe URL</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CopyLink;