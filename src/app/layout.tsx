import type { Metadata } from "next";

import { Lora } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Newspeeper",
  description: "Less time, More News",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${lora.className} antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
