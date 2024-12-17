export interface Assistant {
  id: string;
  name: string;
  description: string;
  assistantId: string;
  icon?: string;
  type?: 'openai' | 'gemini';
}

// Default OpenAI assistant ID to use if none is provided in environment variables
const DEFAULT_ASSISTANT_ID = 'asst_SYVhwLZDjKPrMNTCVD6L8BIo'; // Replace with your actual default assistant ID

export const assistants: Assistant[] = [
  {
    id: 'general',
    name: 'General Assistant',
    description: 'The one and only Ms. Lorna Dane here to help you with your needs',
    assistantId: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID_GENERAL || DEFAULT_ASSISTANT_ID,
    icon: '🤖',
    type: 'openai'
  },
  {
    id: 'coding',
    name: 'Coding Expert',
    description: 'Specialized in programming and technical tasks',
    assistantId: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID_CODING || DEFAULT_ASSISTANT_ID,
    icon: '👨‍💻',
    type: 'openai'
  },
  {
    id: 'writing',
    name: 'Administrative Assistant',
    description: 'Expert in administrative writing and tasks.',
    assistantId: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID_WRITING || DEFAULT_ASSISTANT_ID,
    icon: '✍️',
    type: 'openai'
  },
  {
    id: 'research',
    name: 'Research Analyst',
    description: 'Specialized in research and analysis',
    assistantId: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID_RESEARCH || DEFAULT_ASSISTANT_ID,
    icon: '🔍',
    type: 'openai'
  },
  {
    id: 'creative',
    name: 'Creative Director',
    description: 'Focused on creative and innovative solutions',
    assistantId: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID_CREATIVE || DEFAULT_ASSISTANT_ID,
    icon: '🎨',
    type: 'openai'
  },
  {
    id: 'business',
    name: 'Business Strategist',
    description: 'Expert in business strategy and planning',
    assistantId: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID_BUSINESS || DEFAULT_ASSISTANT_ID,
    icon: '💼',
    type: 'openai'
  },
  {
    id: 'gemini',
    name: 'Gemini Pro',
    description: 'Powered by Google\'s Gemini Pro model for advanced reasoning and analysis',
    assistantId: 'gemini-pro',
    icon: '🧠',
    type: 'gemini'
  }
]; 