import { getUserData } from "@/lib/actions/getUser";
import Page from "@/lib/database/models/page.model";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY; // Store the API key in environment variables
const genAI = new GoogleGenerativeAI(apiKey as string);

// Function to enhance bio
export async function POST(request: Request) {
  const currentUser = await getUserData();
  const { bio } = await request.json();

  // Check if bio is empty or not provided
  if (!bio) {
    return NextResponse.json(
      { error: "Please provide you bio" },
      { status: 400 }
    );
  }

  if (bio.length > 80) {
    return NextResponse.json(
      { error: "Bio must not exceed 80 characters" },
      { status: 400 }
    );
  }

  if (request.method === "POST") {
    try {
      // Initialize the model with the specific generative model you want to use
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Call the model to generate content based on the prompt
      const result = await model.generateContent(
        `Enhance the following bio into a single, concise sentence suitable for a user profile.
         The enhanced bio must not exceed 80 characters and just give the result don't suggest any things to add or remove and don't use the word AI in the response. here is the bio: ${bio}`
      );

      // Extract the enhanced content from the result
      const enhancedBio = await result.response.text();

      if (!enhancedBio) {
        return NextResponse.json(
          { error: "Failed to enhance bio" },
          { status: 500 }
        );
      }

      // Update the user's bio with the enhanced content
      const newBio = await Page.updateOne(
        { owner: currentUser?.id },
        { bio: enhancedBio }
      );

      // Send the enhanced bio back to the frontend
      return NextResponse.json({ enhancedBio });
    } catch (error) {
      console.error("Error enhancing bio:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }
}
