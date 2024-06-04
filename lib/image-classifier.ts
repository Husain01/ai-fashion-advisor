import { OpenAI } from "openai";

import { OpenAIStream } from "ai";



// create a new OpenAI client using our key from earlier

const openAi = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const classifyImage = async(url:string)=> {
    // create an OpenAI request with a prompt

  const completion = await openAi.chat.completions.create({

    model: "gpt-4o",

    messages: [

      {

        role: "user",

        content: [

          {

            type: "text",

            text: "Check the image if it has clothes. Then check if it's an outfit picture. You are a fashion expert, give suggestions based on the outfit and how can you enhance it, or either pair it with other clothing items, accessories, etc. Keep it short and crisp.",

          },

          {

            type: "image_url",

            image_url: {

              url: url,

            },

          },

        ],

      },

    ],

    stream: true,

    max_tokens: 400,

    // stream the response

});
return OpenAIStream(completion);
}