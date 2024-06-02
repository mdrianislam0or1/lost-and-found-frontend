import { getUserInfo, removeUser } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const AuthButton = () => {
  const userInfo = getUserInfo();
  const router = useRouter();

  const handleLogout = () => {
    removeUser();
    router.refresh();
  };
  return (
    <>
      {userInfo?.email ? (
        <>
          <button
            onClick={handleLogout}
            className="bg-gray-300 text-black px-3 py-2 rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button className="bg-gray-300 text-black px-3 py-2 rounded-md text-sm font-medium">
            Sign in
          </button>
        </>
      )}
    </>
  );
};

export default AuthButton;
