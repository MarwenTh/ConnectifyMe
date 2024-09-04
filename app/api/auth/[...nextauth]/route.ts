import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { Account, User as AuthUser } from "next-auth";
import connectToDatabase from "@/lib/database";
import User from "@/lib/database/models/user.model";

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        await connectToDatabase();

        try {
          const existingUser = await User.findOne({ email: user.email });

          if (existingUser) {
            await User.updateOne(
              { email: user.email },
              {
                $set: {
                  fullName: user.name,
                  image: user.image,
                },
              }
            );
          } else {
            await User.create({
              email: user.email,
              username: user.email?.split("@")[0],
              fullName: user.name,
              image: user.image,
            });

            return true;
          }
        } catch (error) {
          console.error("Error saving user", error);
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
