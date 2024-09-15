"use client";
import React, { FC } from "react";
import Profile from "./Profile";

type Props = {
  currentUser?: any;
  data: any;
  shouldFetch: boolean;
  setShouldFetch: (shouldFetch: boolean) => void;
  loading: boolean;
  loadingPreview: boolean;
};

const Appearance: FC<Props> = ({
  currentUser,
  data,
  shouldFetch,
  setShouldFetch,
  loading,
  loadingPreview,
}) => {
  if (loadingPreview) {
    return <div>Loading...</div>;
  }
  return (
    <div className="md:col-span-3 overflow-auto h-screen lg:w-[60%] scrollbar-thumb-slate-500 scrollbar-track-transparent scrollbar-thin scrollbar-corner-violet-800">
      <div className=" flex flex-col justify-center items-center">
        <Profile
          currentUser={currentUser}
          data={data}
          shouldFetch={shouldFetch}
          setShouldFetch={setShouldFetch}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Appearance;
