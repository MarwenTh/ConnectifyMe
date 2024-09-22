"use client";
import Dashboard from "@/components/dashboard/Dashboard";
import ProfilePreview from "@/components/ProfilePreview";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";

type Props = {};

const page = (props: Props) => {
  const [linksArray, setLinksArray] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const [shouldFetch, setShouldFetch] = useState<boolean>(true);
  const [loadingPreview, setLoadingPreview] = useState<boolean>(false);

  // console.log(linksArray);

  const fetchData = async () => {
    try {
      setLoading(true);
      // setLoadingPreview(true);
      const response = await axios.get("/api/page");
      if (response.status === 200) {
        const data = response.data;
        // setLinks(data.links);
        setData(data);
        setLinksArray(data.links);
        setShouldFetch(false);
        // console.log("Links fetched successfully", data.links);
      }
      // else {
      //   setLinks([]);
      // }
    } catch (error) {
      console.error("Error fetching links:", error);
    } finally {
      setLoading(false);
      // setLoadingPreview(false);
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchData();
    }
  }, [shouldFetch]);

  // if (loading) {
  //   return (
  //     <div className="h-screen grid place-items-center bg-[#eee]">
  //       <PropagateLoader speedMultiplier={1} color="#343434" />
  //     </div>
  //   );
  // }

  return (
    <div className="md:flex gap-0 w-full bg-[#f3f3f1]">
      <Dashboard
        // linksArray={linksArray}
        loading={loading}
        setLoading={setLoading}
        setShouldFetch={setShouldFetch}
        data={data}
      />
      <ProfilePreview links={linksArray} loading={loading} data={data} />
    </div>
  );
};

export default page;
