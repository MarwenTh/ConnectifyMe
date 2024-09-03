"use client";
import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { BottomGradient } from "../ui/BottomGradient";
import Link from "next/link";

type Props = {};

const Login = (props: Props) => {
  return (
    <div className=" grid place-items-center min-h-screen bg-blue-600/50">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 bg-white backdrop-blur-sm shadow-black dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to ConnectifyMe
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Login to ConnectifyMe to start connecting with your fans.
        </p>

        <div className="flex flex-col space-y-4 my-8">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <FaGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <FaGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
        <div>
          <Link href="/" className=" flex justify-end">
            <span className="text-sm text-black dark:text-neutral-300">
              Back to home
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
