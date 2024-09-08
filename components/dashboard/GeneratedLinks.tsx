"use client";
import React, { FC, useEffect, useState } from "react";
import { MdModeEdit } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";
import { Switch } from "../ui/switch";
import { SiSimpleanalytics } from "react-icons/si";
import { PiTrashThin } from "react-icons/pi";
import axios from "axios";
import { ILink } from "@/interfaces";
import Skeleton from "../Skeleton";
import { FcLink } from "react-icons/fc";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  currentUser: any;
  modalOpen: boolean;
  setShouldFetch: (shouldFetch: boolean) => void;
  shouldFetch: boolean;
  refreshLinks: () => void;
};

const GeneratedLinks: FC<Props> = ({
  currentUser,
  modalOpen,
  setShouldFetch,
  shouldFetch,
  refreshLinks,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [links, setLinks] = useState<ILink[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [link, setLink] = useState<string | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const fetchLinksData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/page");
      if (response.status === 200) {
        const data = response.data;
        setLinks(data.links);
        setShouldFetch(false);
      }
    } catch (error) {
      console.error("Error fetching links:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (shouldFetch) {
      fetchLinksData();
    }
  }, [shouldFetch]);

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

  const handleActiveLink = async (linkId: string, currentActive: boolean) => {
    try {
      const newActive = !currentActive;
      const response = await axios.put(`/api/page/${linkId}`, {
        active: newActive,
      });
      if (response.status === 200) {
        console.log("Link active status updated successfully");
        // Update the local state to reflect the change
        setLinks((prevLinks) =>
          prevLinks.map((link) =>
            link._id === linkId ? { ...link, active: newActive } : link
          )
        );
      }
    } catch (error) {
      console.error("Error updating link active status:", error);
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
        {links.length === 0 ? (
          <div
            className={`flex justify-center w-full flex-col items-center my-6 ${
              modalOpen ? "blur-sm" : ""
            }`}
          >
            <div>
              <FcLink size={150} className=" text-red-500 h-fit opacity-50" />
            </div>
            <div className=" w-52">
              <p className=" text-center text-sm font-bold font-Poppins opacity-50">
                Show the world who you are. Add a link to get started.
              </p>
            </div>
          </div>
        ) : (
          links
            ?.slice()
            .reverse()
            .map((link: any, idx: number) => {
              const isEdit = editIndex === idx;

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
                            <div className=" font-bold flex space-x-2 items-center">
                              <span
                                className="block w-fit overflow-hidden  whitespace-nowrap text-black text-sm max-w-[15rem] outline-none"
                                contentEditable={isEdit}
                                onBlur={(
                                  e: React.FocusEvent<HTMLDivElement>
                                ) => {
                                  const newTitle = e.target.innerText;
                                  if (newTitle && newTitle !== link.title) {
                                    setTitle(newTitle);
                                  } else {
                                    e.target.innerText = link.title;
                                  }
                                }}
                                // onFocus={(e) => e.target.innerText}
                              >
                                {link.title ? link.title : "Title"}
                              </span>
                              <MdModeEdit
                                size={17}
                                onClick={() =>
                                  setEditIndex(isEdit ? null : idx)
                                }
                                className=" cursor-pointer"
                              />
                            </div>
                            <div className=" flex space-x-2 items-center">
                              <span
                                className=" text-neutral-600 w-40 md:w-full overflow-hidden max-w-md text-ellipsis whitespace-nowrap outline-none"
                                // contentEditable={true}
                              >
                                {link.link ? link.link : "URL"}
                              </span>
                              <MdModeEdit size={17} />
                            </div>
                          </div>
                          <Switch
                            id={link._id}
                            className="data-[state=checked]:bg-green-600"
                            checked={link.active}
                            onClick={() =>
                              handleActiveLink(link._id, link.active)
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
