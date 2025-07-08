"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isLanding = pathname === "/";

  return (
    <nav className="bg-[#A7B8CC] flex items-center justify-between px-8 py-4">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={48} height={48} />
          <span className="font-semibold text-[#253047] text-lg font-serif">WisdomWaves</span>
        </Link>
      </div>

      {isLanding ? (
        <div className="flex items-center gap-8 text-[#253047] font-semibold text-lg font-serif">
          <Link href="/signup" className="hover:underline">Sign Up</Link>
          <Link href="#" className="hover:underline">Learn More</Link>
          <Link href="#" className="hover:underline">Contact Us</Link>
        </div>
      ) : (
        <div className="flex items-center gap-8 text-[#253047] font-semibold text-lg font-serif">
          <Link href="#" className="hover:underline">Learn More</Link>
          <Link href="#" className="hover:underline">Contact Us</Link>
          <div className="flex items-center gap-2">   
            <span className="text-lg">User</span>
          </div>
        </div>
      )}
    </nav>
  );
}
