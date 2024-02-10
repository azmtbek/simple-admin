import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Simple Admin",
  description: "Simple Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="p-4">
        {children}
      </div>
    </>
  );
}
