import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/sign-in", // Redirect to this page if the user is not authenticated
  },
});

export const config = {
  matcher: ["/admin/:path*"], // Protect the /dashboard route and all its subpaths
};
