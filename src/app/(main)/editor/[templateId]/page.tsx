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
        email: userDetail.email, // Now TypeScript knows this is a string
      });
      console.log(result);
      setEmailTemplate(result?.design);
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
