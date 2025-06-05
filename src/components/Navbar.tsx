"use client";

import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <nav
      className="sticky top-6 z-30 w-full mx-auto max-w-5xl rounded-2xl bg-white/40 shadow-lg backdrop-blur-2xl border border-white/30"
      style={{ marginTop: "1rem" }}
    >
      <div className="flex items-center justify-between p-6 lg:px-8">
        <a className="flex items-center space-x-2 cursor-pointer" href="/">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            SwasthaAI
          </span>
        </a>
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="#features"
            className="relative text-slate-700 hover:text-blue-600 font-medium transition-colors after:content-[''] after:block after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-teal-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
          >
            Features
          </Link>
          <Link
            href="#benefits"
            className="relative text-slate-700 hover:text-blue-600 font-medium transition-colors after:content-[''] after:block after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-teal-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
          >
            Benefits
          </Link>
          <Link
            href="#testimonials"
            className="relative text-slate-700 hover:text-blue-600 font-medium transition-colors after:content-[''] after:block after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-teal-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
          >
            Testimonials
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/login">
            <Button
              variant="ghost"
              className="text-slate-600 hover:text-blue-600 cursor-pointer"
            >
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6 cursor-pointer">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;