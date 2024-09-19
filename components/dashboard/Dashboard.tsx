"use client";
import { ILink } from "@/interfaces";
import axios from "axios";
import React, { FC, useState } from "react";
import CopyLink from "./CopyLink";
import { AnimatePresence, motion } from "framer-motion";
import { ImSpinner10 } from "react-icons/im";
import { IoMdAdd } from "react-icons/io";
import { Button } from "../ui/button";
import { FaXmark } from "react-icons/fa6";
import { Input } from "../ui/input";
import { GoSearch } from "react-icons/go";
import Image from "next/image";
import GeneratedLinks from "./GeneratedLinks";
import ProfilePreview from "../ProfilePreview";

type Props = {
  data: any;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setShouldFetch: (fetch: boolean) => void;
};

const Dashboard: FC<Props> = ({
  data,
  loading,
  setLoading,
  setShouldFetch,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [link, setLink] = useState("");
  const [isLinkValid, setIsLinkValid] = useState(false);
  const [search, setSearch] = useState("");
  const socialIcons = [
    {
      name: "X",
      icon: "https://link-types-assets.production.linktr.ee/twitter/icon.svg",
    },
    {
      name: "facebook",
      icon: "https://link-types-assets.production.linktr.ee/facebook/icon.svg",
    },
    {
      name: "instagram",
      icon: "https://link-types-assets.production.linktr.ee/instagram/icon.svg",
    },
    {
      name: "tiktok",
      icon: "https://link-types-assets.production.linktr.ee/tiktok/icon.svg",
    },
    {
      name: "youtube",
      icon: "https://link-types-assets.production.linktr.ee/youtube/icon.svg",
    },
    {
      name: "twitch",
      icon: "https://link-types-assets.production.linktr.ee/twitch/icon.svg",
    },
  ];

  // function to check if the link is valid
  const isValidLink = (link: string) => {
    if (link === "" || !link.startsWith("http") || !link.startsWith("https")) {
      return false;
    } else {
      return true;
    }
  };

  const checkLink = (link: string) => {
    if (isValidLink(link)) {
      setIsLinkValid(false);
    } else {
      setIsLinkValid(true);
    }
  };

  const filteredIcons = socialIcons.filter((icon) =>
    icon.name.toLowerCase().includes(search.toLowerCase())
  );

  const addLinkData = async (newLink: ILink) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/page", newLink);

      if (response.status === 200) {
        console.log("Link added successfully");
        setLink(""); // Clear the link input
        setModalOpen(false); // Close the modal
        refreshLinks(); // Refresh the links
      }
    } catch (error) {
      console.error("Error adding link:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshLinks = () => {
    setShouldFetch(true);
  };

  // console.log("data", data);

  return (
    <div className="md:col-span-3 overflow-auto h-screen lg:w-[60%] scrollbar-thumb-slate-500 scrollbar-track-transparent scrollbar-thin scrollbar-corner-violet-800">
      <CopyLink data={data} />
      <div className=" flex items-center flex-col w-full px-2 md:px-5">
        <div className=" flex justify-center w-full mt-10">
          <div className=" w-full">
            <div>
              <AnimatePresence mode="wait">
                {!modalOpen ? (
                  <motion.div
                    key="modal"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    // transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Button
                      className=" w-full rounded-full py-5 bg-blue-800 hover:bg-blue-700 flex space-x-1"
                      onClick={() => {
                        setLink("");
                        setModalOpen(true);
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <ImSpinner10 size={20} className=" animate-spin" />
                      ) : (
                        <>
                          <IoMdAdd className=" text-white text-xl" />
                          <span className=" font-semibold">Add Link</span>
                        </>
                      )}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="button"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="bg-white rounded-2xl w-full p-4"
                  >
                    <FaXmark
                      className=" flex justify-end cursor-pointer hover:bg-neutral-600/20 rounded-full h-10 w-10 p-3 transition duration-200 mb-3"
                      onClick={() => {
                        setLink("");
                        setModalOpen(false);
                      }}
                    />
                    <div className=" flex items-center space-x-5">
                      <Input
                        placeholder="Enter URL"
                        value={link}
                        onChange={(e) => {
                          setLink(e.target.value);
                          checkLink(e.target.value);
                        }}
                      />
                      <Button
                        className="  rounded-full py-5 bg-blue-800 hover:bg-blue-700"
                        disabled={isLinkValid}
                        onClick={() =>
                          addLinkData({
                            title: "Link",
                            link,
                            active: true,
                          })
                        }
                      >
                        <span className=" font-semibold">Add</span>
                      </Button>
                    </div>
                    <hr className=" my-8" />
                    <div className=" my-6  mr-3 ">
                      {!searchOpen ? (
                        <div className=" flex justify-between items-center">
                          <span className=" text-sm font-bold">
                            Most used social
                          </span>
                          <GoSearch
                            className=" h-12 w-12 bg-white border rounded-full p-3 cursor-pointer hover:bg-[#f6f7f5]"
                            onClick={() => setSearchOpen(true)}
                          />
                        </div>
                      ) : (
                        <Input
                          placeholder="Search"
                          className=" w-full"
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
                        />
                      )}
                    </div>
                    <div className="w-full overflow-x-auto scrollbar-thumb-slate-500 scrollbar-track-transparent scrollbar-thin scrollbar-corner-violet-800">
                      <div className={`flex flex-row space-x-4 `}>
                        {filteredIcons.map((icon, idx) => (
                          <div
                            key={idx}
                            className="flex items-center flex-col space-y-2 min-w-max"
                          >
                            <div
                              className="rounded-3xl grid place-items-center py-5 px-5 bg-[#f3f3f1] cursor-pointer hover:bg-[#d5d6d4] transition duration-200"
                              onClick={() => {
                                addLinkData({
                                  title: icon.name,
                                  link: "",
                                  active: true,
                                });
                                setModalOpen(false);
                              }}
                            >
                              <Image
                                src={icon.icon}
                                width={40}
                                height={40}
                                alt={icon.name}
                              />
                            </div>
                            <span className="font-semibold text-xs capitalize">
                              {icon.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        <GeneratedLinks
          modalOpen={modalOpen}
          refreshLinks={refreshLinks}
          data={data}
        />
      </div>
    </div>
  );
};

export default Dashboard;
