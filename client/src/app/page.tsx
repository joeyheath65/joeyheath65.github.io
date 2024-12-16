'use client';

import Link from 'next/link';
import { assistants } from '@/config/assistants';
import SimpleChatWindow from '@/components/SimpleChatWindow';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-2xl font-bold text-white">AI Agent Hub</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Features */}
          <div className="space-y-8">
            {/* AI Agents Section */}
            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">AI Assistants</h2>
              <p className="text-gray-300 mb-6">
                Access our full suite of specialized AI assistants for coding, writing,
                research, and more.
              </p>
              <Link 
                href="/auth/login" 
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Access Full Suite →
              </Link>
            </section>

            {/* Placeholder for Future Features */}
            <section className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Coming Soon</h2>
              <p className="text-gray-300">
                More features and tools will be available here soon.
              </p>
            </section>
          </div>

          {/* Right Column - Simple Chat */}
          <div className="bg-gray-800 rounded-lg overflow-hidden">
            <SimpleChatWindow 
              assistant={assistants.find(a => a.id === 'general')!}
              maxHeight="600px"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-8">
        <div className="container mx-auto px-4 py-6">
          <p className="text-gray-400 text-center">
            © 2024 AI Agent Hub. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
