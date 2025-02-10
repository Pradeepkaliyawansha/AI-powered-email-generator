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
