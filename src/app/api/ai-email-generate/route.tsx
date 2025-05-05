// Update src/app/api/ai-email-generate/route.tsx
import { NextResponse } from "next/server";
import { GenerateEmailTemplateAIModel } from "../../../../config/AiModel";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const result = await GenerateEmailTemplateAIModel.sendMessage(prompt);
    const aiResp = result.response.text();

    // Clean the response to ensure it's valid JSON
    const cleanedResp = aiResp.trim().replace(/```json|```/g, "");

    return NextResponse.json({ response: cleanedResp });
  } catch (error) {
    console.error("Error generating email template:", error);
    return NextResponse.json(
      { error: "Failed to generate email template" },
      { status: 500 }
    );
  }
}
