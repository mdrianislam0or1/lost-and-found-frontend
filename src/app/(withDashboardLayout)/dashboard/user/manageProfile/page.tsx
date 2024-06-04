"use client";
import Loading from "@/components/UI/StyleComponent/Loading";
import { useGetMyProfileQuery } from "@/redux/api/profileApi";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  const { data, error, isLoading } = useGetMyProfileQuery({});

  if (isLoading) {
    return (
      <div>
        {" "}
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error loading profile data</div>;
  }

  const profile = data;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <div className="flex items-center mb-6">
          <Image
            width={40}
            height={40}
            src={profile?.profile?.profilePicture || ""}
            alt="Profile Picture"
            className="h-24 w-24 rounded-full object-cover border-2 border-gray-300"
          />
          <div className="ml-6">
            <h2 className="text-3xl font-bold text-gray-800">
              {profile?.name}
            </h2>
            <p className="text-gray-600">{profile?.email}</p>
            <p className="text-sm text-gray-500">Role: {profile?.role}</p>
            <p className="text-sm text-gray-500">Status: {profile?.status}</p>
          </div>
        </div>
        <div className="text-gray-700 space-y-2">
          <p>
            <span className="font-semibold">Bio:</span> {profile?.profile?.bio}
          </p>
          <p>
            <span className="font-semibold">Age:</span> {profile?.profile?.age}
          </p>
          <p>
            <span className="font-semibold">Member Since:</span>{" "}
            {new Date(profile?.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="text-center mt-6">
          <Link href="/editProfile">
            <button className="bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg shadow hover:bg-indigo-700 transition duration-300">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>

      <div className="text-center">
        <Link href="/myClaim">
          <button className="bg-black text-white font-bold py-2 px-4 rounded mt-4">
            View all my Claim Item
          </button>
        </Link>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">My Lost Requests</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profile?.lostItems?.map((item: any) => (
            <div key={item.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <Image
                src={item.images[0]}
                alt={item.lostItemName}
                width={200}
                height={200}
                className="h-40 w-full object-cover rounded mb-4"
              />
              <h4 className="text-lg font-bold mb-2">{item.lostItemName}</h4>
              <p className="text-sm                text-gray-500">
                {item.description}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Location: {item.location}
              </p>
              <p className="text-sm text-gray-500 mt-2">Contact Info:</p>
              <p className="text-sm text-gray-500">
                Email: {item.contactInfo.email}
              </p>
              <p className="text-sm text-gray-500">
                Phone: {item.contactInfo.phone}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Status: {item.isFound ? "Found" : "Not Found"}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/myLostItem">
            <button className="bg-black text-white font-bold py-2 px-4 rounded mt-4">
              View all my Lost Item
            </button>
          </Link>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">My Claims</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {profile?.claims?.map((claim: any) => (
            <div
              key={claim.id}
              className="bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <h4 className="text-lg font-bold mb-2">Claim ID: {claim.id}</h4>
              <p className="text-sm text-gray-500 mt-2">
                Status: {claim.status}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Distinguishing Features: {claim.distinguishingFeatures}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Lost Date: {new Date(claim.lostDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Proof of Purchase: {claim.proofOfPurchase}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Detailed Loss Account: {claim.detailedLossAccount}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Matching Accessories: {claim.matchingAccessories}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Security Features: {claim.securityFeatures}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Third Party Confirmation: {claim.thirdPartyConfirmation}
              </p>
              <div className="mt-2">
                <p className="text-sm text-gray-500">Photos:</p>
                {claim.photos.map((photo: any, index: number) => (
                  <Image
                    width={200}
                    height={200}
                    key={index}
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="h-20 w-20 object-cover rounded mb-2"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Ownership Docs: {claim.ownershipDocs}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
