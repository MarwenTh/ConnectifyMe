"use client";
import React, { useState } from "react";

import SocialLinks from "./SocialLinks";
import GeneratedLinks from "./GeneratedLinks";

type Props = {};

const AddLinks = (props: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
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
        <SocialLinks
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          links={links}
          setLinks={setLinks}
        />
        <GeneratedLinks links={links} modalOpen={modalOpen} />
      </div>
    </div>
  );
};

export default AddLinks;
