import { NextAuthConfig } from 'next-auth';
import { getUserStatusByEmail, updateUserLastLogin } from '../schema/db';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user;
      let isOnDashboard = nextUrl.pathname.split('/')[1] === 'admin';
      if (isOnDashboard) {
        if (isLoggedIn) {
          await updateUserLastLogin(auth?.user?.email!);
          return true;
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        await updateUserLastLogin(auth?.user?.email!);
        return Response.redirect(new URL('/admin', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
