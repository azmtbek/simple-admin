import React from 'react';
import ThemeButton from './theme-button';
import Link from 'next/link';
import { auth, signIn, signOut } from 'app/auth';
import { Button } from '@/components/ui/button';

async function Header() {
  let session = await auth();
  let sessionButton = <></>;
  if (session?.user) {
    sessionButton = <>
      <Button variant="ghost">
        {session?.user?.name} -
        {session?.user?.email}
      </Button>
      <SignOut />
    </>;
  } else {
    sessionButton = <div>
      <SignIn />
    </div>;
  }

  return (
    <header className='sticky py-3 w-full border-b-2'>
      <div className='flex justify-between items-center container'>
        <ThemeButton />
        <div></div>
        <div className='flex gap-2'>
          {sessionButton}
        </div>
      </div>
    </header >
  );
}

export default Header;

function SignOut() {
  return (
    <Button>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </Button>
  );
}

function SignIn() {
  return (
    <Button>
      <form
        action={async () => {
          'use server';
          await signIn();
        }}
      >
        <button type="submit">Sign In</button>
      </form>
    </Button>
  );
}