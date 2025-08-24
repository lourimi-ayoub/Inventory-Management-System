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

  const [menuOpen, setMenuOpen] = useState(false);
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
      <div className="flex flex-col md:flex-row items-center justify-between rounded-lg px-2 md:px-4">
        <div className="flex w-full md:w-auto items-center justify-between md:justify-start space-x-2 md:space-x-6">
          <h1 className="text-xl font-bold whitespace-nowrap">Inventory App</h1>
          {/* Hamburger only on mobile */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {/* Desktop nav links left, NavbarUser right */}
        <div className="hidden md:flex w-full items-center justify-between">
          <div className="flex flex-row space-x-4">
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
          <div className="flex items-center">
            <NavbarUser user={data.user} />
          </div>
        </div>
        {/* Mobile nav menu */}
        {menuOpen && (
          <div className="md:hidden w-full flex flex-col space-y-2 mt-2 bg-gray-900 rounded-lg p-4">
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
            <NavbarUser user={data.user} />
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

