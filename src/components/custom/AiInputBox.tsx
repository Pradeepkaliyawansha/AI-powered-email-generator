"use client";
import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useUserDetail } from "@/app/provider";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Prompt from "../../../Data/Prompt";
import { toast } from "sonner";

export default function AiInputBox() {
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { userDetail } = useUserDetail();
  const saveTemplate = useMutation(api.emailTemplate.SaveTemplate);
  const router = useRouter();

  const OnGenerate = async () => {
    const PROMPT = Prompt.EMAIL_PROMPT + "-" + userInput;
    const tId = uuidv4();
    setLoading(true);

    if (!userDetail?.email) {
      console.error("User email is undefined");
      toast.error("User email is required");
      setLoading(false);
      return;
    }

    try {
      console.log("Sending prompt to AI...");
      const result = await axios.post("/api/ai-email-generate", {
        prompt: PROMPT,
      });

      console.log("AI Response:", result.data);

      // Parse the AI response - it should be JSON string
      const aiResponse = result.data.response;

      try {
        const parsedDesign = JSON.parse(aiResponse);
        console.log("Parsed design:", parsedDesign);

        // Validate the parsed design
        if (!Array.isArray(parsedDesign)) {
          throw new Error("Design is not an array");
        }

        const resp = await saveTemplate({
          tId: tId,
          design: parsedDesign, // Pass the parsed JSON object, not the raw string
          email: userDetail?.email,
          description: userInput,
        });

        console.log("Template saved:", resp);
        toast.success("Template generated successfully!");
        router.push("/editor/" + tId);
      } catch (parseError) {
        console.error("Error parsing AI response:", parseError);
        console.log("Raw AI response:", aiResponse);
        toast.error("Failed to parse AI response");
      }

      setLoading(false);
    } catch (error) {
      console.error("Error generating template:", error);
      toast.error("Failed to generate template");
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <p className="mb-2">Provide details about email template</p>
      <Textarea
        placeholder="Start writing here"
        rows={5}
        className="text-xl"
        onChange={(e) => setUserInput(e.target.value)}
      />
      <Button
        className="w-full mt-7 bg-green-500 hover:bg-green-600 text-black dark:bg-green-700 dark:hover:bg-green-800 dark:text-white "
        disabled={userInput?.length == 0 || loading}
        onClick={OnGenerate}
      >
        {loading ? (
          <span className="flex items-center gap-1">
            <Loader2 className="animate-spin" />
            Please wait....
          </span>
        ) : (
          "Generate"
        )}
      </Button>
    </div>
  );
}
