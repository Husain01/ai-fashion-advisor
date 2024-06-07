"use client";

import React, {  useState } from "react";
import Navbar from "@/app/components/navbar";
import ImageDropZone from "./ImageDropZone";
import TempImageDropZone from "./TempImageDropZone";

export default function Dashboard() {

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);



  return (
    <main className="relative bg-gray-800">
      <Navbar />
      <ImageDropZone/>
      {/* <TempImageDropZone/> */}
    </main>
  );
}
