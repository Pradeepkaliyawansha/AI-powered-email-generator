"use client";
import Image from "next/image";
import React, { useState } from "react";
import ThemeToggle from "../ui/ThemeSwitcher";
import SigninButton from "./SigninButton";
import { Button } from "../ui/button";
import { useUserDetail } from "@/app/provider";
import Link from "next/link";
import { UserDetailContextValue } from "@/lib/dto";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { userDetail } = useUserDetail() as UserDetailContextValue;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="relative shadow-sm">
      {/* Desktop and Tablet Header */}
      <div className="flex justify-between items-center p-3 md:p-4 px-4 md:px-10">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="logo"
              width={140}
              height={40}
              className="w-auto h-8 md:h-10"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {userDetail?.email ? (
            <div className="flex items-center gap-3">
              <Link href="/dashboard">
                <Button className="bg-green-500 hover:bg-green-600 text-black dark:bg-green-700 dark:hover:bg-green-800 dark:text-white">
                  Dashboard
                </Button>
              </Link>
              {userDetail?.picture && (
                <Image
                  src={userDetail.picture}
                  alt="user"
                  width={35}
                  height={35}
                  className="rounded-full"
                />
              )}
            </div>
          ) : (
            <SigninButton />
          )}
          <div>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            className="p-1"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md z-50 py-4 px-4 border-t dark:border-gray-800 animate-in slide-in-from-top">
          <div className="flex flex-col items-start gap-4">
            {userDetail?.email ? (
              <div className="flex flex-col items-start gap-4 w-full">
                <div className="flex items-center gap-3 w-full">
                  {userDetail?.picture && (
                    <Image
                      src={userDetail.picture}
                      alt="user"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-sm truncate max-w-[200px]">
                    {userDetail.email}
                  </span>
                </div>
                <Link href="/dashboard" className="w-full">
                  <Button className="bg-green-500 hover:bg-green-600 text-black dark:bg-green-700 dark:hover:bg-green-800 dark:text-white w-full">
                    Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="w-full">
                <SigninButton />
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
