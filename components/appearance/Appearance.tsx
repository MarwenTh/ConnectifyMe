"use client";
import React, { FC } from "react";
import ProfilePreview from "../ProfilePreview";
import Profile from "./Profile";

type Props = {
  currentUser?: any;
  fetchDataAgain: boolean;
  setFetchDataAgain: (fetchDataAgain: boolean) => void;
};

const Appearance: FC<Props> = ({
  currentUser,
  fetchDataAgain,
  setFetchDataAgain,
}) => {
  return (
    <div className="md:col-span-3 overflow-auto h-screen lg:w-[60%] scrollbar-thumb-slate-500 scrollbar-track-transparent scrollbar-thin scrollbar-corner-violet-800">
      <div className=" flex flex-col justify-center items-center">
        <Profile
          currentUser={currentUser}
          fetchDataAgain={fetchDataAgain}
          setFetchDataAgain={setFetchDataAgain}
        />
      </div>
    </div>
  );
};

export default Appearance;
