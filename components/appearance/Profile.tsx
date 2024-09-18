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
  setShouldFetch: (shouldFetch: boolean) => void;
  setLoadingPreview?: (loadingPreview: boolean) => void;
};

const Profile: FC<Props> = ({
  currentUser,
  data,
  setShouldFetch,
  setLoadingPreview,
}) => {
  const [letterCount, setLetterCount] = useState<number | null>(0);
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleBioEnhancement = async () => {
    setError(null);
    setLoadingPreview!(true);
    setLoading(true);
    try {
      const response = await axios.post("/api/enhance-bio", { bio });

      if (response.status === 200) {
        setBio(response.data.enhancedBio);
        setLetterCount(response.data.enhancedBio.length);
        setShouldFetch(true);
      }
    } catch (error: any) {
      // console.error("Error enhancing bio:", error);
      setError(error.response.data.error);
    } finally {
      setLoadingPreview!(false);
      setLoading(false);
    }
  };

  // console.log("data", data.bio);
  useEffect(() => {
    if (data && data.bio) {
      setBio(data?.bio);
      setLetterCount(data?.bio?.length);
      setUsername(data?.username);
    }
  }, [data, currentUser]);

  return (
    <div className=" w-[65%] overflow-auto">
      <p className=" font-semibold font-Poppins mb-4 mt-12">Profile</p>
      <div className=" border border-red-500 p-6 rounded-3xl w-full shadow-lg">
        <div className=" flex flex-row justify-center items-center space-x-8 w-full ">
          <Image
            src={data?.image as string}
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
        <div className=" flex flex-col space-y-3 w-full mt-6 ">
          <Label htmlFor="username" className=" font-semibold text-xs">
            Username
          </Label>
          <Input
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={async (e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === username) {
                return;
              }
              try {
                const response = await axios.put("/api/page", { username });

                if (response.status === 200) {
                  setShouldFetch(true); // Triggers a re-fetch if necessary
                }
              } catch (error: any) {
                console.error("Error updating username:", error);
              }
            }}
          />

          <Label htmlFor="bio" className=" font-semibold text-xs">
            bio
          </Label>
          <Textarea
            id="bio"
            placeholder="Bio"
            className={`bg-white resize-none ${
              letterCount! >= 80 ? "text-blue-600" : ""
            } ${
              letterCount! > 80 || error
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
            onBlur={async () => {
              try {
                const response = await axios.put("/api/page", { bio });

                if (response.status === 200) {
                  setShouldFetch(true); // Triggers a re-fetch if necessary
                }
              } catch (error: any) {
                console.error("Error updating bio:", error);
              }
            }}
          />
          <div className=" flex justify-between items-center flex-row-reverse">
            <p
              className={`text-xs ${letterCount! >= 80 ? "text-blue-600" : ""}`}
            >
              {letterCount} / 80
            </p>
            {error && <p className=" text-red-500 text-xs">{error}</p>}
            <div
              onClick={handleBioEnhancement}
              className=" text-xs h-fit text-right cursor-pointer w-fit bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent rounded-full font-bold"
            >
              {loading ? "Enhancing..." : "Enhance your bio with AI"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
