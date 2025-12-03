import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const gemini = async (prompt: string): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // Extract generated text
    const text = response.text || null;

    return text;
  } catch (error) {
    console.error("Error in gemini:", error);
    return null;
  }
};
