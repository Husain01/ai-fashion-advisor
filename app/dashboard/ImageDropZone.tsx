"use client";

import React, { FormEvent, useState } from "react";
import { SingleImageDropzone } from "../components/single-image-dropzone";
import { useEdgeStore } from "@/lib/edgestore";

const ImageDropZone = () => {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const [response, setResponse] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      console.error("No file selected");
      return;
    }
    setSubmitted(true);
    const res = await edgestore.myPublicImages.upload({
      file,
      onProgressChange: (progress) => {
        // you can use this to show a progress bar
        console.log(progress);
      },
    });
    // prepare and submit our form
    fetch("/api/classify", {
      method: "POST",
      body: JSON.stringify({ url: res.url }),
    }).then(async(res) => {
       const data = await res.json()
       setResponse(data[0])
      console.log(data)
      // create a stream from the response
      // const reader = res.body?.getReader();
      // let accumulatedResponse = ""; // Accumulate the entire response

      // let decodedResponse = ""; // Accumulate decoded chunks into a single string
      // let partialWord = ""; // Accumulate partial words across chunks
      // return new ReadableStream({
      //   start(controller) {
      //     return pump();
      //     //           function pump(): any {
      //     //             return reader?.read().then(({ done, value }) => {
      //     //               if (done) {
      //     //                 controller.close();
      //     //                 if (partialWord !== '') {
      //     //                   accumulatedResponse += partialWord; // Append any remaining partial word
      //     //                   setResponse(accumulatedResponse.trim()); // Update the final response
      //     //                 }
      //     //                 return;
      //     //               }

      //     //               controller.enqueue(value);
      //     // console.log(value)
      //     //               const decoded = new TextDecoder("utf-8").decode(value);
      //     // console.log(decoded)
      //     //               // Filter out indices and newline characters
      //     //               const filteredText = decoded
      //     //                 .replace(/\d+:/g, '') // Remove indices
      //     //                 .replace(/"/g, '') // Remove apostrophes
      //     //                 .replace(/\n/g, ' ') // Replace newlines with spaces
      //     //                 .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      //     //                 // .trim(); // Trim leading/trailing spaces
      //     // console.log(filteredText)
      //     //               const words = filteredText.split(' ');
      //     // console.log(words)
      //     //               // If there's a partial word from the previous chunk, prepend it to the first word
      //     //               if (partialWord !== '') {
      //     //                 words[0] = partialWord + words[0];
      //     //                 partialWord = ''; // Reset partial word
      //     //               }

      //     //               // If the last character is not a space, it means the last word is partial
      //     //               if (decoded[decoded.length - 1] !== ' ') {
      //     //                 partialWord = words.pop() || ''; // Remove and store the last word
      //     //               }

      //     //               // Join the words and append to the accumulated response
      //     //               const newText = words.join(' ');
      //     //               accumulatedResponse += ` ${newText}`.replace(/ +/g, ' '); // Ensuring single spaces
      //     //               setResponse(accumulatedResponse.trim());

      //     //               return pump();
      //     //             });
      //     //           }
      //     function pump(): any {
      //       return reader?.read().then(({ done, value }) => {
      //         // no more data - exit our loop
      //         if (done) {
      //           controller.close();
      //           return;
      //         }
          
      //         controller.enqueue(value);
          
      //         // Decode the current chunk
      //         const decoded = new TextDecoder("utf-8").decode(value);
          
      //         // Remove indices and format the text
      //         const cleanedText = decoded
      //           .replace(/\d+:?/g, '') // Remove indices and optional colon
      //           .replace(/\n/g, ' ') // Replace new lines with spaces
      //           .replace(/\s+/g, ' ') // Replace multiple spaces with a single space
      //           .trim(); // Trim leading/trailing spaces
          
      //         // Append the cleaned text to the response
      //         setResponse((prev) => `${prev}${cleanedText}`);
          
      //         return pump();
      //       });
      //     }
          
          
          
      //   },
      // });
    });
  };
  console.log(response);
  return (
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
      <p className="py-8 text-white w-[400px] h-fit">
        {submitted && !response ? "Contacting Style Sensei..." : response}
      </p>
    </section>
  );
};

export default ImageDropZone;
