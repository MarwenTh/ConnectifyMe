"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IoMdAdd } from "react-icons/io";
import { RiDraggable } from "react-icons/ri";
import { Switch } from "../ui/switch";
import { MdModeEdit } from "react-icons/md";
import { PiTrashThin } from "react-icons/pi";
import { SiSimpleanalytics } from "react-icons/si";
import { AnimatePresence, motion } from "framer-motion";
import { FaXmark } from "react-icons/fa6";

type Props = {};

const AddLinks = (props: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [link, setLink] = useState("");
  const [links, setLinks] = useState([
    {
      id: 1,
      title: "Instagram",
      link: "https://www.instagram.com/marwen_ftw/",
      active: true,
    },
    {
      id: 2,
      title: "Twitter",
      link: "https://www.twitter.com/marwen_ftw/",
      active: false,
    },
    {
      id: 3,
      title: "Facebook",
      link: "https://www.facebook.com/marwen_ftw/",
      active: true,
    },
  ]);
  return (
    <div className=" flex justify-center w-full mt-10">
      <div className=" w-[60%]">
        <Button
          className=" w-full rounded-full py-5 bg-blue-800 hover:bg-blue-700 flex space-x-1"
          onClick={() => setModalOpen(true)}
        >
          <IoMdAdd className=" text-white text-xl" />
          <span className=" font-semibold">Add Link</span>
        </Button>
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: modalOpen ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              exit={{ scale: 0 }}
              className="bg-white rounded-2xl w-full p-4"
            >
              <FaXmark
                className=" flex justify-end cursor-pointer hover:bg-neutral-600/20 rounded-full h-10 w-10 p-3 transition duration-200 mb-3"
                onClick={() => setModalOpen(false)}
              />
              <div className=" w-full ">
                <div className=" flex items-center">
                  <Input
                    placeholder="Enter Link"
                    onChange={(e) => setLink(e.target.value)}
                  />
                  <Button
                    className="  rounded-full py-5 bg-blue-800 hover:bg-blue-700"
                    onClick={() => {
                      setLinks([
                        ...links,
                        {
                          id: links.length + 1,
                          title: "Title",
                          link: link,
                          active: true,
                        },
                      ]);
                      setModalOpen(false);
                    }}
                  >
                    <span className=" font-semibold">Add Link</span>
                  </Button>
                </div>
              </div>
              <hr />
            </motion.div>
          )}
        </AnimatePresence>
        {/* <Input placeholder="Enter Link" className=" w-full" /> */}
        {links.map((link, idx) => (
          <div
            className={`bg-white rounded-2xl h-fit shadow-lg py-6 px-3 my-6  ${
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
                        <span>{link.title ? link.title : "Title"}</span>
                        <MdModeEdit size={17} />
                      </div>
                      <div className=" flex space-x-2 items-center">
                        <span className=" text-neutral-600">
                          {link.link ? link.link : "URL"}
                        </span>
                        <MdModeEdit size={17} />
                      </div>
                    </div>
                    <Switch id="airplane-mode" className=" text-green-500" />
                  </div>
                  <div className=" flex flex-row justify-between pt-3 pr-2">
                    <SiSimpleanalytics size={15} className=" cursor-pointer" />
                    <PiTrashThin size={20} className=" cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddLinks;
