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

    const newLink: any = await request.json(); // Parse the request body

    const page = await Page.findOne({ owner: currentUser.id });

    await Page.findByIdAndUpdate(
      page._id,
      {
        $push: {
          links: newLink,
        },
      },
      { new: true }
    );

    //     // Find if the user already has a page
    //     let page = await Page.findOne({ owner: currentUser.id });
    //
    //     if (!page) {
    //       // If the user doesn't have a page, create one with the new link and associate it with the user
    //       page = await Page.create({ links: [newLink], owner: currentUser.id });
    //       await User.findByIdAndUpdate(
    //         currentUser.id,
    //         { page: page.id },
    //         { new: true }
    //       );
    //     } else {
    //       // If the user has a page, update it by adding the new link
    //       page = await Page.findByIdAndUpdate(
    //         page._id,
    //         {
    //           $push: {
    //             links: newLink,
    //           },
    //         },
    //         { new: true }
    //       );
    //     }

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
      const newPage = await Page.create({
        owner: currentUser.id,
        username: currentUser.username,
        image: currentUser.image
          ? currentUser.image
          : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
      });
      // return NextResponse.json(newPage);
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

export async function PUT(request: Request) {
  try {
    const currentUser = await getUserData();
    if (!currentUser) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const { username, bio, textFont, background, variant } =
      await request.json();

    let page = await Page.findOne({ owner: currentUser.id });
    let updateData: {
      bio?: string;
      username?: string;
      background?: string;
      textFont?: string;
      "links.$[].variant"?: string;
    } = {};

    if (username) {
      const existingPage = await Page.findOne({
        username,
        _id: { $ne: page._id },
      });
      if (existingPage) {
        return NextResponse.json(
          { error: "Username is already taken by another user." },
          { status: 409 }
        );
      }
      updateData.username = username;
    }

    if (bio) updateData.bio = bio;
    if (background) updateData.background = background;
    if (textFont) updateData.textFont = textFont;

    if (variant) {
      updateData["links.$[].variant"] = variant;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    page = await Page.findByIdAndUpdate(
      page._id,
      { $set: updateData },
      { new: true }
    );

    return NextResponse.json(page);
  } catch (error) {
    console.error("Error updating page:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
