import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/sign-in", // Redirect to this page if the user is not authenticated
  },
});

export const config = {
  matcher: ["/dashboard/:path*"], // Protect the /dashboard route and all its subpaths
};
