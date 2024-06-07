import { NextResponse } from "next/server";
import { generateText, streamText } from "ai";
import { openai } from "@ai-sdk/openai";
export const dynamic = 'force-dynamic';



export async function POST(req: Request){
    const { url } = await req.json();
    console.log(url)
    if (!url) {
        NextResponse.json({ message: "No image url being sent" }, { status: 400 });
    }

    // const {text} = await generateText({
    const result = await streamText({
        model: openai("gpt-4o"),
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: "Check the image if it has clothes. Then check if it's an outfit picture. You are a fashion expert, give suggestions based on the outfit and how can you enhance it, or either pair it with other clothing items, accessories, etc.",
                    },
                    {
                        type: "image",
                        image: url
                    },
                ],
            },
        ],
        maxTokens: 100,
    })
    
    // return text
    return result.toAIStreamResponse()
}