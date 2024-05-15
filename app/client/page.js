"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function Client() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callback=/client");
    },
  });
  return (
    <>
      <h1 className="text-5xl dark:text-gray-800 pt-[200px]">
        Hello this is the client
      </h1>
      <img
        className="w-10 h-10 rounded-full mr-2"
        src={session?.user.image}
        alt="Profile"
      />
    </>
  );
}
