import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Prompt from "../../../Data/Prompt";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useUserDetail } from "@/app/provider";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

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
      setLoading(false);
      return;
    }
    try {
      const result = await axios.post("/api/ai-email-generate", {
        prompt: PROMPT,
      });

      const resp = await saveTemplate({
        tId: tId,
        design: result.data,
        email: userDetail?.email,
        description: userInput,
      });
      console.log(resp);
      router.push("/editor/" + tId);
      setLoading(false);
    } catch (error) {
      console.log(error);
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
