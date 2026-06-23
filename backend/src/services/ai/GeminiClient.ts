import { GoogleGenAI } from "@google/genai";
import { ENV } from "../../config/env";
import { IAiClient } from "../../interface/ai/IAiClient";

export default class GeminiClient
implements IAiClient {

  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: ENV.GEMINI_API_KEY,
    });
  }

  async generate(prompt: string) {
    const response =
      await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

    return response.text
      ?.replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
  }
}