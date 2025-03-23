import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksandSans = Quicksand({
    variable: "--font-quicksand-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Devfolio Dumoulin Philippe",
  description: "Devfolio with NextJS created by Dumoulin Philippe",
};

interface LayoutProps {
    children: React.ReactNode;
    demo_reels: React.ReactNode;
    projects: React.ReactNode;
}

export default function RootLayout({
   children,
}: LayoutProps) {

    return (
    <html lang="en">
      <body className={`${quicksandSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
