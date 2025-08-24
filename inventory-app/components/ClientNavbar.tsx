"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function ClientNavbar() {
  const pathname = usePathname();
  const hideNavbar = pathname === "/login" || pathname === "/register";

  if (hideNavbar) return null;

  return <Navbar />;
}
