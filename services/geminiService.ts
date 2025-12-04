import { GoogleGenAI } from "@google/genai";
import { StockItem } from "../types";

const apiKey = process.env.API_KEY || '';
// Initialize safe AI instance, though in a real app we'd handle missing keys more gracefully in UI
const ai = new GoogleGenAI({ apiKey });

export const generateDailyReport = async (items: StockItem[]): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure your environment to use the AI Assistant.";
  }

  try {
    const dataSummary = items.map(item => {
      const totalStock = item.opening + item.added;
      const sales = Math.max(0, totalStock - item.damaged - item.closing);
      const revenue = sales * item.price;
      return `${item.name}: Sold ${sales} units, Revenue ${revenue}, Damaged ${item.damaged}, Left ${item.closing}`;
    }).join('\n');

    const prompt = `
      You are an expert Restaurant Manager for "Magic Parking and Restaurant".
      Here is the daily stock data:
      ${dataSummary}

      Please provide a brief, professional, and friendly daily summary.
      1. Highlight the best performing item.
      2. Point out any concerns (high damage or low sales).
      3. Give one tip for tomorrow to improve sales or reduce waste.
      Keep it under 150 words. Format with clear sections.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate report.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, the AI Assistant is currently unavailable. Please check your connection or API key.";
  }
};