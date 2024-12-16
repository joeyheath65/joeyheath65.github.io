export interface Assistant {
  id: string;
  name: string;
  description: string;
  assistantId: string;
  icon?: string;
  type?: 'openai' | 'gemini';
}

export const assistants: Assistant[] = [
  {
    id: 'general',
    name: 'General Assistant',
    description: 'The one and only Ms. Lorna Dane here to help you with your needs',
    assistantId: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID_GENERAL || '',
    icon: '🤖',
    type: 'openai'
  },
  {
    id: 'coding',
    name: 'Coding Expert',
    description: 'Specialized in programming and technical tasks',
    assistantId: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID_CODING || '',
    icon: '👨‍💻',
    type: 'openai'
  },
  {
    id: 'writing',
    name: 'Administrative Assistant',
    description: 'Expert in administrative writing and tasks.',
    assistantId: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID_WRITING || '',
    icon: '✍️',
    type: 'openai'
  },
  {
    id: 'research',
    name: 'Research Analyst',
    description: 'Specialized in research and analysis',
    assistantId: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID_RESEARCH || '',
    icon: '🔍',
    type: 'openai'
  },
  {
    id: 'creative',
    name: 'Creative Director',
    description: 'Focused on creative and innovative solutions',
    assistantId: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID_CREATIVE || '',
    icon: '🎨',
    type: 'openai'
  },
  {
    id: 'business',
    name: 'Business Strategist',
    description: 'Expert in business strategy and planning',
    assistantId: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID_BUSINESS || '',
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