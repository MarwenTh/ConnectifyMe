"use client";
import React, { FC, useState } from "react";

import SocialLinks from "./SocialLinks";

type Props = {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
  links: Array<any>;
  setLinks: (value: any) => void;
};

const AddLinks: FC<Props> = ({ modalOpen, setModalOpen, links, setLinks }) => {
  return (
    <div className=" flex justify-center w-full mt-10">
      <div className=" w-full">
        <SocialLinks
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          links={links}
          setLinks={setLinks}
        />
      </div>
    </div>
  );
};

export default AddLinks;
