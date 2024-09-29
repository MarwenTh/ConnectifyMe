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
      name: "Custom",
      style: "border-2 border-dashed border-gray-400 bg-white rounded-lg",
    },
    {
      name: "Billie Eilish",
      style: "bg-neutral-900 text-white rounded-lg",
    },
    {
      name: "Billie Eilish (Superfan)",
      style: "bg-cover bg-center bg-no-repeat rounded-lg text-white",
    },
    {
      name: "Pebble Blue",
      style: "bg-blue-100 text-neutral-800 rounded-lg",
    },
    {
      name: "Pebble Yellow",
      style: "bg-yellow-100 text-neutral-800 rounded-lg",
    },
    {
      name: "Pebble Pink",
      style: "bg-pink-100 text-neutral-800 rounded-lg",
    },
    {
      name: "Cloud Red",
      style: "bg-white border-red-300 border rounded-lg",
    },
    {
      name: "Cloud Green",
      style: "bg-white border-green-300 border rounded-lg",
    },
  ];

  const [selectedBg, setSelectedBg] = useState<string>("");

  // Set the initial state when data is available
  useEffect(() => {
    if (data?.background) {
      setSelectedBg(data.background);
    }
  }, [data]);

  const handleBgChange = async (bg: string) => {
    try {
      const response = await axios.put("/api/page", { background: bg });
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
    <div className="w-full overflow-auto">
      <p className="font-semibold font-Poppins">Themes</p>
      <div className="border border-red-500 p-6 rounded-3xl w-full shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {theme.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleBgChange(item.style)}
          >
            <div
              className={`${
                item.style
              } w-full h-96 text-center p-4 rounded-lg hover:border-2 transition duration-200 ease-in-out ${
                selectedBg === item.style
                  ? "border-2 border-blue-500" // Highlight selected theme
                  : "hover:border-gray-400 hover:skew-x-2"
              }`}
            ></div>
            <div className="my-2">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Themes;
