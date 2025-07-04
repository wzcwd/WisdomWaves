import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        <div className="bg-[#F9F7F1] min-h-screen flex flex-col">
        {/* Navbar */}
          <nav className="bg-[#A7B8CC] flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.svg" alt="WisdomWaves Logo" width={48} height={48} />
                <span className="font-semibold text-[#253047] text-lg font-serif">WisdomWaves</span>
              </Link>
            </div>
            <div className="flex items-center gap-8 text-[#253047] font-semibold text-lg font-serif">
              <Link href="/signup" className="hover:underline">Sign up</Link>
              <Link href="#" className="hover:underline">Learn More</Link>
              <Link href="#" className="hover:underline">Contact Us</Link>
            </div>
          </nav>
        {/* Main content */}
        {children}
        </div>
      </body>
    </html>
  );
}
