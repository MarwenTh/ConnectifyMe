import { NextResponse } from "next/server";
import { getUserData } from "@/lib/actions/getUser";
import Page from "@/lib/database/models/page.model";
import User from "@/lib/database/models/user.model";
import { ILink } from "@/interfaces/index";

export async function POST(request: Request) {
  try {
    const currentUser = await getUserData();
    if (!currentUser) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const newLink: ILink = await request.json(); // Parse the request body

    // if (
    //   !newLink ||
    //   typeof newLink !== "object" ||
    //   !newLink.title ||
    //   !newLink.link
    // ) {
    //   return NextResponse.json({ error: "Invalid link data" }, { status: 400 });
    // }

    // Find if the user already has a page
    let page = await Page.findOne({ owner: currentUser.id });

    if (!page) {
      // If the user doesn't have a page, create one with the new link and associate it with the user
      page = await Page.create({ links: [newLink], owner: currentUser.id });
      await User.findByIdAndUpdate(
        currentUser.id,
        { page: page.id },
        { new: true }
      );
    } else {
      // If the user has a page, update it by adding the new link
      page = await Page.findByIdAndUpdate(
        page._id,
        { $push: { links: newLink } },
        { new: true }
      );
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const currentUser = await getUserData();
    if (!currentUser) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const page = await Page.findOne({ owner: currentUser.id });

    // if there's no page for the user, create one
    if (!page) {
      const newPage = await Page.create({ owner: currentUser.id });
      await User.findByIdAndUpdate(
        currentUser.id,
        { page: newPage.id },
        { new: true }
      );
      return NextResponse.json(newPage);
    }

    return NextResponse.json(page);
  } catch (error) {
    console.error("Error fetching page:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
