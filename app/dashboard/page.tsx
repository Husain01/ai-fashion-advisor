"use client";

import React, { FormEvent, useState } from "react";
import Navbar from "@/app/components/navbar";
import { SingleImageDropzone } from "../components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { classifyImage } from "@/lib/image-classifier";

export default function Dashboard() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      console.error("No file selected");
      return;
    }
    setSubmitted(true);
    const res = await edgestore.myPublicImages.upload({file,
      onProgressChange: (progress) => {
        // you can use this to show a progress bar
        console.log(progress);
      },
    });
    // prepare and submit our form
    fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ url: res.url }),
    }).then((res) => {
      // create a stream from the response
      const reader = res.body?.getReader();
      return new ReadableStream({
        start(controller) {
          return pump();
          function pump(): any {
            return reader?.read().then(({ done, value }) => {
              // no more data - exit our loop
              if (done) {
                controller.close();
                return;
              }
              controller.enqueue(value);
              // decode the current chunk and append to our response value
              const decoded = new TextDecoder("utf-8").decode(value);
// If the response is an array, join all elements into a single string
if (Array.isArray(decoded)) {
  setResponse((prev) => prev + decoded.join(''));
} else {
  setResponse((prev) => prev + decoded);
}              return pump();
            });
          }
        },
      });
    });
  };
console.log(response)
  return (
    <main className="relative bg-gray-800">
      <Navbar />
      <section className="h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-white">Fashion Advisor</h1>
        <form onSubmit={onSubmit}>
          <div>
            <SingleImageDropzone
              width={200}
              height={200}
              value={file}
              onChange={(file) => {
                setFile(file);
              }}
            />
            <button
              type="submit"
              className="bg-white p-4 py-2 rounded-md"
              // onClick={async () => {
              //   if (file) {
              //     const res = await edgestore.myPublicImages.upload({
              //       file,
              //       onProgressChange: (progress) => {
              //         // you can use this to show a progress bar
              //         console.log(progress);
              //       },
              //     });

              //     //TODO: Add the call to save the url
              //     // you can run some server action or api here
              //     // to add the necessary data to your database
              //     console.log(res);
              //     const response = await fetch("/api/classify", {
              //       method: "POST",
              //       body: JSON.stringify({ url: res.url }),
              //     })
              //     const data = await response.json()
              //   }
              // }}
            >
              Upload
            </button>
          </div>
        </form>
        <p className="py-8 text-white w-[200px]">
        {submitted && !response ? "Contacting Style Sensei..." : response}
  </p>
      </section>
    </main>
  );
}
