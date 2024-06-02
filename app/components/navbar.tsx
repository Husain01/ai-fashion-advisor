'use client'
import React from "react";
import { SignInButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";


const Navbar = () => {
  const { userId } = useAuth();

  return (
    <nav className="flex bg-gray-700 h-20 items-center justify-between px-10 absolute top-0 w-full">
      <div>
        <p className="text-white text-lg ">Style Sensei</p>
      </div>

      {userId ? (
        <UserButton />
      ) : (
        <span className="p-4 py-2 bg-white rounded-md">
          <SignInButton />
        </span>
      )}
    </nav>
  );
};

export default Navbar;
