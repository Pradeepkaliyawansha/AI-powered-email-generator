import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Code, Monitor, Save, Send, Smartphone } from "lucide-react";
import ThemeToggle from "../ui/ThemeSwitcher";
import { EditorHeaderProps } from "@/lib/dto";
import { useEmailTemplate, useScreenSize } from "@/app/provider";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function EditorHeader({ viewHTMLCode }: EditorHeaderProps) {
  const { screenSize, setScreenSize } = useScreenSize();
  const updateEmailTemplate = useMutation(
    api.emailTemplate.UpdateTemplateDesign
  );
  const { templateId } = useParams();
  const { emailTemplate } = useEmailTemplate();

  const onSaveTemplate = async () => {
    if (typeof templateId === "string") {
      await updateEmailTemplate({
        tId: templateId,
        design: emailTemplate,
      });
      toast("Email Template saved sucessfully!");
    } else {
      console.error("Invalid template ID");
    }
  };

  const handleDesktopView = () => {
    setScreenSize((prev) => ({
      ...prev,
      isMobile: false,
      isTablet: false,
      isDesktop: true,
    }));
  };

  const handleMobileView = () => {
    setScreenSize((prev) => ({
      ...prev,
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    }));
  };

  return (
    <div className="p-4 shadow-sm flex justify-between">
      <Image src="/logo.svg" alt="logo" width={200} height={150} />
      <div>
        <Button
          variant={screenSize.isDesktop ? "default" : "ghost"}
          onClick={handleDesktopView}
          className={
            screenSize.isDesktop
              ? "bg-green-500 hover:bg-green-600 text-black dark:bg-green-700 dark:hover:bg-green-800 dark:text-white shadow-md"
              : ""
          }
        >
          <Monitor />
          Desktop
        </Button>
        <Button
          variant={screenSize.isMobile ? "default" : "ghost"}
          onClick={handleMobileView}
          className={
            screenSize.isMobile
              ? "bg-green-500 hover:bg-green-600 text-black dark:bg-green-700 dark:hover:bg-green-800 dark:text-white shadow-md"
              : ""
          }
        >
          <Smartphone />
          Mobile
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          onClick={() => viewHTMLCode(true)}
          className="p-2 rounded-full bg-gray-200 hover:border-green-600 text-gray-700 hover:text-green-600 dark:bg-gray-700 dark:hover:bg-green-900 dark:text-gray-300 dark:hover:text-green-400 transition-all duration-200"
        >
          <Code className="w-5 h-5" />
          <span className="sr-only">View HTML Code</span>
        </Button>
        <Button
          variant="outline"
          className="border-2 border-gray-300 hover:border-green-600 text-gray-700 hover:bg-green-100 dark:border-gray-600 dark:hover:border-green-500 dark:text-gray-200 dark:hover:bg-green-900/30 transition-all duration-200 flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          Send Test Email
        </Button>

        <Button
          className="bg-green-500 hover:bg-green-600 text-black dark:bg-green-700 dark:hover:bg-green-800 dark:text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2"
          onClick={onSaveTemplate}
        >
          <Save className="w-4 h-4" />
          Save Template
        </Button>
        <div className="relative ml-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
