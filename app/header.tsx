import React from 'react';
import ThemeButton from './theme-button';
import { auth, signIn, signOut } from 'app/auth';
import { Button } from '@/components/ui/button';

async function Header() {
  let session = await auth();
  let sessionButton = <></>;

  if (session?.user) {
    sessionButton = <>
      <Button variant="ghost">
        <span className='pr-4'>Hello {session?.user?.name}! </span>
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
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <Button type="submit" variant="outline">
        Sign out
      </Button>
    </form>
  );
}

function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn();
      }}
    >
      <Button type="submit" variant="outline">
        Sign In
      </Button>
    </form>
  );
}