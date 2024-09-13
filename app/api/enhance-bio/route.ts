import { getUserData } from "@/lib/actions/getUser";
import Page from "@/lib/database/models/page.model";
import User from "@/lib/database/models/user.model";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY; // Store the API key in environment variables
const genAI = new GoogleGenerativeAI(apiKey as string);

// Function to enhance bio
export async function POST(request: Request) {
  const currentUser = await getUserData();
  if (request.method === "POST") {
    const { bio } = await request.json();

    if (!bio) {
      return NextResponse.json({ error: "Bio is required" }, { status: 400 });
    }

    try {
      // Initialize the model with the specific generative model you want to use
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Call the model to generate content based on the prompt
      const result = await model.generateContent(
        `Enhance the following bio into a single, concise sentence suitable for a user profile.
         The enhanced bio must not exceed 80 characters and just give the result don't suggest any things to add or remove. here is the bio: ${bio}`
      );

      // Extract the enhanced content from the result
      const enhancedBio = await result.response.text();

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
