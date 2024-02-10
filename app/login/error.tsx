'use client';

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

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
          <h3 className="text-2xl font-semibold">There is a problem with connection.!</h3>
          <p className="text-md ">It can be due to wrong password, blocked account or deleted account.</p>
          <Button onClick={() => reset()}>Try again</Button>
        </div></div>
    </div>
  );
}