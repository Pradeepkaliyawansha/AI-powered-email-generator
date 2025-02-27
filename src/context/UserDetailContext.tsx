import { UserDetail } from "@/lib/dto";
import { createContext } from "react";

interface UserDetailContextType {
  userDetail: UserDetail | undefined;
  setUserDetail: React.Dispatch<React.SetStateAction<UserDetail | undefined>>;
}

const defaultValue: UserDetailContextType = {
  userDetail: undefined,
  setUserDetail: () => {}, // Empty function as placeholder
};

export const UserDetailContext =
  createContext<UserDetailContextType>(defaultValue);
