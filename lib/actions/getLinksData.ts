import { NextResponse } from "next/server";
import { getUserData } from "./getUser";
import Page from "../database/models/page.model";

export async function getLinksData() {
  try {
    const currentUser = await getUserData();
    if (!currentUser) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const page = await Page.findOne({ owner: currentUser.id });

    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return {
      id: page._id.toString(),
      links: page.links,
    };
  } catch (error) {
    console.error("Error fetching links:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
