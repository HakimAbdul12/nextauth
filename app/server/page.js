import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
export default async function Dashbord() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/server");
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white h-screen">
      <header className="bg-blue-600 dark:bg-blue-800 text-white p-4">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </header>

      <main className="container mx-auto p-4">
        <div className="py-8">
          <h2 className="text-2xl font-semibold mb-4 shadow-lg p-5 rounded-full dark:bg-gray-900">
            Welcome <span className="clip">
                {
                  session ? (<>{session.user.name}</>):null
                }
            </span>
          </h2>
        </div>
      </main>
    </div>
  );
}
