
import { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';

export interface EmailMessageProps {
  id: string;
  from: string;
  subject: string;
  date: string;
  body: string;
  onDelete: (id: string) => void;
}

const EmailMessage = ({ id, from, subject, date, body, onDelete }: EmailMessageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-md mb-3 overflow-hidden bg-white transition-all">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium text-gray-900 truncate max-w-[200px] sm:max-w-[300px]">{from}</span>
            <span className="text-xs text-gray-500">{date}</span>
          </div>
          <p className="text-sm text-gray-700 truncate">{subject}</p>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(id);
            }}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>
      
      {isOpen && (
        <div className="p-4 border-t bg-gray-50 animate-fade-in">
          <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: body }} />
        </div>
      )}
    </div>
  );
};

export default EmailMessage;
