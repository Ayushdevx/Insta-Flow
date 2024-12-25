// Gemini AI client
import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiAI {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  async generateResponse(prompt: string): Promise<string> {
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  async suggestKeywords(context: string): Promise<string[]> {
    const prompt = `Based on this context: "${context}", suggest 5 relevant keywords for Instagram automation triggers.`;
    const response = await this.generateResponse(prompt);
    return response.split('\n').map(k => k.trim());
  }
}