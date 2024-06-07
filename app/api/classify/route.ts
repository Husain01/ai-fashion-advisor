import { classifyImage } from "@/lib/image-classifier";
import { StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { url } = await req.json();
console.log(url)
  if (!url) {
    NextResponse.json({ message: "No image url being sent" }, { status: 400 });
  }

  //call our classify function and stream to the client

  // const response = await streamText({
  //     model: openai("gpt-4o"),
  //     messages: [
  //         {
  //             role: "user",
  //             content: [
  //                 {
  //                     type: "text",
  //                     text: "Check the image if it has clothes. Then check if it's an outfit picture. You are a fashion expert, give suggestions based on the outfit and how can you enhance it, or either pair it with other clothing items, accessories, etc.",
  //                 },
  //                 {
  //                     type: "image",
  //                     image: url
  //                 },
  //             ],
  //         },
  //     ],
  //     maxTokens: 400,

  // })

  // return response.toAIStreamResponse();

  const response = await classifyImage(url);
  console.log(response)
  return NextResponse.json(response);


  // classifyImage(res.url).then((res) => {
  //     setSuggestions(res);
  //   }
  //   );
}
