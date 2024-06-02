"use client";

import Navbar from "@/app/components/navbar";
import { SignInButton } from "@clerk/nextjs";

const Landing = () => {
  return (
    <main className="relative">
      <Navbar />
      <section>
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold">Style Sensei</h1>
            <p className="text-lg">Your personal stylist</p>
            <span className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
              <SignInButton />
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Landing;
