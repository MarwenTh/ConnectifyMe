"use client";
import React, { FC } from "react";
import { MdModeEdit } from "react-icons/md";
import { RiDraggable } from "react-icons/ri";
import { Switch } from "../ui/switch";
import { SiSimpleanalytics } from "react-icons/si";
import { PiTrashThin } from "react-icons/pi";

type Props = {
  setLinks: (links: Array<any>) => void;
  links: Array<any>;
  modalOpen: boolean;
};

const GeneratedLinks: FC<Props> = ({ links, modalOpen, setLinks }) => {
  return (
    <div className=" w-full mb-10 md:mb-0">
      {links?.map((link: any, idx) => (
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
                      <span className="block w-fit overflow-hidden text-ellipsis whitespace-nowrap">
                        {link.title ? link.title : "Title"}
                      </span>
                      <MdModeEdit size={17} />
                    </div>
                    <div className=" flex space-x-2 items-center">
                      <span className=" text-neutral-600 w-40 md:w-full overflow-hidden text-ellipsis whitespace-nowrap">
                        {link.link ? link.link : "URL"}
                      </span>
                      <MdModeEdit size={17} />
                    </div>
                  </div>
                  <Switch id="airplane-mode" className=" text-green-500" />
                </div>
                <div className=" flex flex-row justify-between pt-3 pr-2">
                  <SiSimpleanalytics size={15} className=" cursor-pointer" />
                  <PiTrashThin
                    size={20}
                    className=" cursor-pointer"
                    onClick={() => {
                      const newLinks = links.filter((l) => l.id !== link.id);
                      setLinks(newLinks);
                    }}
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
