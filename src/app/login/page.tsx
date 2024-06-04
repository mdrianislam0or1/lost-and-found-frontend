"use client";
import Navbar from "@/components/Shared/Navbar/Navbar";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type FormValues = {
  usernameOrEmail: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.log(values);

    try {
      const res = await userLogin(values);
      if (res?.data?.token) {
        storeUserInfo({ accessToken: res?.data?.token });
      }
      if (res?.data?.token) {
      }
      console.log(res);
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Login to Your Account
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded-md shadow-sm">
              <div>
                <label htmlFor="usernameOrEmail" className="sr-only">
                  Username or Email address
                </label>
                <input
                  id="usernameOrEmail"
                  type="text"
                  autoComplete="username"
                  required
                  {...register("usernameOrEmail")}
                  className="relative block w-full px-3 py-2 my-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Username or Email address"
                />
                {errors.usernameOrEmail && (
                  <p className="text-sm text-red-600">
                    {errors.usernameOrEmail.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  {...register("password")}
                  className="relative block w-full px-3 py-2 my-2 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-sm text-red-600">
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className={`group relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
            <div className="text-sm text-center">
              Donot have an account?{" "}
              <a
                href="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign up
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
