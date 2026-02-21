import type { InputHTMLAttributes, JSX, ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export interface ClassName {
  className?: string;
}

interface TBaseInput extends ClassName {
  containerClassName?: string;
  icons?: { left?: TInputIcon; right?: Omit<TInputIcon, "text"> };
  register?: UseFormRegisterReturn;
  label?: string;
  error?: string;
}

type TInputIcon = { text?: string; icon?: ReactNode; onClick?: () => void };

export interface IInput extends TBaseInput {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
}

// Modal Types
export interface ModalProps extends ClassName {
  isOpen: boolean;
  onClose: () => void;
  children: JSX.Element;
  containerProps?: JSX.IntrinsicElements["div"];
  heading?: string;
}

// useVerticalScrollable hook types
export interface VerticalScrollType {
  top: boolean;
  bottom: boolean;
}

export type TUserRole = "ADMIN" | "USER";

export type TBaseUser = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  profilePic?: File | string;
};

// user store types
export interface IUser extends Omit<TBaseUser, "profilePic"> {
  _id: string;
  role: TUserRole;
  profilePic: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserStore {
  user: IUser | null;
  isLoggedIn: boolean;
  setUser: (user: IUser) => void;
  logout: () => void;
}
