"use client";
import React, { FC } from "react";
import { Button } from "../ui/button";
import { Card, CardTitle } from "../ui/card";

type Props = {
  setShouldFetch: (shouldFetch: boolean) => void;
};

const Themes: FC<Props> = ({ setShouldFetch }) => {
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
      // You would dynamically apply a background image here in your actual code
      // Example: "background-image: url('/path/to/image.jpg')"
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

  return (
    <div className=" w-full overflow-auto">
      <p className=" font-semibold font-Poppins">Themes</p>
      <div className=" border border-red-500 p-6 rounded-3xl w-full shadow-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {theme.map((item, index) => (
          <Card key={index} className={`${item.style} h-20`}>
            <CardTitle>{item.name}</CardTitle>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Themes;
