"use server";
import { RegisterForm } from "@/app/register/page";

export const register = async (formData: RegisterForm) => {
  const preparedData = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
    profile: {
      bio: formData.bio,
      age: formData.age,
      profilePicture: formData.profilePicture,
    },
  };

  const res = await fetch(
    `https://lost-and-found-backend-tau.vercel.app/api/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preparedData),
      cache: "no-store",
    }
  );

  const info = await res.json();
  return info;
};
