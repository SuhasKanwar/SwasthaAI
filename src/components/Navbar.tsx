import React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="relative z-10 flex items-center justify-between p-6 lg:px-8 backdrop-blur-sm bg-white/30">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-xl flex items-center justify-center">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
          SwasthaAI
        </span>
      </div>
      <div className="hidden md:flex items-center space-x-8">
        <Link
          href="#features"
          className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
        >
          Features
        </Link>
        <Link
          href="#benefits"
          className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
        >
          Benefits
        </Link>
        <Link
          href="#testimonials"
          className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
        >
          Testimonials
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/login">
          <Button
            variant="ghost"
            className="text-slate-600 hover:text-blue-600"
          >
            Login
          </Button>
        </Link>
        <Link href="/signup">
          <Button className="bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 text-white px-6">
            Sign Up
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;