// import type {
//   GetServerSidePropsContext,
//   NextApiRequest,
//   NextApiResponse,
// } from "next";
// import type { NextAuthOptions } from "next-auth";
// import { getServerSession } from "next-auth";
// import connectToDatabase from "../database";
// import User from "../database/models/user.model";
//
// // You'll need to import and pass this
// // to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
// export const config = {
//   providers: [], // rest of your config
// } satisfies NextAuthOptions;
//
// // Use it in server contexts
// export function auth(
//   ...args:
//     | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
//     | [NextApiRequest, NextApiResponse]
//     | []
// ) {
//   return getServerSession(...args, config);
// }
// // Function to get user data from the database
// export async function getUserData() {
//   try {
//     await connectToDatabase();
//     const session = await auth();
//     const user = await User.findOne({ email: session?.user?.email });
//     if (!user) {
//       return null;
//     }
//     return {
//       id: user._id.toString(),
//       email: user.email,
//       username: user.username,
//       fullName: user.fullName,
//       image: user.image,
//       role: user.role,
//       page: user.page,
//       // Add any other fields you want to return
//     };
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//     throw error;
//   }
// }

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import { Session } from "next-auth";
import User from "../database/models/user.model";
import connectToDatabase from "../database";

export async function getSession(): Promise<Session | null> {
  return await getServerSession(authOptions);
}

export async function getUserData() {
  try {
    await connectToDatabase();
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await User.findOne({ email: session.user.email });

    if (!currentUser) {
      return null;
    }

    return {
      id: currentUser._id.toString(),
      email: currentUser.email,
      username: currentUser.username,
      fullName: currentUser.fullName,
      image: currentUser.image,
      role: currentUser.role,
      page: currentUser.page?._id?.toString(),
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}
