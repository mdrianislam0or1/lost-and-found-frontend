"use server";

import { RegisterForm } from "@/app/register/page";

export const register = async (formData: RegisterForm) => {
  const res = await fetch(`http://localhost:5000/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    cache: "no-store",
  });

  const info = await res.json();
  return info;
};
