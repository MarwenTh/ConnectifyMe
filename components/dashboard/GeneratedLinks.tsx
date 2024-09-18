"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";
import { Switch } from "../ui/switch";
import { SiSimpleanalytics } from "react-icons/si";
import { PiTrashThin } from "react-icons/pi";
import axios from "axios";
import { ILink } from "@/interfaces";
import { FcLink } from "react-icons/fc";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  modalOpen: boolean;
  refreshLinks: () => void;
  linksArray: ILink[];
};

const GeneratedLinks: FC<Props> = ({ modalOpen, refreshLinks, linksArray }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [link, setLink] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [editTitleIndex, setEditTitleIndex] = useState<number | null>(null);
  const [editLinkIndex, setEditLinkIndex] = useState<number | null>(null);

  // Call this function whenever you need to refresh the data

  const handleDeleteLink = async (linkId: string) => {
    try {
      const response = await axios.delete(`/api/page/${linkId}`);
      if (response.status === 200) {
        console.log("Link deleted successfully");
        // fetchLinksData(); // Refresh the links
        refreshLinks(); // Refresh the links
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const handleUpdateLink = async (
    linkId: string,
    title: string,
    url: string,
    active: boolean
  ) => {
    try {
      const response = await axios.put(`/api/page/${linkId}`, {
        title,
        link: url,
        active,
      });
      if (response.status === 200) {
        console.log("Link updated successfully");
        // Update the local state to reflect the change
        refreshLinks(); // Refresh the links
      }
    } catch (error) {
      console.error("Error updating link:", error);
    }
  };

  // if (loading) {
  //   return <Skeleton count={3} />;
  // }

  return (
    <motion.div
      initial={{ opacity: 0, zoom: 0.5 }}
      animate={{ opacity: 1, zoom: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ opacity: 0, zoom: 0.5 }}
      className=" w-full mb-10 md:mb-0"
    >
      <AnimatePresence>
        {linksArray?.length === 0 ? (
          <div
            className={`flex justify-center w-full flex-col items-center my-6 animate-pulse ${
              modalOpen ? "blur-sm" : ""
            }`}
          >
            <div>
              <FcLink size={150} className=" text-red-500 h-fit opacity-70" />
            </div>
            <div className=" w-52">
              <p className=" text-center text-sm font-bold font-Poppins opacity-70">
                Show the world who you are. Add a link to get started.
              </p>
            </div>
          </div>
        ) : (
          linksArray
            ?.slice()
            ?.reverse()
            ?.map((link: any, idx: number) => {
              const isEditTitle = editTitleIndex === idx;
              const isEditLink = editLinkIndex === idx;

              return (
                <motion.div
                  initial={{ opacity: 0, zoom: 0.5 }}
                  animate={{ opacity: 1, zoom: 1 }}
                  transition={{ duration: 0.2 }}
                  exit={{ opacity: 0, zoom: 0.5 }}
                  key={idx}
                  className={`bg-white rounded-2xl h-fit shadow-lg py-6 px-3 my-3 md:my-6  ${
                    modalOpen ? "blur-sm" : ""
                  }`}
                >
                  <div className=" h-full flex items-center justify-between">
                    <div className=" w-full flex items-center space-x-6">
                      <RiDraggable size={25} className=" cursor-grab " />
                      <div className=" w-full">
                        <div className=" flex justify-between items-center">
                          <div>
                            <div className="font-bold flex space-x-2 items-center">
                              <span
                                className={`block w-fit overflow-hidden whitespace-nowrap text-black text-sm max-w-[15rem] outline-none select-none ${
                                  isEditTitle ? "cursor-text" : "cursor-pointer"
                                }`}
                                onClick={() => setEditTitleIndex(idx)}
                                contentEditable={isEditTitle}
                                suppressContentEditableWarning={true}
                                onBlur={(
                                  e: React.FocusEvent<HTMLDivElement>
                                ) => {
                                  const newTitle = e.target.innerText;
                                  if (newTitle && newTitle !== link.title) {
                                    setTitle(newTitle);
                                    handleUpdateLink(
                                      link._id,
                                      newTitle,
                                      link.link,
                                      link.active
                                    );
                                  } else {
                                    e.target.innerText = link.title;
                                  }
                                  setEditTitleIndex(null);
                                }}
                              >
                                {link.title ? link.title : "Title"}
                              </span>
                              <MdModeEdit
                                size={17}
                                onClick={() =>
                                  setEditTitleIndex(isEditLink ? null : idx)
                                }
                                className="cursor-pointer"
                              />
                            </div>

                            <div className=" flex space-x-2 items-center">
                              <span
                                className={`text-neutral-600 w-40 md:w-full scrollbar-none overflow-auto max-w-md  whitespace-nowrap outline-none select-none ${
                                  isEditLink
                                    ? "cursor-text "
                                    : "cursor-pointer text-ellipsis"
                                } `}
                                contentEditable={isEditLink}
                                suppressContentEditableWarning={true}
                                onClick={() => {
                                  setEditLinkIndex(idx);
                                }}
                                onBlur={(
                                  e: React.FocusEvent<HTMLDivElement>
                                ) => {
                                  const newLink = e.target.innerText;
                                  //check if the link is valid and not just a random url that does not work

                                  if (newLink && newLink !== link.link) {
                                    setLink(newLink);
                                    handleUpdateLink(
                                      link._id,
                                      link.title,
                                      newLink,
                                      link.active
                                    );
                                  } else {
                                    e.target.innerText = link.link;
                                  }
                                  setEditLinkIndex(null);
                                }}
                              >
                                {link.link ? link.link : "URL"}
                              </span>
                              <MdModeEdit
                                size={17}
                                onClick={() =>
                                  setEditLinkIndex(isEditLink ? null : idx)
                                }
                                className="cursor-pointer"
                              />
                            </div>
                          </div>
                          <Switch
                            id={link._id}
                            className="data-[state=checked]:bg-green-600"
                            checked={link.active}
                            onClick={
                              () =>
                                handleUpdateLink(
                                  link._id,
                                  link.title,
                                  link.link,
                                  !link.active
                                ) // Toggle active state
                            }
                          />
                        </div>
                        <div className=" flex flex-row justify-between pt-3 pr-2">
                          <SiSimpleanalytics
                            size={15}
                            className=" cursor-pointer"
                          />
                          <PiTrashThin
                            className=" cursor-pointer hover:text-red-500 hover:bg-gray-200 p-1 h-7 w-7 rounded-full transition duration-200"
                            onClick={() => handleDeleteLink(link._id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GeneratedLinks;
