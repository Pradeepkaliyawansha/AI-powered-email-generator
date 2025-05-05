"use client";
import Canvas from "@/components/custom/Canvas";
import EditorHeader from "@/components/custom/EditorHeader";
import ElementSideBar from "@/components/custom/ElementSideBar";
import Setting from "@/components/custom/Setting";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { useEmailTemplate, useUserDetail } from "@/app/provider";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { EmailTemplateType } from "@/lib/dto";

export default function Editor() {
  const [viewHTMLCode, setViewHTMLCode] = useState<boolean>(false);
  const { templateId } = useParams();
  const { userDetail } = useUserDetail();
  const { setEmailTemplate } = useEmailTemplate();
  const [loading, setLoading] = useState<boolean>(false);

  const convex = useConvex();

  useEffect(() => {
    if (userDetail) {
      GetTemplateData();
    }
  }, [userDetail]);

  const GetTemplateData = async () => {
    if (userDetail?.email && typeof templateId === "string") {
      setLoading(true);

      try {
        const result = await convex.query(api.emailTemplate.GetTemplateDesign, {
          tId: templateId,
          email: userDetail.email,
        });

        console.log("Fetched template data:", result);

        if (result?.design) {
          // Validate the design data structure
          if (Array.isArray(result.design) && result.design.length > 0) {
            const templateData: EmailTemplateType = {
              id: 0,
              subject: "",
              content: result.design,
              style: {},
              length: result.design.length,
            };

            console.log("Setting template data:", templateData);
            setEmailTemplate(templateData);
            toast.success("Template loaded successfully");
          } else {
            console.error("Invalid design data structure");
            toast.error("Invalid template data");
          }
        } else {
          console.log("No design found, using empty template");
          setEmailTemplate({
            id: 0,
            subject: "",
            content: [],
            style: {},
            length: 0,
          });
        }
      } catch (error) {
        console.error("Error fetching template:", error);
        toast.error("Failed to load template");
      }

      setLoading(false);
    }
  };

  return (
    <div>
      <EditorHeader viewHTMLCode={(v) => setViewHTMLCode(v)} />

      {loading ? (
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-lg">Loading template...</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-5">
          <ElementSideBar />
          <div className="col-span-3 bg-gray-100 dark:bg-black">
            <Canvas
              viewHTMLCode={viewHTMLCode}
              closeDialog={() => {
                setViewHTMLCode(false);
              }}
            />
          </div>
          <Setting />
        </div>
      )}
    </div>
  );
}
