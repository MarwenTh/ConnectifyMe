"use client";
import ProfilePreview from "@/components/ProfilePreview";
import { ILink } from "@/interfaces";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";

type Props = {
  params: { username: string };
};

const UserPage: FC<Props> = ({ params }) => {
  const [userData, setUserData] = useState(null);
  const username = params.username;
  const [links, setLinks] = useState<ILink[]>([]);

  const getUserData = async () => {
    try {
      const response = await axios.get(`/api/user?username=${username}`);
      if (response.status === 200) {
        // console.log("User data fetched successfully", response.data);
        setUserData(response.data.user);
        setLinks(response.data.page.links);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getUserData();
  }, [username]);

  return (
    <div>
      {userData ? (
        <ProfilePreview links={links} userData={userData} isPublic={true} />
      ) : (
        <div className="h-screen grid place-items-center bg-[#eee]">
          <PropagateLoader speedMultiplier={1} color="#343434" />
        </div>
      )}
    </div>
  );
};

export default UserPage;
