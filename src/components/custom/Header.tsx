import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import ThemeToggle from "../ui/ThemeSwitcher";

export default function Header() {
  return (
    <div className="flex justify-between items-center p-4 shadow-sm px-10">
      <Image src={"/logo.svg"} alt="logo" width={180} height={140} />
      <div className="flex items-center gap-4">
        <Button className="bg-green-700 dark:bg-green-400">Get Started</Button>
        <div className="relative">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
