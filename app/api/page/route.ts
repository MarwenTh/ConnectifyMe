import { NextResponse } from "next/server";
import { getUserData } from "@/lib/actions/getUser";
import { Page } from "@/lib/database/models/page.model";
import connectToDatabase from "@/lib/database";

export async function POST(request: Request) {
  try {
    // await connectToDatabase(); // Ensure database connection is established

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

    const page = await Page.create({ links });

    return NextResponse.json(page);
  } catch (error) {
    console.error("Error creating page:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
