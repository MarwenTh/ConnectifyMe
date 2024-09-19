"use client";
import Link from "next/link";
import React from "react";
import { FcBrokenLink } from "react-icons/fc";
import { Button } from "./ui/button";
import { IoMdLogIn } from "react-icons/io";
import { useSession } from "next-auth/react";
import Image from "next/image";

type Props = {};

const Navbar = (props: Props) => {
  const { data: session, status } = useSession();
  return (
    <header className="px-4 lg:px-32 h-14 flex items-center justify-between w-full">
      <Link href="/" className="flex items-center justify-center gap-x-2">
        <FcBrokenLink size={35} />
        <span className="sr-only md:not-sr-only font-semibold capitalize ">
          ConnectifyMe
        </span>
      </Link>
      {/* <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          href="#features"
          className="text-sm font-medium hover:underline underline-offset-4 text-black"
        >
          Features
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4 text-black"
        >
          Pricing
        </Link>
        <Link
          href="#"
          className="text-sm font-medium hover:underline underline-offset-4 text-black"
        >
          About
        </Link>
      </nav> */}
      <div className="flex gap-x-4 ">
        {session ? (
          <Link href="/admin/dashboard" className="text-sm font-medium">
            <Image
              src={session?.user?.image as string}
              alt="user profile"
              width={40}
              height={40}
              className="rounded-full border-2 border-gray-200"
            />
          </Link>
        ) : (
          <Link href="/sign-in">
            <Button>
              <IoMdLogIn className="mr-2 h-5 w-5" /> Get Started Now
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
