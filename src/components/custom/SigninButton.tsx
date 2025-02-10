"use client";
import React from "react";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUserDetail } from "@/app/provider";

export default function SigninButton() {
  const CreateUser = useMutation(api.users.CreateUser);
  const { setUserDetail } = useUserDetail();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const userInfo = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        const user = userInfo.data;
        const result = await CreateUser({
          name: user.name,
          email: user.email,
          picture: user.picture,
        });

        const userData = {
          ...user,
          _id: result,
        };

        // Update both localStorage and context
        localStorage.setItem("userDetails", JSON.stringify(userData));
        setUserDetail(userData);
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    onError: (errorResponse) => console.error(errorResponse),
  });

  return (
    <div>
      <Button
        className="bg-green-700 dark:bg-green-400"
        onClick={() => googleLogin()}
      >
        Get Started
      </Button>
    </div>
  );
}
