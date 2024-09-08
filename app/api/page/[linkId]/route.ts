import { NextResponse } from "next/server";
import { getUserData } from "@/lib/actions/getUser";
import Page from "@/lib/database/models/page.model";

export async function DELETE(
  request: Request,
  { params }: { params: { linkId: string } }
) {
  try {
    const currentUser = await getUserData();
    if (!currentUser) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const linkId = params.linkId;

    // Find the user's page and remove the link
    const page = await Page.findOneAndUpdate(
      { owner: currentUser.id },
      { $pull: { links: { _id: linkId } } },
      { new: true }
    );

    if (!page) {
      return NextResponse.json(
        { error: "Page not found or link not deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Link deleted successfully" });
  } catch (error) {
    console.error("Error deleting link:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// update link active status true and false
export async function PUT(
  request: Request,
  { params }: { params: { linkId: string } }
) {
  try {
    const currentUser = await getUserData();
    if (!currentUser) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const linkId = params.linkId;
    const { active } = await request.json(); // Get the new active status from the request body

    // Find the user's page and update the link active status
    const page = await Page.findOneAndUpdate(
      { owner: currentUser.id, "links._id": linkId },
      { $set: { "links.$.active": active } },
      { new: true }
    );

    if (!page) {
      return NextResponse.json(
        { error: "Page not found or link not updated" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Link active status updated successfully",
      active,
    });
  } catch (error) {
    console.error("Error updating link active status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { linkId: string } }
) {}
