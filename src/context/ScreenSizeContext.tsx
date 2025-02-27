import { ScreenSizeContextType } from "@/lib/dto";
import { createContext, Dispatch, SetStateAction } from "react";

export const ScreenSizeContext = createContext<
  | {
      screenSize: ScreenSizeContextType;
      setScreenSize: Dispatch<SetStateAction<ScreenSizeContextType>>;
    }
  | undefined
>(undefined);
