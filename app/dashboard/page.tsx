'use client'

import { useState } from "react";
import Navbar from "@/app/components/navbar";

export default function Dashboard() {
  const [file, setFile] = useState<File>();

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>()

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch("/api/getFashionSuggestions", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions);
      } else {
        console.error("Failed to get suggestions");
      }
    } catch (error) {
      console.error("Error submitting image", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative">
      <Navbar />
      <section className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Fashion Advisor</h1>
        <div>
      
    </div>
        {suggestions.length > 0 && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-2">Suggestions:</h2>
            <ul className="list-disc pl-5">
              {suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </main>
  );
}
