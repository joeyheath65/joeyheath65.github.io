import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          Welcome to AI Agent
        </h1>
        <Link 
          href="/chat" 
          className="px-6 py-3 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Chatting
        </Link>
      </div>
    </main>
  );
}
