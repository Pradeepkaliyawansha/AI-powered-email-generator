import { LayoutItem } from "@/lib/dto";
import {
  Columns2,
  Columns3,
  Columns4,
  RectangleHorizontal,
} from "lucide-react";

// Export the array with the type definition
const layoutItems: LayoutItem[] = [
  {
    label: "1 Column",
    type: "column",
    numOfCol: 1,
    icon: RectangleHorizontal,
    id: 1,
  },
  {
    label: "2 Column",
    type: "column",
    numOfCol: 2,
    icon: Columns2,
    id: 2,
  },
  {
    label: "3 Column",
    type: "column",
    numOfCol: 3,
    icon: Columns3,
    id: 3,
  },
  {
    label: "4 Column",
    type: "column",
    numOfCol: 4,
    icon: Columns4,
    id: 4,
  },
];

export default layoutItems;
