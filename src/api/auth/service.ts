import { useMutation } from "@tanstack/react-query";
import { useUserStore } from "../../store/user";
import { login_user, register_user } from "./api";
import { saveLocalToken } from "../../utils";
import toast from "react-hot-toast";
import type { TBaseUser } from "../../types";

// REGISTER SERVICE
export const useRegisterUser = () => {
  const { setUser } = useUserStore();
  return useMutation({
    mutationFn: (bodyData: FormData) => register_user(bodyData),
    mutationKey: ["register_user"],
    onSuccess: (data) => {
      setUser(data?.user);
      saveLocalToken(data?.token);
      toast.success(data?.message || "Registration successful!");
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};

// LOGIN SERVICE
export const useLoginUser = () => {
  const { setUser } = useUserStore();
  return useMutation({
    mutationFn: (bodyData: Pick<TBaseUser, "email" | "password">) =>
      login_user(bodyData),
    mutationKey: ["login_user"],
    onSuccess: (data) => {
      setUser(data?.user);
      saveLocalToken(data?.token);
      toast.success(data?.message || "Login successful!");
    },
    onError: (error) => {
      toast.error(typeof error === "string" ? error : "Something went wrong!");
    },
  });
};
