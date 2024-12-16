'use client';

import { useState } from 'react';
import { assistants } from '@/config/assistants';
import ChatContainer from '@/components/ChatContainer';
import AssistantButton from '@/components/AssistantButton';

export default function ChatPage() {
  const [selectedAssistant, setSelectedAssistant] = useState(assistants[0]);

  return (
    <div className="flex h-screen bg-gray-900">
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
  );
} 