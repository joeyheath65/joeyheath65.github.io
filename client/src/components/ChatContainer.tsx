'use client';

import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sendMessage } from '@/utils/openai';
import { sendMessageToGemini } from '@/utils/gemini';
import { Assistant } from '@/config/assistants';

enum MessageRole {
  USER = 'USER',
  ASSISTANT = 'ASSISTANT',
  ERROR = 'ERROR'
}

interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: Date;
}

interface ChatContainerProps {
  assistant: Assistant;
}

export default function ChatContainer({ assistant }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Clear messages when assistant changes
  useEffect(() => {
    setMessages([]);
    setInput('');
    setIsLoading(false);
  }, [assistant.id]);

  const addMessage = (content: string, role: MessageRole) => {
    setMessages(prev => [...prev, {
      id: uuidv4(),
      content,
      role,
      timestamp: new Date()
    }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    addMessage(userMessage, MessageRole.USER);
    setIsLoading(true);

    try {
      let response: string;
      
      if (assistant.type === 'gemini') {
        response = await sendMessageToGemini(userMessage);
      } else {
        response = await sendMessage(userMessage, assistant.assistantId);
      }
      
      addMessage(response, MessageRole.ASSISTANT);
    } catch (error) {
      console.error('Error in chat:', error);
      addMessage(
        error instanceof Error ? error.message : 'An error occurred',
        MessageRole.ERROR
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{assistant.icon}</span>
          <div>
            <h2 className="text-xl font-bold text-white">{assistant.name}</h2>
            <p className="text-sm text-gray-400">{assistant.description}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-4 rounded-lg ${
              message.role === MessageRole.ERROR
                ? 'bg-red-900/50'
                : message.role === MessageRole.USER
                ? 'bg-blue-900/50'
                : 'bg-gray-800/50'
            } ${
              message.role === MessageRole.USER ? 'ml-12' : 'mr-12'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-sm ${
                message.role === MessageRole.ERROR
                  ? 'text-red-400'
                  : message.role === MessageRole.USER
                  ? 'text-blue-400'
                  : 'text-green-400'
              }`}>
                {message.role}
              </span>
            </div>
            <p className="text-white whitespace-pre-wrap">{message.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${assistant.name}...`}
            disabled={isLoading}
            className="flex-1 p-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded ${
              isLoading
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-medium transition-colors`}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
} 