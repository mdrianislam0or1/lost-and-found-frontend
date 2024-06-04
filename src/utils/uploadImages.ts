"use client";
export const uploadImage = async (imageFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=468a47d5f64ecfb9b135bba4c38d559d`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.error.message || "Failed to upload image");
  }

  const data = await response.json();
  return data.data.url;
};
