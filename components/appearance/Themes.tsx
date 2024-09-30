"use client";
import React, { FC, useState, useEffect } from "react";
import axios from "axios";

type Props = {
  setShouldFetch: (shouldFetch: boolean) => void;
  data: any; // Assuming data has a 'background' field that contains the saved background style
};

const Themes: FC<Props> = ({ setShouldFetch, data }) => {
  const theme = [
    {
      name: "Dashed Border",
      style: "border-2 border-dashed border-gray-400 bg-white rounded-lg",
      buttonVariant:
        "py-2.5 px-6 border border-dashed border-gray-800 text-sm rounded-full bg-white text-black cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gray-100",
    },
    {
      name: "Black & White",
      style: "bg-neutral-900 text-white rounded-lg",
      buttonVariant:
        "bg-white text-black py-2.5 px-6 text-sm rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gray-100",
    },
    {
      name: "Pebble Blue",
      style: "bg-blue-100 text-neutral-800 rounded-lg",
      buttonVariant: "bg-blue-500 text-white hover:bg-blue-600",
    },
    {
      name: "Pebble Yellow",
      style: "bg-yellow-100 text-neutral-800 rounded-lg",
      buttonVariant: "bg-yellow-500 text-white hover:bg-yellow-600",
    },
    {
      name: "Pebble Pink",
      style: "bg-pink-100 text-neutral-800 rounded-lg",
      buttonVariant: "bg-pink-500 text-white hover:bg-pink-600",
    },
    {
      name: "Cloud Red",
      style: "bg-white border-red-300 border rounded-lg",
      buttonVariant:
        "py-2.5 px-6 text-sm bg-indigo-50 text-indigo-500 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-100",
    },
    {
      name: "Cloud Green",
      style: "bg-white border-green-300 border rounded-lg",
      buttonVariant:
        "bg-green-500 text-white py-2.5 px-6 text-sm rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-green-600",
    },
    {
      name: "Sunset Gradient",
      style:
        "bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white rounded-lg",
      buttonVariant:
        "bg-gradient-to-r from-orange-500 via-pink-600 to-purple-700 text-white py-2.5 px-6 text-sm rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-r from-orange-600 via-pink-700 to-purple-800",
    },
    {
      name: "Ocean Gradient",
      style:
        "bg-gradient-to-r from-blue-400 to-green-400 text-white rounded-lg",
      buttonVariant:
        "bg-gradient-to-r from-blue-500 to-green-500 text-white py-2.5 px-6 text-sm rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-r from-blue-600 to-green-600",
    },
    {
      name: "Cool Sky Gradient",
      style:
        "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-lg",
      buttonVariant:
        "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-2.5 px-6 text-sm rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700",
    },
    {
      name: "Video Game",
      style: "https://www.w3schools.com/html/mov_bbb.mp4",
      buttonVariant: "",
    },
    {
      name: "Space",
      style: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
      buttonVariant: "",
    },
  ];

  const [selectedBg, setSelectedBg] = useState<string>("");

  // Set the initial state when data is available
  useEffect(() => {
    if (data?.background) {
      setSelectedBg(data.background);
    }
  }, [data]);

  const handleBgChange = async (bg: string, buttonVariant: string) => {
    try {
      console.log(buttonVariant);
      const response = await axios.put("/api/page", {
        background: bg,
        variant: buttonVariant,
      });
      if (response.status === 200) {
        setSelectedBg(bg); // Update selected background
        setShouldFetch(true);
        console.log("Background changed successfully");
      }
    } catch (error) {
      console.error("Error changing background:", error);
    }
  };

  return (
    <div className="w-full overflow-auto p-4">
      <p className="font-semibold font-Poppins text-lg mb-4">Themes</p>
      <div className="border border-red-500 p-4 sm:p-6 rounded-3xl w-full shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {theme.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleBgChange(item.style, item.buttonVariant)}
          >
            {item.style.match(/(http(s?):)([/|.|\w|\s|-])*\.(?:mp4)/) ? (
              <video
                className={`w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg 
                  ${
                    selectedBg === item.style
                      ? "border-2 border-blue-500 shadow-lg"
                      : ""
                  }`}
                autoPlay
                loop
                muted
              >
                <source src={item.style} type="video/mp4" />
              </video>
            ) : (
              <div
                className={`${
                  item.style
                } w-full h-48 sm:h-64 md:h-80 lg:h-96 text-center p-4 rounded-lg hover:border-2 transition duration-200 ease-in-out ${
                  selectedBg === item.style
                    ? "border-2 border-blue-500 shadow-lg" // Highlight selected theme
                    : "hover:border-gray-400 hover:skew-x-2 "
                }`}
              ></div>
            )}
            <div className="my-2 text-sm sm:text-base">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Themes;
