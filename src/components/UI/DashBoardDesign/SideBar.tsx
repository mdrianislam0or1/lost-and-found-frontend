"use client";
import { UserRole } from "@/types";
import { drawerItems } from "@/utils/drawerItems";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import SideBarItem from "./SideBarItem";
import { getUserInfo } from "@/services/auth.service";

export default function SideBar() {
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const { role } = getUserInfo() as any;
    setUserRole(role);
  }, []);
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          <Link href="/">Logo</Link>
        </h1>
      </div>
      <nav>
        <ul>
          {drawerItems(userRole as UserRole).map((item, index) => (
            <li key={index} className="mb-4">
              <SideBarItem key={index} item={item} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
