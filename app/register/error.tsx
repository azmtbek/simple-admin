'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100  shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white  dark:bg-gray-900 px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-2xl font-semibold">This user email already exists try another!</h3>
          <Button onClick={() => reset()}>Try again</Button>
          <Link href='/login' className="font-semibold text-sm text-gray-800 dark:text-gray-400"> or Sign in</Link>
        </div></div>
    </div>
  );
}