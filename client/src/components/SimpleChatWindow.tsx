'use client';

import { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sendMessage } from '@/utils/openai';
import { sendMessageToGemini } from '@/utils/gemini';
import { Assistant } from '@/config/assistants';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface SimpleChatWindowProps {
  assistant: Assistant;
  maxHeight?: string;
}

export default function SimpleChatWindow({ assistant, maxHeight = '500px' }: SimpleChatWindowProps) {
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

  const addMessage = (content: string, isUser: boolean) => {
    setMessages(prev => [...prev, {
      id: uuidv4(),
      content,
      isUser,
      timestamp: new Date()
    }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    addMessage(userMessage, true);
    setIsLoading(true);

    try {
      let response: string;
      
      if (assistant.type === 'gemini') {
        response = await sendMessageToGemini(userMessage);
      } else {
        response = await sendMessage(userMessage, assistant.assistantId);
      }
      
      addMessage(response, false);
    } catch (error) {
      console.error('Error in chat:', error);
      addMessage('Sorry, I encountered an error. Please try again.', false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-700 bg-gray-800">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{assistant.icon}</span>
          <div>
            <h2 className="text-lg font-semibold text-white">{assistant.name}</h2>
            <p className="text-sm text-gray-400">{assistant.description}</p>
          </div>
        </div>
      </div>

      <div 
        className="flex-1 overflow-auto p-4 space-y-4"
        style={{ maxHeight }}
      >
        {messages.length === 0 && (
          <p className="text-gray-400 text-center py-8">
            Start a conversation with {assistant.name}
          </p>
        )}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-3 rounded-lg ${
              message.isUser 
                ? 'bg-blue-900/50 ml-8' 
                : 'bg-gray-700/50 mr-8'
            }`}
          >
            <p className="text-white whitespace-pre-wrap">{message.content}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message ${assistant.name}...`}
            disabled={isLoading}
            className="flex-1 p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded ${
              isLoading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white font-medium transition-colors`}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
} 