"use server";
import { FormValues } from "@/app/login/page";

export const userLogin = async (data: FormValues) => {
  const response = await fetch("http://localhost:5000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  const result = await response.json();
  return result;
};
