import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import connectDB from "@/lib/connection";
import User from "@/database/models/userModel";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Username or Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        if (!credentials || !credentials.identifier || !credentials.password) {
          throw new Error("Missing credentials");
        }
        
        // Connect to the database
        await connectDB();

        try {
          const user = await User.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          if (!user) {
            throw new Error("Invalid username or password");
          }

          if (!user.password) {
            throw new Error("User password not set");
          }

          const isMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isMatch) {
            throw new Error("Invalid username or password");
          }

          return user;
        } catch (error: any) {
          console.error("Authorization error:", error);
          throw new Error("Authentication failed, please try again.");
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
      }
      return token;
    },
  },

  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
  
  
};
