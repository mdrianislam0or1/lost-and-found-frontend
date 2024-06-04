// "use server";
import { FormValues } from "@/app/login/page";
import { storeUserInfo } from "../auth.service";
import { cookies } from "next/headers";
import { authKey } from "@/constants/authKey";
import { redirect } from "next/navigation";
import setAccessToken from "./setAccessToken";

export const userLogin = async (data: FormValues) => {
  const response = await fetch(
    "https://lost-and-found-backend-tau.vercel.app/api/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
      credentials: "include",
    }
  );
  const result = await response.json();

  console.log("here ", result?.data?.token);
  if (result?.data?.token) {
    setAccessToken(result?.data?.token, {
      redirect: "/dashboard",
    });
  }
  return result;
};
