"use client";
import React, { FC } from "react";
import Profile from "./Profile";

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
      </div>
    </div>
  );
};

export default Appearance;
