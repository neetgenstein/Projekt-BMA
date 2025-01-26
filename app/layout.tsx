import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";
import { Toast } from "@radix-ui/react-toast";

export const metadata: Metadata = {
  title: "Projekt BMA",
  description: "Software Development Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-ivory"
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
