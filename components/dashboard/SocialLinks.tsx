"use client";
import React, { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IoMdAdd } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { Input } from "../ui/input";
import Image from "next/image";
import { motion } from "framer-motion";
import { GoSearch } from "react-icons/go";

type Props = {
  modalOpen: boolean;
  setModalOpen: (modalOpen: boolean) => void;
  links: Array<any>;
  setLinks: (links: Array<any>) => void;
};

const SocialLinks: FC<Props> = ({
  modalOpen,
  setModalOpen,
  links,
  setLinks,
}) => {
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

  return (
    <div>
      {!modalOpen ? (
        <Button
          className=" w-full rounded-full py-5 bg-blue-800 hover:bg-blue-700 flex space-x-1"
          onClick={() => {
            setLink("");
            setModalOpen(true);
          }}
        >
          <IoMdAdd className=" text-white text-xl" />
          <span className=" font-semibold">Add Link</span>
        </Button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
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
              onChange={(e) => {
                setLink(e.target.value);
                checkLink(e.target.value);
              }}
            />
            <Button
              className="  rounded-full py-5 bg-blue-800 hover:bg-blue-700"
              disabled={isLinkValid}
              onClick={() => {
                setModalOpen(false);
                // savePageData();
              }}
            >
              <span className=" font-semibold">Add Link</span>
            </Button>
          </div>
          <hr className=" my-8" />
          <div className=" my-6  mr-3 ">
            {!searchOpen ? (
              <div className=" flex justify-between items-center">
                <span className=" text-sm font-bold">Most used social</span>
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
          <div className="w-full overflow-x-auto scrollbar-thumb-slate-500 scrollbar-track-transparent scrollbar-thin scrollbar-corner-violet-800 cursor-pointer">
            <div className={`flex flex-row space-x-4 `}>
              {filteredIcons.map((icon, idx) => (
                <div
                  key={idx}
                  className="flex items-center flex-col space-y-2 min-w-max"
                >
                  <div
                    className="rounded-3xl grid place-items-center py-6 px-6 bg-[#f3f3f1] cursor-pointer"
                    onClick={() => {
                      setLinks([
                        ...links,
                        {
                          title: icon.name,
                          link: "URL",
                          active: true,
                        },
                      ]);
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
    </div>
  );
};

export default SocialLinks;
