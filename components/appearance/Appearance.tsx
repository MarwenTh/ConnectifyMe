"use client";
import React, { FC } from "react";
import Profile from "./Profile";
import { FaCheck } from "react-icons/fa6";
import { Button } from "../ui/button";
import { FaTimes } from "react-icons/fa";
import Promo from "../Promo";
import Themes from "./Themes";
import Backgrounds from "./Backgrounds";
import Buttons from "./Buttons";

type Props = {
  data: any;
  setShouldFetch: (shouldFetch: boolean) => void;
};

const Appearance: FC<Props> = ({ data, setShouldFetch }) => {
  return (
    <div className="md:col-span-3 overflow-auto h-screen lg:w-[60%] scrollbar-thumb-slate-500 scrollbar-track-transparent scrollbar-thin scrollbar-corner-violet-800">
      <div className=" flex flex-col mx-20 space-y-5">
        <Profile data={data} setShouldFetch={setShouldFetch} />
        <Promo />
        <Themes setShouldFetch={setShouldFetch} data={data} />
        <h1 className="font-semibold font-Poppins text-lg">
          Custom appearance
        </h1>
        <p className=" font-medium">
          Completely customize your Linktree profile. Change your background
          with colors, gradients and images. Choose a button style, change the
          typeface and more.
        </p>
        <Backgrounds data={data} setShouldFetch={setShouldFetch} />
        <Buttons data={data} setShouldFetch={setShouldFetch} />

        <div></div>
      </div>
    </div>
  );
};

export default Appearance;
