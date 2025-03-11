"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";
import AiInputBox from "@/components/custom/AiInputBox";

export default function Create() {
  return (
    <div className="px-10 md:px-2 lg:px-64 xl:px-72">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-3xl text-green-600 dark:text-green-700">
          CREATE NEW EMAIL TEMPLATE
        </h2>
        <p className="text--lg dark:text-gray-300 text-gray-700">
          Create professional and engaging email templates instantly with AI.
          Simply enter your details, choose a style. 🚀
        </p>
        <Tabs defaultValue="account" className="w-[500px] mt-10">
          <TabsList>
            <TabsTrigger value="AI">
              Create with AI
              <Sparkles className="h-5 w-5 ml-2" />
            </TabsTrigger>
            <TabsTrigger value="SCRATCH">Start from Scratch</TabsTrigger>
          </TabsList>
          <TabsContent value="AI">
            <AiInputBox />
          </TabsContent>
          <TabsContent value="SCRATCH">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
