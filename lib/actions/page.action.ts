import { getServerSession } from "next-auth";
import connectToDatabase from "../database";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "../database/models/user.model";
import { Types } from "mongoose";
import { Page } from "../database/models/page.model";

interface Page {
  uri: string;
  owner: Types.ObjectId;
  displayName: string;
  profileImage: string;
  bio: string;
  bgType: string;
  bgColor: string;
  bgImage: string;
  links: {
    title: string;
    url: string;
    active: boolean;
  }[];
}

export const savePage = async (page: Page) => {
  await connectToDatabase();
  const session = await getServerSession(authOptions);
  console.log("Session:", session);

  try {
    const user = await User.findOne({ email: (session as any)?.user?.email });

    if (!user) {
      throw new Error("User not found");
    }

    const newPage = new Page({
      ...page,
      uri: user.username,
      owner: user._id,
      //   active: page.links.map((link) => link.active),
    });

    await newPage.save();
    await user.updateOne({ page: newPage._id });
    return newPage;
  } catch (error) {
    console.error("Error saving profile:", error);
  }
};

// get page data based on the user
export const getPageData = async (username: string) => {
  await connectToDatabase();

  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found");
    }

    const page = await Page.findOne({ owner: user._id });
    return page;
  } catch (error) {
    console.error("Error fetching page data:", error);
  }
};
