import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "@/lib/mysql";
import { RowDataPacket } from "mysql2/promise";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        // ✅ Check user in DB
        const [rows] = await pool.query<RowDataPacket[]>(
          "SELECT * FROM users WHERE username = ? AND password = ? LIMIT 1",
          [credentials.username, credentials.password]
        );

        const user = rows[0];
        if (!user) return null;

        // ✅ Return object becomes session.user
        return {
          id: String(user.id),   // ✅ store as string (safe for BIGINT)
          name: user.username,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = String(user.id); // ✅ always string
        token.role = (user as any).role;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;   // ✅ string
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
