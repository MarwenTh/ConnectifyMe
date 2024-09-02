"use client";
import Link from "next/link";
import React from "react";
import { FcBrokenLink } from "react-icons/fc";
import { Button } from "./ui/button";
import { IoMdLogIn } from "react-icons/io";

type Props = {};

const Navbar = (props: Props) => {
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
        <Link href="/">
          <Button>
            <IoMdLogIn className="mr-2 h-5 w-5" /> Get Started Now
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
