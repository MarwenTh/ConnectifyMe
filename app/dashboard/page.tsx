import { SidebarMenu } from "@/components/Sidebar";
import { getLinksData } from "@/lib/actions/getLinksData";
import { getUserData } from "@/lib/actions/getUser";
import axios from "axios";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const currentUser = await getUserData();
  const dataLinks = await getLinksData();

  // console.log(currentUser);
  return (
    <div>
      <SidebarMenu currentUser={currentUser} dataLinks={dataLinks} />
    </div>
  );
};

export default page;
