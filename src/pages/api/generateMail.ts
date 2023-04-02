// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PostgrestError } from '@supabase/supabase-js';
import { NextApiRequest, NextApiResponse } from 'next';

/* // generate email using openai
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration); */

function buildStockString(stock : any) {
  let stockString = "";
  for (const item in stock) {
    stockString += "\t" + stock[item] + " " + item.split("-")[1] + "\n";
  }
  return stockString;
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = JSON.parse(req.body);

/*     const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Write an Email asking a Provider for a budget to buy from them this products with this stock:\\n${body}\\nTo enumerate the products with them corresponding amounts, describe each product using a list and a sentence like for example \"21 Chupetines\". Be careful with plural forms. Only include the body, without subject, and sign it as My Company. Limit it to the products that I told you, dont include other products.\n`,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    }); */

    let mail = `Dear Provider:

We are writing to inquire about budget to purchase the following products from you: 

REPLACE

We look forward to hearing from you soon.

Sincerely, 
My Company`;

    let text = buildStockString(body.stock);

    mail = mail.replace("REPLACE", text);

    return res.status(200).json({ message: 'Success', mail: mail });
    
  } catch (error) {
    res.status(500).json({ error: 'Error while adding budget request' });
  }
}