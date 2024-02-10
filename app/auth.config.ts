import { NextAuthConfig } from 'next-auth';
import { getUserByEmail, getUserStatusByEmail, updateUserLastLogin } from '../schema/db';
// import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { signOut } from './auth';

export const authConfig = {
  // adapter: DrizzleAdapter(db),
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
      // if (!auth?.user?.email) return false;
      let status = await getUserStatusByEmail(auth?.user?.email || '');

      let isOnDashboard = nextUrl.pathname.startsWith('/admin');
      if (isOnDashboard) {
        if (isLoggedIn) {
          await updateUserLastLogin(auth?.user?.email!);
          if (status === 'blocked') {
            return false;
          } else if (status === 'active') {
            return true;
          };
          return false;
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        await updateUserLastLogin(auth?.user?.email!);
        if (status == 'blocked') return false;
        return Response.redirect(new URL('/admin', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
