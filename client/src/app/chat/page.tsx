'use client';

import { useState } from 'react';
import Link from 'next/link';
import { assistants } from '@/config/assistants';
import ChatContainer from '@/components/ChatContainer';
import AssistantButton from '@/components/AssistantButton';

export default function ChatPage() {
  const [selectedAssistant, setSelectedAssistant] = useState(assistants[0]);

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Navigation Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link 
            href="/"
            className="text-white hover:text-gray-300 transition-colors"
          >
            ← Back to Home
          </Link>
          <h1 className="text-white font-semibold">AI Agent Hub</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-800 p-4 space-y-4 overflow-y-auto">
          <h2 className="text-xl font-bold text-white mb-6">Choose an Assistant</h2>
          {assistants.map((assistant) => (
            <AssistantButton
              key={assistant.id}
              assistant={assistant}
              isSelected={selectedAssistant.id === assistant.id}
              onClick={() => setSelectedAssistant(assistant)}
            />
          ))}
        </div>

        {/* Main Chat Area */}
        <div className="flex-1">
          <ChatContainer assistant={selectedAssistant} />
        </div>
      </div>
    </div>
  );
} 