import { TypedUseSelectorHook, useSelector,useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../redux/store/store";

export const UseTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const UseTypedDispatch = () => useDispatch<AppDispatch>();

export type loginResponsType = {
    resultCode: number;
    messages: string[];
    data: {
      id: number;
      email: string;
      login: string;
    }
}

type profileContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
} 

export type photoType = {
    small: string | null;
    large: string | null;
}

export type profileType = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  aboutMe?: string;
  contacts: profileContactsType;
  photos?: photoType
}

export type followingType = {
  follow: boolean, 
  id: number, 
  isProfile: boolean, 
  person: string
}

export type userType = {
  name: string,
  id: number,
  photos: {
    small: string | null;
    large: string | null;
  },
  status: null | string,
  followed: boolean
}