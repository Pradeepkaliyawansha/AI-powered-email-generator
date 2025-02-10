import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import SigninButton from "./SigninButton";

export default function LandPage() {
  return (
    <div className="px-10 md:px-28 lg:px-44 xl:px-56 flex flex-col items-center mt-24">
      <h2 className="font-extrabold text-5xl text-center">
        Email Templates by{" "}
        <span className="text-primary text-green-800 dark:text-green-400">
          AI-Powered
        </span>
      </h2>
      <p className="text-center mt-4 font-normal">
        Template generator that harnesses the power of AI to create perfect
        emails for any situation. Whether you&apos;re a professional, marketer,
        or business owner, our platform helps you craft compelling emails in
        seconds.
      </p>
      <div className="flex gap-5 mt-6">
        <Button variant="outline" className="dark:bg-green-200 text-black">
          Try Demo
        </Button>
        <SigninButton />
      </div>
      <Image
        src={"/landing.png"}
        className="mt-12 rounded-xl "
        alt="landing"
        width={1000}
        height={500}
      />
    </div>
  );
}
