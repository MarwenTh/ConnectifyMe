"use client";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type Props = {
  currentUser: any;
};

const Profile: FC<Props> = ({ currentUser }) => {
  const [letterCount, setLetterCount] = useState<number | null>(
    currentUser?.bio.length
  );
  const [error, setError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>(currentUser?.username);
  const [bio, setBio] = useState<string>(currentUser?.bio);

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
            className="bg-white resize-none"
            rows={3}
            maxLength={80}
            value={bio}
            onChange={(e) => {
              const inputText = e.target.value;

              setBio(inputText);
              setLetterCount(inputText.length);

              if (inputText.length >= 81) {
                setError(
                  "Bio cannot exceed 80 characters. You can't type more."
                );
              } else {
                setError("");
              }
            }}
          />
          <div className=" flex justify-between flex-row-reverse">
            <p
              className={`text-xs ${letterCount! >= 80 ? "text-blue-600" : ""}`}
            >
              {letterCount} / 80
            </p>
            {error && <p className="text-blue-600 text-xs">{error}</p>}
          </div>
          <p className=" text-xs h-fit text-right cursor-pointer w-fit bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent rounded-full py-3 font-bold">
            Enhance your bio with AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
