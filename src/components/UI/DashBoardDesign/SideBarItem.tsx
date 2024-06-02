import { DrawerItem } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

type IProps = {
  item: DrawerItem;
};

export default function SideBarItem({ item }: IProps) {
  const linkPath = `/dashboard/${item.path}`;
  const pathname = usePathname();
  const isActive = pathname === linkPath;

  return (
    <Link
      href={linkPath}
      className={`text-gray-700 ${isActive ? " border border-r-2 active" : ""}`}
    >
      {item.title}
    </Link>
  );
}
