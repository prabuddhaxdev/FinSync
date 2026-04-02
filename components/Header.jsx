import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard, BadgePlus } from "lucide-react";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <header
      className="fixed top-0 w-full z-50 backdrop-blur-xl"
    >
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-emerald-500 to-green-400 bg-clip-text text-transparent">
              Fin
            </span>
            <span className="text-gray-900 dark:text-white">Sync</span>
          </h1>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-600 dark:text-gray-300 
hover:text-emerald-500 dark:hover:text-emerald-400 
transition font-medium"
          >
            Features
          </a>
          <a
            href="#testimonials"
            className="text-gray-600 dark:text-gray-300 
hover:text-emerald-500 dark:hover:text-emerald-400 
transition font-medium"
          >
            Testimonials
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Show when="signed-in">
            {/* Dashboard Button */}
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="flex items-center gap-2 
                border-emerald-500/40 text-emerald-600 
                hover:bg-emerald-500/10 hover:border-emerald-500 
                dark:text-emerald-400 dark:border-emerald-400/40 
                dark:hover:bg-emerald-400/10 transition-all"
              >
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>

            {/* Add Transaction Button */}
            <Link href="/transaction/create">
              <Button
                className="flex items-center gap-2 
                bg-gradient-to-r from-emerald-500 to-green-500 
                hover:from-emerald-600 hover:to-green-600 
                text-white shadow-md hover:shadow-emerald-500/20 
                transition-all border-0"
              >
                <span className="hidden md:inline">Add Transaction</span>
                <BadgePlus size={18} />
              </Button>
            </Link>

            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-emerald-500/30",
                },
              }}
            />
          </Show>

          <Show when="signed-out">
            <SignInButton forceRedirectUrl="/dashboard">
              <Button
                variant="outline"
                className="border-emerald-500/40 text-emerald-600 
                hover:bg-emerald-500/10 hover:border-emerald-500 
                dark:text-emerald-400 dark:border-emerald-400/40"
              >
                Login
              </Button>
            </SignInButton>
          </Show>

          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Header;
