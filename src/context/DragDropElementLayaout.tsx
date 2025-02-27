import { DragDropLayoutElementType } from "@/lib/dto";
import { createContext, Dispatch, SetStateAction } from "react";

export const DragDropLayoutElement = createContext<
  | {
      dragDropState: DragDropLayoutElementType;
      setDragDropState: Dispatch<SetStateAction<DragDropLayoutElementType>>;
    }
  | undefined
>(undefined);
