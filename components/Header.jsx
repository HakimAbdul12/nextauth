import React from "react";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
  const session = await getServerSession(options);
  return (
    <div className="container mx-auto">
      <header className="bg-blue-600 dark:bg-blue-800 text-white p-4 flex justify-between items-center fixed top-0 left-0 w-full">
        <h1 className="text-3xl font-semibold">Header</h1>
        <div>
          <ul className="flex justify-between gap-4 text-xl">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>
              <Link href={"/client"}>Client</Link>
            </li>
            <li>
              <Link href={"/aboutus"}>About</Link>
            </li>
            {session && (
              <li>
                <Link href={"/dashboard"}>Dashboard</Link>
              </li>
            )}
            <li className="text-[#ff55008f]">
              <Link href={"/api/auth/signout"}>Logout</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          {session ? (
            <img
              className="w-10 h-10 rounded-full mr-2"
              src={session.user?.image}
              alt="Profile"
            />
          ) : (
            <button><Link href={'/api/auth/signin'}>Login</Link></button>
          )}
        </div>
      </header>
    </div>
  );
}
