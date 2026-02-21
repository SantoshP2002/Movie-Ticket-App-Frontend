import { FaRegUser, FaLock, FaArrowRight, FaImages } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { TbLockPassword } from "react-icons/tb";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import Input from "../../components/input";
import { useRegisterUser } from "../../api/auth/service";
import { Controller, useForm, useWatch } from "react-hook-form";
import { registerSchema } from "../../validation/auth";
import type z from "zod";
import type { TBaseUser } from "../../types";
import LoadingScreen from "../../components/LoadingScreen";
import { ALLOWED_IMAGE_TYPES } from "../../constants";

const Register = () => {
  const navigate = useNavigate();
  const { mutateAsync, isPending, isError } = useRegisterUser();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const profilePic = useWatch({
    control,
    name: "profilePic",
  });

  const onSubmit = async (data: TBaseUser) => {
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    if (data.profilePic) {
      formData.append("profilePic", data.profilePic);
    }

    const res = await mutateAsync(formData);

    if (res?.success) {
      localStorage.setItem("token", res.token);
      navigate("/");
    }
  };

  if (isPending)
    return (
      <div>
        <LoadingScreen content="Register Loading Please Wait !" />
      </div>
    );
  if (isError) return <div>Something went wrong</div>;

  return (
    <div className="w-full min-h-screen flex flex-col gap-5 items-center justify-center bg-linear-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-[#0f0c29] dark:via-[#302b63] dark:to-[#24243e]">
      <h1 className="text-3xl font-bold text-center bg-linear-to-r from-blue-400 to-purple-700 text-transparent bg-clip-text">
        REGISTER
      </h1>

      {/* MAIN CARD */}
      <div className="flex w-full max-w-225 overflow-hidden">
        <div className="w-full pl-5 py-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-md mx-auto flex flex-col gap-4"
          >
            {/* Profile Preview */}
            {profilePic && (
              <img
                src={URL.createObjectURL(profilePic)}
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto object-cover"
              />
            )}

            {/* Upload Image */}
            <div className="relative">
              <Controller
                name="profilePic"
                control={control}
                render={({ field }) => (
                  <Input
                    label="Upload Image"
                    className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
                    inputProps={{
                      type: "file",
                      accept: ALLOWED_IMAGE_TYPES.join(","),
                      onChange: (e) =>
                        field.onChange(e.target.files?.[0] || null),
                    }}
                  />
                )}
              />
              <FaImages className="absolute top-3 lg:top-4 left-3 text-gray-500" />
              {errors.profilePic && (
                <p className="text-red-500 text-xs">
                  {String(errors.profilePic.message)}
                </p>
              )}
            </div>

            {/* Name */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Input
                  label="First Name"
                  register={register("firstName")}
                  className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
                  inputProps={{ placeholder: "First name" }}
                />
                <FaRegUser className="absolute top-3 lg:top-4 left-3 text-gray-500" />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* LAST NAME  */}
              <div className="relative flex-1">
                <Input
                  label="Last Name"
                  register={register("lastName")}
                  className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
                  inputProps={{ placeholder: "Last name" }}
                />
                <FaRegUser className="absolute top-3 lg:top-4 left-3 text-gray-500" />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <Input
                label="Email"
                register={register("email")}
                className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
                inputProps={{ placeholder: "Enter Email" }}
              />
              <AiOutlineMail className="absolute top-3 lg:top-4 left-3 text-gray-500" />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Input
                  label="Password"
                  register={register("password")}
                  className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
                  inputProps={{ placeholder: "Password" }}
                />
                <FaLock className="absolute top-3 lg:top-4 left-3 text-gray-500" />
                {errors.password && (
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* Confirm Password  */}
              <div className="relative flex-1">
                <Input
                  label="Confirm Password"
                  register={register("confirmPassword")}
                  className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black border-black dark:bg-black dark:text-white dark:border-gray-700"
                  inputProps={{ placeholder: "Confirm password" }}
                />
                <TbLockPassword className="absolute top-3 lg:top-4 left-3 text-gray-500" />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* REGISTER BUTTON */}
            <Button
              content="Register"
              pattern="outline"
              className="w-40!"
              buttonProps={{ type: "submit", disabled: isSubmitting }}
            />

            {/* Divider */}
            <div className="flex items-center my-3">
              <div className="flex-1 h-px bg-black dark:bg-white" />
            </div>

            {/* Social Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-3">
              <Button
                pattern="outline"
                content={
                  <span className="flex items-center justify-center gap-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                      alt="Google"
                      className="w-4 h-4"
                    />
                    Continue with Google
                  </span>
                }
                className="w-full sm:w-60 bg-white rounded-xl text-black border-2 border-black text-xs sm:text-sm py-1 sm:py-2 px-3 shadow-[2px_2px_0_0_#000] transition-all duration-200 ease-out dark:bg-black dark:text-white dark:border-white dark:shadow-[2px_2px_0_0_#fff]"
              />

              <Button
                content="Back to 🏠"
                pattern="outline"
                className="w-full sm:w-50"
                icons={{ right: <FaArrowRight /> }}
                buttonProps={{
                  onClick: () => navigate("/"),
                }}
              />
            </div>

            {/* LOGIN LINK */}
            <div className="mt-3 flex justify-center">
              <div className="flex flex-col justify-center items-center gap-3 text-xs">
                <span className="text-black dark:text-gray-300">
                  Already have an account?
                </span>
                <Link
                  to="/login"
                  className="transition-all duration-300 hover:bg-gray-200 hover:rounded-full hover:shadow-2xl hover:shadow-blue-900 px-5 py-2 dark:text-white dark:hover:bg-gray-800 dark:hover:shadow-blue-400"
                >
                  LOGIN
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
