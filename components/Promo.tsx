import React, { useState } from "react";
import { FaCheck, FaImage, FaLink, FaPalette } from "react-icons/fa6";
import { Button } from "./ui/button";

type Props = {};

const Promo = (props: Props) => {
  return (
    <div className="bg-[#d1f537] p-6 rounded-2xl w-full">
      <div className=" ">
        <h1 className=" text-center font-semibold font-Poppins text-2xl">
          Get unlimited customization
        </h1>
        <p className=" text-center text-sm font-Poppins">
          Get unlimited customization with our premium plan. Get access to all
          the features and customization options.
        </p>
        <div className=" flex flex-col"></div>
      </div>
    </div>
  );
};

export default Promo;
