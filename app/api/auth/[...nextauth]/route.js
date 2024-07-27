import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import User from '@models/User';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        console.log("Connecting to DB for session");
        await connectToDB();
        const sessionUser = await User.findOne({ email: session.user.email });
        if (sessionUser) {
          session.user.id = sessionUser._id.toString();
          console.log("Session user found:", sessionUser);
        } else {
          console.log("No session user found");
        }
        return session;
      } catch (error) {
        console.error("Session error:", error);
        return session;
      }
    },
    async signIn({ profile }) {
      try {
        console.log("Connecting to DB for signIn");
        await connectToDB();
        const userExist = await User.findOne({ email: profile.email });
        console.log("User exists:", userExist);

        if (!userExist) {
          const newUser = await User.create({
            email: profile.email,
            username: profile.name.replace(/\s/g, '').toLowerCase(),
            image: profile.picture,
          });
          console.log("New user created:", newUser);
        }
        return true;
      } catch (error) {
        console.error("SignIn error:", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
