import Link from "next/link";
import { NavbarUser } from "../components/navbar-user";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}
function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );
    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(currentUser);
    }
  }, []);

  if (!user) return null; // avoid flicker

  const data = {
    user: {
      name: user.name,
      email: user.email,
      avatar: "https://github.com/evilrabbit.png",
    },
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between  rounded-lg px-4 ">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold">Inventory App</h1>
          <div className="hidden md:flex space-x-4">
            
            <Link
              href="/dashboard"
              className="hover:bg-white/20 transition-colors rounded px-2 py-1 hover:shadow"
            >
              Dashboard
            </Link>
            <Link
              href="/products"
              className="hover:bg-white/20 transition-colors rounded px-2 py-1 hover:shadow"
            >
              Products
            </Link>
            <Link
              href="/inventory"
              className="hover:bg-white/20 transition-colors rounded px-2 py-1 hover:shadow"
            >
              Inventory
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          <NavbarUser user={data.user} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
