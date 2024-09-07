import { NextResponse } from "next/server";
import { getUserData } from "@/lib/actions/getUser";
import Page from "@/lib/database/models/page.model";
import User from "@/lib/database/models/user.model";

export async function POST(request: Request) {
  try {
    const currentUser = await getUserData();
    if (!currentUser) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const body = await request.json(); // Parse the request body
    const { links } = body; // Extract links from the body

    if (!links || !Array.isArray(links)) {
      return NextResponse.json(
        { error: "Invalid links data" },
        { status: 400 }
      );
    }

    // Find if the user already has a page
    let page = await Page.findOne({ owner: currentUser.id });

    if (!page) {
      // If the user doesn't have a page, create one and associate it with the user
      page = await Page.create({ links, owner: currentUser.id });
      await User.findByIdAndUpdate(
        currentUser.id,
        { page: page.id },
        { new: true }
      );
    } else {
      // If the user has a page, update it by adding new links
      page = await Page.findByIdAndUpdate(
        page._id,
        { $push: { links: { $each: links } } },
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
