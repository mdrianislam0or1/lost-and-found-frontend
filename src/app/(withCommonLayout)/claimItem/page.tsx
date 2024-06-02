"use client";

import React, { useState } from "react";

import axios from "axios";
import { useSubmitClaimMutation } from "@/redux/api/claimApi";
import { useGetAllFoundItemQuery } from "@/redux/api/foundItemApi";

export default function ClaimItem() {
  const { data, error, isLoading } = useGetAllFoundItemQuery({});
  const [submitClaim] = useSubmitClaimMutation();

  const [claimData, setClaimData] = useState({
    foundItemId: "",
    distinguishingFeatures: "",
    lostDate: "",
    proofOfPurchase: "",
    photos: [],
    ownershipDocs: "",
    detailedLossAccount: "",
    matchingAccessories: "",
    securityFeatures: "",
    thirdPartyConfirmation: "",
  });

  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.FormEvent) => {
    const { name, value } = e.target as any;
    setClaimData({ ...claimData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotoFiles(Array.from(e.target.files));
    }
  };
  const handleImageUpload = async () => {
    setUploading(true);
    const uploadedPhotos = [];
    for (const file of photoFiles) {
      const formData = new FormData();
      formData.append("image", file);
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API}`,
        formData
      );
      uploadedPhotos.push(response.data.data.url);
    }
    setUploading(false);
    return uploadedPhotos;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const uploadedPhotos = await handleImageUpload();
    const finalClaimData = { ...claimData, photos: uploadedPhotos };
    submitClaim(finalClaimData).then((response) => {
      if (response.data.success) {
        alert("Claim created successfully");
      } else {
        alert("Failed to create claim");
      }
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading found items</div>;
  }

  const foundItems = data?.data;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h3 className="text-xl font-bold mb-4">Claim Found Item</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="foundItemId"
            className="block text-sm font-medium text-gray-700"
          >
            Found Item
          </label>
          <select
            id="foundItemId"
            name="foundItemId"
            value={claimData.foundItemId}
            onChange={handleChange}
            required
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a found item</option>
            {foundItems?.map((item: any) => (
              <option key={item.id} value={item.id}>
                {item.foundItemName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="distinguishingFeatures"
            className="block text-sm font-medium text-gray-700"
          >
            Distinguishing Features
          </label>
          <input
            type="text"
            id="distinguishingFeatures"
            name="distinguishingFeatures"
            value={claimData.distinguishingFeatures}
            onChange={handleChange}
            required
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="lostDate"
            className="block text-sm font-medium text-gray-700"
          >
            Lost Date
          </label>
          <input
            type="date"
            id="lostDate"
            name="lostDate"
            value={claimData.lostDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="proofOfPurchase"
            className="block text-sm font-medium text-gray-700"
          >
            Proof of Purchase
          </label>
          <input
            type="text"
            id="proofOfPurchase"
            name="proofOfPurchase"
            value={claimData.proofOfPurchase}
            onChange={handleChange}
            required
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="photos"
            className="block text-sm font-medium text-gray-700"
          >
            Photos
          </label>
          <input
            type="file"
            id="photos"
            name="photos"
            multiple
            onChange={handleFileChange}
            required
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="ownershipDocs"
            className="block text-sm font-medium text-gray-700"
          >
            Ownership Documents
          </label>
          <input
            type="text"
            id="ownershipDocs"
            name="ownershipDocs"
            value={claimData.ownershipDocs}
            onChange={handleChange}
            required
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="detailedLossAccount"
            className="block text-sm font-medium text-gray-700"
          >
            Detailed Loss Account
          </label>
          <textarea
            id="detailedLossAccount"
            name="detailedLossAccount"
            value={claimData.detailedLossAccount}
            onChange={handleChange}
            required
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="matchingAccessories"
            className="block text-sm font-medium text-gray-700"
          >
            Matching Accessories
          </label>
          <input
            type="text"
            id="matchingAccessories"
            name="matchingAccessories"
            value={claimData.matchingAccessories}
            onChange={handleChange}
            required
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="securityFeatures"
            className="block text-sm font-medium text-gray-700"
          >
            Security Features
          </label>
          <input
            type="text"
            id="securityFeatures"
            name="securityFeatures"
            value={claimData.securityFeatures}
            onChange={handleChange}
            required
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="thirdPartyConfirmation"
            className="block text-sm font-medium text-gray-700"
          >
            Third Party Confirmation
          </label>
          <input
            type="text"
            id="thirdPartyConfirmation"
            name="thirdPartyConfirmation"
            value={claimData.thirdPartyConfirmation}
            onChange={handleChange}
            required
            className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={uploading}
            className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {uploading ? "Uploading..." : "Submit Claim"}
          </button>
        </div>
      </form>
    </div>
  );
}
