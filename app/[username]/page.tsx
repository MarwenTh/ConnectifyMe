"use client";
import ProfilePreview from "@/components/ProfilePreview";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";

type Props = {
  params: { username: string };
};

const UserPage: FC<Props> = ({ params }) => {
  const [userData, setUserData] = useState(null);
  const username = params.username;
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getUserData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/user?username=${username}`);
      if (response.status === 200) {
        setUserData(response.data.page);
        setLinks(response.data.page.links);
        setError(null); // Reset error if data is successfully fetched
      } else {
        setError("User not found");
      }
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      setError("User not found or an error occurred.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, [username]);

  // Conditional rendering
  if (loading) {
    return (
      <div className="h-screen grid place-items-center bg-[#eee]">
        <PropagateLoader speedMultiplier={1} color="#343434" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen grid place-items-center bg-[#eee]">
        <h1 className="text-2xl text-[#343434]">{error}</h1>
      </div>
    );
  }

  return (
    <div>
      {userData && (
        <ProfilePreview links={links} userData={userData} isPublic={true} />
      )}
    </div>
  );
};

export default UserPage;
