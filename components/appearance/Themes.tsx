"use client";
import React from "react";
import { Button } from "../ui/button";
import axios from "axios";

type Props = {};

const Themes = (props: Props) => {
  return (
    <div className=" text-start">
      <Button
        className="w-full"
        onClick={async () => {
          try {
            const response = await axios.put("/api/page", {
              background: "bg-red-500",
            });

            if (response.status === 200) {
            }
          } catch (error: any) {
            console.error("Error updating bio:", error);
          }
        }}
      >
        theme
      </Button>
    </div>
  );
};

export default Themes;
