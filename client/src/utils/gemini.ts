import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY || '');

export async function sendMessageToGemini(message: string): Promise<string> {
  try {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error in Gemini chat:', error);
    throw error;
  }
} 