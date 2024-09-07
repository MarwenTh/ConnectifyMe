"use client";
import React, { FC, useCallback, useEffect } from "react";
import { MdModeEdit } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";
import { Switch } from "../ui/switch";
import { SiSimpleanalytics } from "react-icons/si";
import { PiTrashThin } from "react-icons/pi";
import axios from "axios";
import { ILink } from "@/interfaces";

type Props = {
  currentUser: any;
  modalOpen: boolean;
  dataLinks: any;
};

const GeneratedLinks: FC<Props> = ({ currentUser, modalOpen, dataLinks }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [links, setLinks] = React.useState<ILink[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [active, setActive] = React.useState(links[0]?.active);

  const fetchLinksData = async () => {
    try {
      const response = await axios.get("/api/page");
      if (response.status === 200) {
        const data = response.data;
        setLinks(data.links);
        // console.log("Links fetched successfully", links);
      }
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };
  //
  //   useEffect(() => {
  //     fetchLinksData();
  //   }, []);

  const handleDeleteLink = async (linkId: string) => {
    try {
      const response = await axios.delete(`/api/page/${linkId}`);
      if (response.status === 200) {
        console.log("Link deleted successfully");
        // fetchLinksData(); // Refresh the links
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const handleActiveLink = async (linkId: string, active: boolean) => {
    try {
      const newActive = !active; // Get the toggled state
      setActive(newActive); // Update the local state
      const response = await axios.put(`/api/page/${linkId}`, { newActive });
      if (response.status === 200) {
        console.log("Link active status updated successfully");
      }
    } catch (error) {
      console.error("Error updating link active status:", error);
    }
  };

  return (
    <div className=" w-full mb-10 md:mb-0">
      {dataLinks
        ?.slice()
        .reverse()
        .map((link: any, idx: number) => (
          <div
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
                          // contentEditable={true}
                        >
                          {link.title ? link.title : "Title"}
                        </span>
                        <MdModeEdit size={17} />
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
                      className=" text-green-500"
                      checked={link.active}
                      onClick={() => {
                        handleActiveLink(link._id, active);
                      }}
                    />
                  </div>
                  <div className=" flex flex-row justify-between pt-3 pr-2">
                    <SiSimpleanalytics size={15} className=" cursor-pointer" />
                    <PiTrashThin
                      size={20}
                      className=" cursor-pointer"
                      onClick={() => handleDeleteLink(link._id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default GeneratedLinks;
