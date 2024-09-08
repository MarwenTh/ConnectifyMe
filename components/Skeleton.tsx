"use client";
import React from "react";

type Props = {
  count?: number;
};

const Skeleton: React.FC<Props> = ({ count }) => {
  return (
    <div className="w-full mb-10 md:mb-0">
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl h-32 shadow-lg py-6 px-3 my-3 md:my-6 overflow-hidden"
        >
          <div className="h-full flex items-center space-x-6">
            <div className="w-6 h-6 rounded-full bg-gray-200 animate-pulse" />
            <div className="w-full space-y-3">
              <div className="flex justify-between items-center">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
                </div>
                <div className="w-10 h-6 bg-gray-200 rounded-full animate-pulse" />
              </div>
              <div className="flex justify-between items-center pt-3">
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
