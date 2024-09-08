import { SidebarMenu } from "@/components/Sidebar";
import { getUserData } from "@/lib/actions/getUser";
import axios from "axios";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const currentUser = await getUserData();

  // console.log(currentUser);
  return (
    <div>
      <SidebarMenu currentUser={currentUser} />
    </div>
  );
};

export default page;
