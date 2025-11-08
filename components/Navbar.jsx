"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white text-gray-800 px-6 py-3 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">MySite</h1>
      <ul className="flex space-x-6">
        <li>
          <Link
            href="/posts"
            className={`hover:text-blue-500 transition-colors ${
              pathname === "/posts" ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Posts
          </Link>
        </li>
        <li>
          <Link
            href="/upload"
            className={`hover:text-blue-500 transition-colors ${
              pathname === "/upload" ? "text-blue-600 font-semibold" : ""
            }`}
          >
            Upload
          </Link>
        </li>
      </ul>
    </nav>
  );
}
