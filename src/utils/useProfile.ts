import {
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/profileApi";
import { useState, useEffect } from "react";

interface ProfileData {
  name: string;
  email: string;
  profile: {
    bio: string;
    age: string;
    profilePicture: string;
  };
}

const useProfile = () => {
  const { data: profileData, isLoading: isProfileLoading } =
    useGetMyProfileQuery({});
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    age: "",
    profilePicture: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (profileData) {
      setFormData({
        name: profileData.name,
        email: profileData.email,
        bio: profileData.profile.bio,
        age: profileData.profile.age,
        profilePicture: profileData.profile.profilePicture,
      });
    }
  }, [profileData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let profilePictureUrl = formData.profilePicture;
    if (imageFile) {
      try {
        profilePictureUrl = await uploadImage(imageFile);
      } catch (error: any) {
        console.error("Failed to upload image:", error);
        alert(`Failed to upload image: ${error.message}`);
        return;
      }
    }

    try {
      await updateProfile({
        ...formData,
        profilePicture: profilePictureUrl,
      }).unwrap();
      alert("Profile updated successfully!");
    } catch (error: any) {
      console.error("Failed to update profile:", error);
      alert(`Failed to update profile: ${error.message}`);
    }
  };

  return {
    formData,
    handleChange,
    handleImageChange,
    handleSubmit,
    isProfileLoading,
    isUpdating,
  };
};

const uploadImage = async (imageFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API}`,
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

export default useProfile;
