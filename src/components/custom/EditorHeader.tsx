import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Code, Monitor, Smartphone } from "lucide-react";
import ThemeToggle from "../ui/ThemeSwitcher";

export default function EditorHeader() {
  return (
    <div className="p-4 shadow-sm flex justify-between">
      <Image src="/logo.svg" alt="logo" width={200} height={150} />
      <div>
        <Button variant="ghost">
          <Monitor />
          Desktop
        </Button>
        <Button variant="ghost">
          <Smartphone />
          Mobile
        </Button>
      </div>
      <div className="flex gap-3">
        <Button
          variant="ghost"
          className="hover:text-primary hover:bg-green-200"
        >
          <Code />
        </Button>
        <Button variant={"outline"}>Send Test Email</Button>
        <Button>Save Template</Button>
        <div className="relative">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
