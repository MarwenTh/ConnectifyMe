"use client";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import axios from "axios";

type Props = {
  currentUser: any;
  data: any;
  shouldFetch: boolean;
  setShouldFetch: (shouldFetch: boolean) => void;
  loading: boolean;
};

const Profile: FC<Props> = ({
  currentUser,
  data,
  shouldFetch,
  setShouldFetch,
  loading,
}) => {
  const [letterCount, setLetterCount] = useState<number | null>(0);
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const handleBioEnhancement = async () => {
    try {
      const response = await axios.post("/api/enhance-bio", { bio });

      if (response.status === 200) {
        setBio(response.data.enhancedBio);
        setLetterCount(response.data.enhancedBio.length);
      }
    } catch (error) {
      console.error("Error enhancing bio:", error);
    }
  };

  console.log("data", data.bio);
  useEffect(() => {
    if (data && data.bio) {
      setBio(data?.bio);
      setLetterCount(data?.bio?.length);
    }
    if (currentUser && currentUser.username) {
      setUsername(currentUser.username);
    }
  }, [data, currentUser]);

  return (
    <div className=" w-[65%] overflow-auto">
      <p className=" font-semibold font-Poppins mb-4 mt-12">Profile</p>
      <div className=" border border-red-500 p-6 rounded-3xl w-full shadow-lg">
        <div className=" flex flex-row justify-center items-center space-x-8 w-full ">
          <Image
            src={currentUser?.image as string}
            width={90}
            height={90}
            alt="Avatar"
            className="rounded-full"
          />
          <div className=" flex flex-col w-full space-y-2 ">
            <input
              placeholder="Profile Image"
              type="file"
              className=" hidden"
              id="profileImage"
              name="profileImage"
            />
            <Label
              htmlFor="profileImage"
              className=" rounded-full text-center bg-blue-800 hover:bg-blue-700 py-3 text-white font-bold cursor-pointer transition duration-200"
            >
              Pick an image
            </Label>
            <Button className=" bg-transparent hover:bg-[#dfdfdc] text-black rounded-full py-5 font-bold">
              Remove Image
            </Button>
          </div>
        </div>
        <div className=" flex flex-col space-y-3 w-full">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Textarea
            placeholder="Bio"
            className={`bg-white resize-none ${
              letterCount! >= 80 ? "text-blue-600" : ""
            } ${
              letterCount! > 80
                ? "border-red-500 focus-visible:ring-red-500 animate-shake"
                : ""
            }`}
            rows={3}
            maxLength={80}
            value={bio}
            onChange={(e) => {
              const inputText = e.target.value;

              setBio(inputText);
              setLetterCount(inputText.length);
            }}
          />
          <div className=" flex justify-between items-center flex-row-reverse">
            <p
              className={`text-xs ${letterCount! >= 80 ? "text-blue-600" : ""}`}
            >
              {letterCount} / 80
            </p>
            <div
              onClick={handleBioEnhancement}
              className=" text-xs h-fit text-right cursor-pointer w-fit bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent rounded-full font-bold"
            >
              Enhance your bio with AI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
