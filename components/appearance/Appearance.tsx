"use client";
import React, { FC } from "react";
import Profile from "./Profile";
import { FaCheck } from "react-icons/fa6";
import { Button } from "../ui/button";
import { FaTimes } from "react-icons/fa";

type Props = {
  currentUser?: any;
  data: any;
  setShouldFetch: (shouldFetch: boolean) => void;
  setLoadingPreview?: (loadingPreview: boolean) => void;
};

const Appearance: FC<Props> = ({
  currentUser,
  data,
  setShouldFetch,

  setLoadingPreview,
}) => {
  return (
    <div className="md:col-span-3 overflow-auto h-screen lg:w-[60%] scrollbar-thumb-slate-500 scrollbar-track-transparent scrollbar-thin scrollbar-corner-violet-800">
      <div className=" flex flex-col justify-center items-center">
        <Profile
          currentUser={currentUser}
          data={data}
          setShouldFetch={setShouldFetch}
          setLoadingPreview={setLoadingPreview}
        />
        {/* <div className="bg-[#d1f537] p-6 rounded-xl max-w-4xl mx-auto flex flex-col md:flex-row items-center">
          <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
            <FaTimes size={24} />
            <span className="sr-only">Close</span>
          </button>
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">
              Get unlimited customization
            </h2>
            <p className="mb-4">
              Transform your Linktree with a Pro 30-day free trial. Cancel
              anytime.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <FaCheck className="text-green-600 mr-2" />
                <span>
                  Showcase your brand with custom background images and videos
                </span>
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-600 mr-2" />
                <span>Pick your perfect font, theme and buttons</span>
              </li>
              <li className="flex items-center">
                <FaCheck className="text-green-600 mr-2" />
                <span>Remove the Linktree logo</span>
              </li>
            </ul>
            <Button className="bg-[#285430] text-white hover:bg-[#1e3f23]">
              Try Pro for free
            </Button>
            <p className="text-sm mt-2">$9/month after</p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-64 h-96">
              <div className="absolute top-0 left-0 w-40 h-64 bg-pink-300 rounded-xl transform -rotate-12"></div>
              <div className="absolute top-0 left-12 w-40 h-64 bg-yellow-200 rounded-xl transform rotate-3"></div>
              <div className="absolute top-0 left-24 w-40 h-64 bg-blue-300 rounded-xl transform rotate-12"></div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Appearance;
