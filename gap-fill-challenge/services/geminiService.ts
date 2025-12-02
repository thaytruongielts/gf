import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY;
// Initialize the client conditionally to avoid errors during build if key is missing, 
// though standard practice assumes it's there.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getHintForBlank = async (
  sentenceContext: string,
  blankNumber: number,
  firstLetter: string
): Promise<string> => {
  if (!ai) {
    return "AI service is currently unavailable. Please check your API configuration.";
  }

  try {
    const model = ai.models;
    const prompt = `
      I am an English student (CEFR Level A2/B1). I am stuck on a fill-in-the-blank exercise.
      
      The context sentence is: "...${sentenceContext}..."
      The blank is number ${blankNumber}.
      The correct answer starts with the letter "${firstLetter}".
      
      Please provide a simple, helpful hint to help me guess the word. 
      - Do NOT say the word.
      - Use simple English.
      - Define the word or give a synonym.
      - Keep it under 20 words.
    `;

    const response = await model.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error fetching hint:", error);
    return "Could not retrieve a hint at this time.";
  }
};
