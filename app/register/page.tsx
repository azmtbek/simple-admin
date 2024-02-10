import Link from 'next/link';
import { Form } from 'app/form';
import { redirect } from 'next/navigation';
import { createUser, getUserByEmail } from '@/schema/db';
import { SubmitButton } from 'app/submit-button';

export default function Login() {
  async function register(formData: FormData) {
    'use server';
    let email = formData.get('email') as string;
    let password = formData.get('password') as string;
    let name = formData.get('name') as string;
    let user = await getUserByEmail(email);

    if (user.length > 0) {
      throw new Error("user already exists");
    } else {
      await createUser(email, password, name);
      redirect('/login');
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50  dark:bg-gray-900">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white  dark:bg-gray-900 px-4 py-6 pt-8 text-center sm:px-16">

          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm text-gray-500">
            Create an account with your email and password
          </p>

        </div>
        <Form action={register} type="register">
          <SubmitButton>Sign Up</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {'Already have an account? '}
            <Link href="/login" className="font-semibold text-gray-800">
              Sign in
            </Link>
            {' instead.'}
          </p>
        </Form>
      </div>
    </div >
  );
}
