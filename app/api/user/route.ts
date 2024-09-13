import Page from "@/lib/database/models/page.model";
import User from "@/lib/database/models/user.model";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Extract the username from the query params
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Find the user by username
    const user = await User.findOne({ username: username });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const page = await Page.findOne({ owner: user._id });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    // console.log(user.bio);

    // return user email, username, full name, bio, image, and page links
    return NextResponse.json({
      user: {
        email: user.email,
        username: user.username,
        image: user.image,
      },
      page: {
        bio: page.bio,
        links: page.links,
      },
    });
  } catch (error) {
    console.error("Error fetching user page:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
