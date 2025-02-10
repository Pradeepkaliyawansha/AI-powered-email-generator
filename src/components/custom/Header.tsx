"use client";
import Image from "next/image";
import React from "react";
import ThemeToggle from "../ui/ThemeSwitcher";
import SigninButton from "./SigninButton";
import { Button } from "../ui/button";
import { useUserDetail } from "@/app/provider";
import Link from "next/link";
import { UserDetailContextValue } from "@/lib/dto";

export default function Header() {
  const { userDetail } = useUserDetail() as UserDetailContextValue;

  return (
    <div className="flex justify-between items-center p-4 shadow-sm px-10">
      <Image src="/logo.svg" alt="logo" width={180} height={140} />
      <div className="flex items-center gap-4">
        {userDetail?.email ? (
          <div className="flex items-center gap-3">
            <Link href={"/dashboard"}>
              <Button className="bg-green-700 dark:bg-green-400">
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
        <div className="relative">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
