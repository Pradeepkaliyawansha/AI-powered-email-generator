"use client";
import { useUserDetail } from "@/app/provider";
import EmailTemplate from "@/components/custom/EmailTemplate";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Dashboard() {
  const { userDetail, setUserDetail } = useUserDetail();

  return (
    <div>
      <Header />
      <div className="p-10 md:px-28 lg:px-40 xl:px-56 mt-16">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-3xl">Hello, {userDetail?.name}</h2>
          <Button className="bg-green-700 dark:bg-green-400">
            + Create New Email Template
          </Button>
        </div>
        <EmailTemplate />
      </div>
    </div>
  );
}
