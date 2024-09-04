"use client";
import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { IoMdAdd } from "react-icons/io";
import { RiDraggable } from "react-icons/ri";
import { Switch } from "../ui/switch";
import { MdModeEdit } from "react-icons/md";
import { PiTrashThin } from "react-icons/pi";
import { SiSimpleanalytics } from "react-icons/si";

type Props = {};

const AddLinks = (props: Props) => {
  return (
    <div className=" flex justify-center w-full mt-10">
      <div className=" w-[60%]">
        <Button className=" w-full rounded-full py-5 bg-blue-800 hover:bg-blue-700 flex space-x-1">
          <IoMdAdd className=" text-white text-xl" />
          <span className=" font-semibold">Add Link</span>
        </Button>
        {/* <Input placeholder="Enter Link" className=" w-full" /> */}
        <div className="bg-white rounded-2xl h-fit shadow-lg py-6 px-3 my-6">
          <div className=" h-full flex items-center justify-between">
            <div className=" w-full flex items-center space-x-6">
              <RiDraggable size={25} className=" cursor-grab " />
              <div className=" w-full">
                <div className=" flex justify-between items-center">
                  <div>
                    <div className=" font-bold flex space-x-2 items-center">
                      <span>instagram</span>
                      <MdModeEdit size={17} />
                    </div>
                    <div className=" flex space-x-2 items-center">
                      <span className=" text-neutral-600">
                        https://www.instagram.com/marwen_ftw/
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
      </div>
    </div>
  );
};

export default AddLinks;
