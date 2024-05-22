import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
export default async function Dashbord() {
  const session = await getServerSession(options);
  const seesionDataInStringFormat = JSON.stringify(session);
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
          <p className="text-lg leading-relaxed">
            Welcome to your personalized dashboard! Here, you can manage your
            tasks, track your progress, and stay updated with the latest
            information. Take control of your workflow and make the most out of
            your day.
          </p>
        </div>

        <div className="py-8">
          <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
          <ul className="divide-y divide-gray-300 dark:divide-gray-700">
            <li className="py-4">
              <p className="text-lg">Logged in at 12:00 PM</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                by John Doe
              </p>
            </li>
            <li className="py-4">
              <p className="text-lg">Updated profile information</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                by Jane Smith
              </p>
            </li>
            <li className="py-4">
              <p className="text-lg">Added new project</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                by Alice Johnson
              </p>
            </li>
            <li className="py-4">
              <p className="text-lg">This is your session data</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {seesionDataInStringFormat}
              </p>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
