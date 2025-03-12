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
      const result = await convex.query(api.emailTemplate.GetTemplateDesign, {
        tId: templateId,
        email: userDetail.email,
      });

      if (result?.design) {
        // If database has template data, use it
        setEmailTemplate(result.design);
      } else {
        // Otherwise, check if we have valid data in local storage
        const storageData = localStorage.getItem("emailTemplate");
        if (storageData) {
          try {
            const localTemplate = JSON.parse(storageData);
            if (
              localTemplate &&
              localTemplate.content &&
              localTemplate.content.length > 0
            ) {
              // Use local template if it exists and has content
              setEmailTemplate(localTemplate);
            }
          } catch (error) {
            console.error("Error parsing local template:", error);
          }
        }
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <EditorHeader viewHTMLCode={(v) => setViewHTMLCode(v)} />

      {!loading ? (
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
      ) : (
        <div>Please Wait....</div>
      )}
    </div>
  );
}
