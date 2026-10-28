import { withAuth } from "next-auth/middleware";
import { getAuthSecret } from "@/lib/auth-secret";

export default withAuth({
  secret: getAuthSecret(),
  pages: {
    signIn: "/auth/signin",
  },
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
