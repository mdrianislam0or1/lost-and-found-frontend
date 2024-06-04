"use client";
import Error from "@/components/UI/StyleComponent/Error";
import Loading from "@/components/UI/StyleComponent/Loading";
import { useGetMyClaimQuery } from "@/redux/api/claimApi";
import Image from "next/image";
import { FC } from "react";

const MyClaim: FC = () => {
  const { data, error, isLoading } = useGetMyClaimQuery({});

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error)
    return (
      <div>
        <Error />
      </div>
    );

  const claims = data || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Claims</h1>
      {claims.length === 0 ? (
        <div>No claims found.</div>
      ) : (
        claims.map((claim: any) => (
          <div
            key={claim.id}
            className="bg-white p-4 rounded-lg shadow-md mb-4"
          >
            <h2 className="text-xl font-semibold">Claim ID: {claim.id}</h2>
            <p>
              <strong>Status:</strong> {claim.status}
            </p>
            <p>
              <strong>Distinguishing Features:</strong>{" "}
              {claim.distinguishingFeatures}
            </p>
            <p>
              <strong>Lost Date:</strong>{" "}
              {new Date(claim.lostDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Proof of Purchase:</strong> {claim.proofOfPurchase}
            </p>
            <p>
              <strong>Detailed Loss Account:</strong>{" "}
              {claim.detailedLossAccount}
            </p>
            <p>
              <strong>Matching Accessories:</strong> {claim.matchingAccessories}
            </p>
            <p>
              <strong>Security Features:</strong> {claim.securityFeatures}
            </p>
            <p>
              <strong>Third Party Confirmation:</strong>{" "}
              {claim.thirdPartyConfirmation}
            </p>
            <div className="mt-2">
              <strong>Photos:</strong>
              <div className="flex space-x-2">
                {claim.photos.map((photo: any, index: any) => (
                  <Image
                    key={index}
                    src={photo}
                    alt={`Claim photo ${index + 1}`}
                    width={100}
                    height={100}
                    className="rounded"
                  />
                ))}
              </div>
            </div>
            <div className="mt-2">
              <strong>Found Item Details:</strong>
              <div className="bg-gray-100 p-2 rounded-lg mt-2">
                <p>
                  <strong>Found Item Name:</strong>{" "}
                  {claim.foundItem.foundItemName}
                </p>
                <p>
                  <strong>Description:</strong> {claim.foundItem.description}
                </p>
                <p>
                  <strong>Location:</strong> {claim.foundItem.location}
                </p>
                <p>
                  <strong>Date Found:</strong>{" "}
                  {new Date(claim.foundItem.dateFound).toLocaleDateString()}
                </p>
                <p>
                  <strong>Contact Info:</strong> Email:{" "}
                  {claim.foundItem.contactInfo.email}, Phone:{" "}
                  {claim.foundItem.contactInfo.phone}
                </p>
                <div className="mt-2">
                  <strong>Images:</strong>
                  <div className="flex space-x-2">
                    {claim.foundItem.images.map((image: any, index: any) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Found item image ${index + 1}`}
                        width={100}
                        height={100}
                        className="rounded"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyClaim;
