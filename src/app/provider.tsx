"use client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserDetailContext } from "@/context/UserDetailContext";
import { ScreenSizeContext } from "@/context/ScreenSizeContext";
import {
  DragDropLayoutElementType,
  EmailTemplateType,
  ScreenSizeContextType,
  SelectedElementData,
  UserDetail,
} from "@/lib/dto";
import { DragDropLayoutElement } from "@/context/DragDropElementLayaout";
import { EmailTemplateContext } from "@/context/EmailTemlateContext";
import { CircleIcon } from "lucide-react";
import { SelectedElementContext } from "@/context/SelectedElement";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [userDetail, setUserDetail] = useState<UserDetail | undefined>();
  const [screenSize, setScreenSize] = useState<ScreenSizeContextType>({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });
  const [dragDropState, setDragDropState] = useState<DragDropLayoutElementType>(
    {
      dargLayout: {
        id: 0,
        label: "",
        type: "",
        numOfCol: 0,
        icon: CircleIcon, // Use a dummy function as placeholder for the icon
      },
      elementList: [],
      layoutItems: [],
      isDragging: false,
    }
  );
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplateType>({
    id: 0,
    subject: "",
    content: [],
    style: {},
    length: 0,
  });
  const [selectedElement, setSelectedElement] =
    useState<SelectedElementData | null>(null);

  // Memoize context values
  const userDetailValue = useMemo(
    () => ({ userDetail, setUserDetail }),
    [userDetail]
  );
  const screenSizeValue = useMemo(
    () => ({ screenSize, setScreenSize }),
    [screenSize]
  );
  const dragDropValue = useMemo(
    () => ({
      dragDropState,
      setDragDropState,
    }),
    [dragDropState]
  );
  const emailTemplateValue = useMemo(
    () => ({
      emailTemplate,
      setEmailTemplate,
    }),
    [emailTemplate]
  );
  const selectedElementValue = useMemo(
    () => ({
      selectedElement,
      setSelectedElement,
    }),
    [selectedElement]
  );

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storageEmailTemplate = localStorage.getItem("emailTemplate");
      if (storageEmailTemplate) {
        try {
          const template = JSON.parse(storageEmailTemplate);
          if (template) {
            setEmailTemplate(template);
          }
        } catch (error) {
          console.error("Error parsing email template:", error);
          localStorage.removeItem("emailTemplate");
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && emailTemplate.content.length > 0) {
      localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
    }
  }, [emailTemplate]);

  useEffect(() => {
    // Handle screen size updates
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const width = window.innerWidth;
        setScreenSize({
          width: width,
          height: window.innerHeight,
          isMobile: width < 768,
          isTablet: width >= 768 && width < 1024,
          isDesktop: width >= 1024,
        });
      };

      // Set initial size
      handleResize();

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <ConvexProvider client={convex}>
      <GoogleOAuthProvider clientId={googleClientId}>
        <UserDetailContext.Provider value={userDetailValue}>
          <ScreenSizeContext.Provider value={screenSizeValue}>
            <DragDropLayoutElement.Provider value={dragDropValue}>
              <EmailTemplateContext.Provider value={emailTemplateValue}>
                <SelectedElementContext.Provider value={selectedElementValue}>
                  {children}
                </SelectedElementContext.Provider>
              </EmailTemplateContext.Provider>
            </DragDropLayoutElement.Provider>
          </ScreenSizeContext.Provider>
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
export const useScreenSize = () => {
  const context = useContext(ScreenSizeContext);
  if (context === undefined) {
    throw new Error("useScreenSize must be used within a ScreenSizeProvider");
  }
  return context;
};
export const useDragElementLayout = () => {
  const context = useContext(DragDropLayoutElement);
  if (context === undefined) {
    throw new Error(
      "useDragElementLayout must be used within a ScreenSizeProvider"
    );
  }
  return context;
};
export const useEmailTemplate = () => {
  const context = useContext(EmailTemplateContext);
  if (context === undefined) {
    throw new Error(
      "useDragElementLayout must be used within a ScreenSizeProvider"
    );
  }
  return context;
};

export const useSelectedElement = () => {
  const context = useContext(SelectedElementContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedElement must be used within a SelectedElementProvider"
    );
  }
  return context;
};
