import { EmailTemplateType } from "@/lib/dto";
import { createContext, Dispatch, SetStateAction } from "react";

export const EmailTemplateContext = createContext<
  | {
      emailTemplate: EmailTemplateType;
      setEmailTemplate: Dispatch<SetStateAction<EmailTemplateType>>;
    }
  | undefined
>(undefined);
