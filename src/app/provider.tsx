"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useContext, useEffect, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserDetailContext } from "@/context/UserDetailContext";
import { UserDetail } from "@/lib/dto";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [userDetail, setUserDetail] = useState<UserDetail | undefined>();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageData = localStorage.getItem("userDetails");
      if (storageData) {
        try {
          const userData = JSON.parse(storageData);
          if (userData?.email) {
            setUserDetail(userData);
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("userDetails");
        }
      }
    }
  }, []);

  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
          {children}
        </UserDetailContext.Provider>
      </GoogleOAuthProvider>
    </ConvexProvider>
  );
}

export const useUserDetail = () => {
  const context = useContext(UserDetailContext);
  if (context === undefined) {
    throw new Error("useUserDetail must be used within a UserDetailProvider");
  }
  return context;
};
