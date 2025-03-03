import { SelectedElementContextType } from "@/lib/dto";
import { createContext } from "react";

export const SelectedElementContext = createContext<
  SelectedElementContextType | undefined
>(undefined);
