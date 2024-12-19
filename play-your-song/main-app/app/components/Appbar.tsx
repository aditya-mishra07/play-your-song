"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar() {
  const session = useSession();
  return (
    <div>
      <div className=" flex justify-between">
        <div>Play Your Song</div>
        <div>
          {!session.data?.user ? (
            <button
              className=" p-2 bg-blue-500 rounded-sm"
              onClick={() => signIn()}
            >
              Login
            </button>
          ) : (
            <button
              className=" p-2 bg-blue-500 rounded-sm"
              onClick={() => signOut()}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
