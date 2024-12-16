import { Assistant } from '@/config/assistants';

interface AssistantButtonProps {
  assistant: Assistant;
  isSelected: boolean;
  onClick: () => void;
}

export default function AssistantButton({ 
  assistant, 
  isSelected, 
  onClick 
}: AssistantButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg text-left transition-all ${
        isSelected 
          ? 'bg-blue-600 hover:bg-blue-700' 
          : 'bg-gray-800 hover:bg-gray-700'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{assistant.icon}</span>
        <div>
          <h3 className="font-medium text-white">{assistant.name}</h3>
          <p className="text-sm text-gray-400 line-clamp-2">
            {assistant.description}
          </p>
        </div>
      </div>
    </button>
  );
} 