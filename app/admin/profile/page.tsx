"use client";
import Appearance from "@/components/appearance/Appearance";
import ProfilePreview from "@/components/ProfilePreview";
import { ILink } from "@/interfaces";
import axios from "axios";
import React, { useEffect, useState } from "react";

type Props = {};

const page = (props: Props) => {
  const [linksArray, setLinksArray] = useState<ILink[]>([]);
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

  return (
    <div className="md:flex gap-0 w-full bg-[#f3f3f1]">
      <Appearance data={data} setShouldFetch={setShouldFetch} />
      <ProfilePreview links={linksArray} loading={loading} data={data} />
    </div>
  );
};

export default page;
