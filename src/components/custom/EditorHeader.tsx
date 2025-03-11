import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Code, Monitor, Menu, Save, Send, Smartphone, X } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const onSaveTemplate = async () => {
    if (typeof templateId === "string") {
      await updateEmailTemplate({
        tId: templateId,
        design: emailTemplate,
      });
      toast("Email Template saved successfully!");
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
    setMobileMenuOpen(false);
  };

  const handleMobileView = () => {
    setScreenSize((prev) => ({
      ...prev,
      isMobile: true,
      isTablet: false,
      isDesktop: false,
    }));
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop and Tablet Header */}
      <div className="p-4 shadow-sm hidden md:flex justify-between items-center">
        <div className="flex-shrink-0">
          <Image src="/logo.svg" alt="logo" width={150} height={40} />
        </div>

        <div className="flex items-center gap-2 mx-2">
          <Button
            variant={screenSize.isDesktop ? "default" : "ghost"}
            onClick={handleDesktopView}
            className={`${
              screenSize.isDesktop
                ? "bg-green-500 hover:bg-green-600 text-black dark:bg-green-700 dark:hover:bg-green-800 dark:text-white shadow-md"
                : ""
            }`}
            size="sm"
          >
            <Monitor className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Desktop</span>
          </Button>
          <Button
            variant={screenSize.isMobile ? "default" : "ghost"}
            onClick={handleMobileView}
            className={`${
              screenSize.isMobile
                ? "bg-green-500 hover:bg-green-600 text-black dark:bg-green-700 dark:hover:bg-green-800 dark:text-white shadow-md"
                : ""
            }`}
            size="sm"
          >
            <Smartphone className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Mobile</span>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => viewHTMLCode(true)}
            className="p-2 rounded-full bg-gray-200 hover:border-green-600 text-gray-700 hover:text-green-600 dark:bg-gray-700 dark:hover:bg-green-900 dark:text-gray-300 dark:hover:text-green-400 transition-all duration-200"
            size="sm"
          >
            <Code className="w-4 h-4" />
            <span className="sr-only">View HTML Code</span>
          </Button>

          <Button
            variant="outline"
            className="border-2 border-gray-300 hover:border-green-600 text-gray-700 hover:bg-green-100 dark:border-gray-600 dark:hover:border-green-500 dark:text-gray-200 dark:hover:bg-green-900/30 transition-all duration-200 items-center gap-1 hidden sm:flex"
            size="sm"
          >
            <Send className="w-3 h-3" />
            <span className="hidden lg:inline">Send Test Email</span>
            <span className="lg:hidden">Test</span>
          </Button>

          <Button
            className="bg-green-500 hover:bg-green-600 text-black dark:bg-green-700 dark:hover:bg-green-800 dark:text-white shadow-md hover:shadow-lg transition-all duration-200 items-center gap-1 hidden sm:flex"
            onClick={onSaveTemplate}
            size="sm"
          >
            <Save className="w-3 h-3" />
            <span className="hidden lg:inline">Save Template</span>
            <span className="lg:hidden">Save</span>
          </Button>

          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="p-3 shadow-sm flex md:hidden justify-between items-center">
        <div className="flex-shrink-0">
          <Image src="/logo.svg" alt="logo" width={120} height={30} />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={() => viewHTMLCode(true)}
            className="p-1 rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            size="sm"
          >
            <Code className="w-4 h-4" />
          </Button>

          <Button
            className="bg-green-500 text-black dark:bg-green-700 dark:text-white"
            onClick={onSaveTemplate}
            size="sm"
          >
            <Save className="w-4 h-4" />
          </Button>

          <ThemeToggle />

          <Button
            variant="ghost"
            onClick={() => setMobileMenuOpen(true)}
            className="p-1"
            size="sm"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-64 bg-white dark:bg-gray-900 p-4 shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Options</h2>
              <Button
                variant="ghost"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1"
                size="sm"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">View Mode</h3>
                <div className="flex gap-2">
                  <Button
                    variant={screenSize.isDesktop ? "default" : "outline"}
                    onClick={handleDesktopView}
                    className={
                      screenSize.isDesktop
                        ? "bg-green-500 text-black dark:bg-green-700 dark:text-white"
                        : ""
                    }
                    size="sm"
                  >
                    <Monitor className="w-4 h-4 mr-1" />
                    Desktop
                  </Button>
                  <Button
                    variant={screenSize.isMobile ? "default" : "outline"}
                    onClick={handleMobileView}
                    className={
                      screenSize.isMobile
                        ? "bg-green-500 text-black dark:bg-green-700 dark:text-white"
                        : ""
                    }
                    size="sm"
                  >
                    <Smartphone className="w-4 h-4 mr-1" />
                    Mobile
                  </Button>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full justify-start"
                size="sm"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Test Email
              </Button>

              <Button
                className="w-full justify-start bg-green-500 text-black dark:bg-green-700 dark:text-white"
                onClick={onSaveTemplate}
                size="sm"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Template
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
