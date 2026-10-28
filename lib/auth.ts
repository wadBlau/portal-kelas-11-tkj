import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { Role } from "@/types";
import { getAuthSecret } from "@/lib/auth-secret";

export const authOptions: NextAuthOptions = {
  secret: getAuthSecret(),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        // Stub auth: any valid email passes. Role assigned by email pattern.
        const email = credentials.email.toLowerCase();
        let role: Role = "siswa";
        if (
          email.includes("@wali") ||
          email.includes("@kelas11tj1.sch.id") &&
            email.startsWith("wali")
        ) {
          role = "wali_kelas";
        }
        return { id: "stub", name: email.split("@")[0], email, role };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      return token;
    },
    async session({ session, token }) {
      (session.user as any).role = token.role as Role;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
