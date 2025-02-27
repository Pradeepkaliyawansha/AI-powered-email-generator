import { LucideIcon } from "lucide-react";

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
  selectedElement: ElementList | null;
  layoutItems: LayoutItem[];
  isDragging: boolean;
}

export interface EmailTemplateType {
  length: number;
  subject: string;
  content: (string | (LayoutItem & { id?: number }))[];
  style?: {
    [key: string]: string | number;
  };
}
