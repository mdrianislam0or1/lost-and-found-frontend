/* eslint-disable jsx-a11y/alt-text */
"use client";
import {
  useDeleteClaimItemMutation,
  useGetAllClaimQuery,
  useUpdateClaimStatusMutation,
} from "@/redux/api/claimApi";
import Image from "next/image";
import React from "react";

export default function GetAllClaim() {
  const { data, error, isLoading } = useGetAllClaimQuery({});
  const [updateClaimStatus] = useUpdateClaimStatusMutation();

  const [deleteClaimItem] = useDeleteClaimItemMutation();
  const handleUpdateStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "APPROVED" ? "PENDING" : "APPROVED";
    try {
      const response = await updateClaimStatus({
        id,
        status: newStatus,
      }).unwrap();
      alert("Update the Status");
    } catch (error) {
      alert("Failed to update claim status");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>An error occurred</p>;

  const handleDelete = async (id: string) => {
    console.log("Deleting item with ID:", id);
    try {
      const result = await deleteClaimItem(id).unwrap();
      if (result?.error) {
        throw new Error(result.error);
        alert("something wrong");
      }
      if (result === "undefined") {
        alert("something wrong");
      }
      console.log("Delete result:", result);
    } catch (err) {
      console.error("Failed to delete item:", err);
      alert("Failed to delete item.");
    }
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Claims</h1>
      <div className="overflow-hidden">
        <table className="min-w-full bg-white border text-sm">
          <thead className="bg-gray-200">
            <tr>
              {[
                "ID",
                // "User ID",

                "Status",
                "Distinguishing Features",
                // "Lost Date",
                "Proof of Purchase",
                "Photos",
                "Ownership Docs",
                "Detailed Loss Account",
                "Matching Accessories",
                "Security Features",
                "Actions",
                "Delete From *",
              ].map((heading) => (
                <th key={heading} className="py-3 px-4 border">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((claim: any, index: number) => (
              <tr
                key={claim.id}
                className={index % 2 === 0 ? "bg-gray-100" : ""}
              >
                <td className="py-3 px-4 border">{claim.id}</td>
                {/* <td className="py-3 px-4 border">{claim.userId}</td> */}
                {/* <td className="py-3 px-4 border">{claim.foundItemId}</td>
                <td className="py-3 px-4 border">
                  {claim.lostItemId || "N/A"}
                </td> */}
                <td className="py-3 px-4 border">{claim.status}</td>
                <td className="py-3 px-4 border">
                  {claim.distinguishingFeatures}
                </td>
                {/* <td className="py-3 px-4 border">
                  {new Date(claim.lostDate).toLocaleDateString()}
                </td> */}
                <td className="py-3 px-4 border">{claim.proofOfPurchase}</td>
                <td className="py-3 px-4 border">
                  {claim.photos.map((photo: any, index: number) => (
                    <a
                      key={index}
                      href={photo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Image
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        height={50}
                        width={50}
                        className="object-cover"
                      />
                    </a>
                  ))}
                </td>
                <td className="py-3 px-4 border">{claim.ownershipDocs}</td>
                <td className="py-3 px-4 border">
                  {claim.detailedLossAccount}
                </td>
                <td className="py-3 px-4 border">
                  {claim.matchingAccessories}
                </td>
                <td className="py-3 px-4 border">{claim.securityFeatures}</td>

                <td className="py-3 px-4 border">
                  <button
                    onClick={() => handleUpdateStatus(claim.id, claim.status)}
                    className={`px-2 py-1 rounded ${
                      claim.status === "APPROVED"
                        ? "bg-yellow-500 text-white"
                        : "bg-purple-500 text-white"
                    }`}
                  >
                    {claim.status === "APPROVED" ? "Pending" : "Approve"}
                  </button>
                </td>
                <td className="py-3 px-4 border">
                  <button onClick={() => handleDelete(claim.id)}>
                    Delete *
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
