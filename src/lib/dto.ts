import { LucideIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export interface UserDetail {
  email: string;
  picture: string;
  name?: string;
  _id?: string;
}

export interface UserDetailContextValue {
  userDetail: UserDetail | undefined;
  setUserDetail: React.Dispatch<React.SetStateAction<UserDetail | undefined>>;
}

export interface ElementLayoutCardProps {
  layoutItems: LayoutItem;
  elementList: ElementList;
}

export interface LayoutItem {
  id: number;
  label: string;
  type: string;
  numOfCol: number;
  icon: LucideIcon;
}

interface SocialIcon {
  icon: string;
  url: string;
}
interface ComponentStyle {
  [key: string]: string | number;
}
export interface ElementList {
  icon: LucideIcon;
  label: string;
  type: string;
  content?: string;
  url?: string;
  imageUrl?: string;
  alt?: string;
  textarea?: string;
  socialIcons?: SocialIcon[];
  options?: SocialIcon[];
  style: ComponentStyle;
  outerStyle?: ComponentStyle;
}

export interface ScreenSizeContextType {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export interface DragDropLayoutElementType {
  dargLayout?: LayoutItem & { id?: number };
  dragElement?: ElementList & { id?: number };
  elementList: ElementList[];
  layoutItems: LayoutItem[];
  isDragging: boolean;
}

export interface EmailTemplateType {
  id: number;
  length: number;
  subject: string;
  content: (string | (LayoutItem & { id?: number }))[];
  style?: {
    [key: string]: string | number;
  };
}

export interface DragOverState {
  index: number;
  columnId?: string | number;
}

export interface SelectedElementData {
  layoutItem: LayoutItem;
  elementList: ElementList;
  index: number;
}

export interface SelectedElementContextType {
  selectedElement: SelectedElementData | null;
  setSelectedElement: Dispatch<SetStateAction<SelectedElementData | null>>;
}

export interface ExtendedLayoutItem extends LayoutItem {
  [key: number]: ElementList;
}
