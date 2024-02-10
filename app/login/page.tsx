import Link from 'next/link';
import { Form } from 'app/form';
import { auth, signIn, signOut } from 'app/auth';
import { SubmitButton } from 'app/submit-button';
import { getUserStatusByEmail } from '@/schema/db';
import { Button } from '@/components/ui/button';


export default async function Login() {
  let session = await auth();
  let status = await getUserStatusByEmail(session?.user?.email || '');

  async function login(formData: FormData) {
    'use server';
    await signIn('credentials', {
      redirectTo: '/admin',
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100  shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white  dark:bg-gray-900 px-4 py-6 pt-8 text-center sm:px-16">
          {status === 'blocked' && <>
            <h3 className="text-xl font-semibold">You are Blocked</h3>
            <p className="text-sm text-gray-500">
              Sign out and register with another account please
            </p>
            <SignOut />
          </>}
          {status !== 'blocked' && <>
            <h3 className="text-xl font-semibold">Sign In</h3>
            <p className="text-sm text-gray-500">
              Use your email and password to sign in
            </p>
          </>}
        </div>
        <Form
          type="login"
          action={login}
        >
          <SubmitButton>Sign in</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <Link href="/register" className="font-semibold text-gray-800">
              Sign up
            </Link>
            {' for free.'}
          </p>
        </Form>
      </div>
    </div>
  );
}

function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut({ redirectTo: '/register' });
      }}
    >
      <Button type="submit">
        Sign out
      </Button>
    </form>
  );
}