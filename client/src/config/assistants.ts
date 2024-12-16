export interface Assistant {
  id: string;
  name: string;
  description: string;
  assistantId: string;
  icon?: string;
}

export const assistants: Assistant[] = [
  {
    id: 'general',
    name: 'General Assistant',
    description: 'A versatile AI assistant for general tasks and inquiries',
    assistantId: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID_GENERAL || '',
    icon: '🤖'
  },
  {
    id: 'coding',
    name: 'Code Expert',
    description: 'Specialized in programming and technical tasks',
    assistantId: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID_CODING || '',
    icon: '👨‍💻'
  },
  {
    id: 'writing',
    name: 'Writing Assistant',
    description: 'Expert in content creation and writing tasks',
    assistantId: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID_WRITING || '',
    icon: '✍️'
  },
  {
    id: 'research',
    name: 'Research Analyst',
    description: 'Specialized in research and analysis',
    assistantId: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID_RESEARCH || '',
    icon: '🔍'
  },
  {
    id: 'creative',
    name: 'Creative Director',
    description: 'Focused on creative and innovative solutions',
    assistantId: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID_CREATIVE || '',
    icon: '🎨'
  },
  {
    id: 'business',
    name: 'Business Strategist',
    description: 'Expert in business strategy and planning',
    assistantId: process.env.NEXT_PUBLIC_OPENAI_ASSISTANT_ID_BUSINESS || '',
    icon: '💼'
  }
]; 