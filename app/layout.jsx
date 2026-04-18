import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SessionWrapper from "./Components/SessionWrapper";
import { Open_Sans } from "next/font/google";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

import { Nanum_Gothic } from "next/font/google";

const nanum = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

export const metadata = {
  title: "Bolster - Fund and support your work.",
  description: "This is a web application for crowdfunding platform for creators.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${nanum.className} h-full antialiased`}
    >
      <body className="relative min-h-screen flex flex-col">

        <SessionWrapper>

          {/* background taken from bg.ibelick.com */}
          <div className="absolute inset-0 -z-10 min-h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]" />
          </div>

          <Navbar />
          
          <main className="flex-1">
            {children}
          </main>

          <Footer />

        </SessionWrapper>

      </body>
    </html>
  );
}
