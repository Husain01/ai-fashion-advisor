"use client";

import { useChat } from "ai/react";
import { SingleImageDropzone } from "../components/single-image-dropzone";
import { ChangeEvent, useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";

// Force the page to be dynamic and allow streaming responses up to 30 seconds
export const dynamic = "force-dynamic";

const TempImageDropZone = () => {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
    handleInputChange(e)
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setIsLoading(true);
    if (file) {
      const res = await edgestore.myPublicImages.upload({
        file,
        onProgressChange: (progress) => {
          console.log(progress);
        },
      });
      console.log(e)
      console.log(res.url)
      handleSubmit(e, {
        data: { imageUrl: res.url },
      });
    } else {
      console.error("No file selected");
    }
    // setIsLoading(false);
  };

  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <section className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4 text-white">Fashion Advisor</h1>
      <form
        onSubmit={handleUpload}
      >
        <SingleImageDropzone
          width={200}
          height={200}
          value={file}
          // onChange={(file) => {
          //   setFile(file)
          // }}
          onChange={handleFileChange}
        />
       {/* <input
       type="file"
          value={input}
          placeholder="What does the image show..."
          onChange={handleInputChange}
        /> */}
        <button type="submit"
          className="bg-white p-4 py-2 rounded-md">Upload</button>
      </form>
{console.log(messages)}
      {messages.map((m) => (
        <div key={m.id}>
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}
    </section>
  );
};

export default TempImageDropZone;
