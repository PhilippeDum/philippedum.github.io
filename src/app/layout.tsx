import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./style.css";
import "./background.css";

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
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
      </head>
      <body className={`${quicksandSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
