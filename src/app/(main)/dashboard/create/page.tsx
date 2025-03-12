"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";
import AiInputBox from "@/components/custom/AiInputBox";
import { Button } from "@/components/ui/button";

export default function Create() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 max-w-6xl mx-auto py-6">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-xl sm:text-2xl md:text-3xl text-center text-green-600 dark:text-green-700">
          CREATE NEW EMAIL TEMPLATE
        </h2>
        <p className="text-sm sm:text-base text-center mt-2 max-w-2xl dark:text-gray-300 text-gray-700">
          Create professional and engaging email templates instantly with AI.
          Simply enter your details, choose a style. 🚀
        </p>

        <div className="w-full mt-6 md:mt-10">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="AI" className="flex-1 text-xs sm:text-sm">
                Create with AI
                <Sparkles className="h-4 w-4 ml-1 sm:h-5 sm:w-5 sm:ml-2" />
              </TabsTrigger>
              <TabsTrigger
                value="SCRATCH"
                className="flex-1 text-xs sm:text-sm"
              >
                Start from Scratch
              </TabsTrigger>
            </TabsList>

            <TabsContent value="AI">
              <AiInputBox />
            </TabsContent>

            <TabsContent value="SCRATCH">
              <div className="flex flex-col space-y-4 p-2 sm:p-4">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  Start with a blank template and build your email from scratch
                  using our intuitive editor. Design, format, and customize
                  every element to match your exact requirements.
                </p>

                <Button className="w-full mt-4 md:mt-7 bg-green-500 hover:bg-green-600 text-black dark:bg-green-700 dark:hover:bg-green-800 dark:text-white text-sm sm:text-base py-2">
                  Go to Editor...
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
