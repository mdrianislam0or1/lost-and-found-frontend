import { USER_ROLE } from "@/constants/role";
import { DrawerItem, UserRole } from "@/types";

export const drawerItems = (role: UserRole): DrawerItem[] => {
  const roleMenu: DrawerItem[] = [];
  switch (role) {
    case USER_ROLE.ADMIN:
      roleMenu.push(
        {
          title: "Dashboard",
          path: `${role}`,
        },
        {
          title: "Manage User",
          path: `${role}/manage-users`,
        },
        {
          title: "Create FoundItem Category",
          path: `${role}/createCategory`,
        },
        {
          title: "Create LostItem Category",
          path: `${role}/createLostItemCategory`,
        },
        {
          title: "Get Category",
          path: `${role}/getAllCategory`,
        },
        {
          title: "Manage Active User",
          path: `${role}/manage-users`,
        },
        {
          title: "Submit Found-Item",
          path: `${role}/foundItem`,
        },
        {
          title: "Submit Lost-Item",
          path: `${role}/lostItem`,
        },
        {
          title: "GetAllClaim",
          path: `${role}/getAllClaim`,
        }
      );
      break;

    case USER_ROLE.USER:
      roleMenu.push(
        {
          title: "Dashboard",
          path: `${role}`,
        },
        {
          title: "Manage Profile",
          path: `${role}/manage-profile`,
        }
      );
      break;
  }
  return [...roleMenu];
};
