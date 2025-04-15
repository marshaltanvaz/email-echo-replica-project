
import { useState } from 'react';
import { RefreshCw, Trash2 } from 'lucide-react';
import EmailMessage, { EmailMessageProps } from './EmailMessage';
import { useToast } from "@/hooks/use-toast";

interface InboxViewProps {
  messages: EmailMessageProps[];
  onDeleteAll: () => void;
  onRefresh: () => void;
}

const InboxView = ({ messages, onDeleteAll, onRefresh }: InboxViewProps) => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Inbox refreshed",
        description: `${messages.length} messages in your inbox`,
      });
    }, 1000);
  };

  const handleDeleteMessage = (id: string) => {
    // This is handled by the parent component
    toast({
      title: "Message deleted",
      description: "The message has been deleted from your inbox",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-700">Inbox</h2>
        <div className="flex space-x-3">
          <button 
            onClick={handleRefresh}
            className="flex items-center text-sm text-tempmail-500 hover:text-tempmail-600 transition-colors"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${isRefreshing ? 'animate-spin-slow' : ''}`} />
            <span>Refresh</span>
          </button>
          <button 
            onClick={onDeleteAll}
            className="flex items-center text-sm text-red-500 hover:text-red-600 transition-colors"
            disabled={messages.length === 0}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            <span>Delete All</span>
          </button>
        </div>
      </div>
      
      {messages.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Your inbox is empty</p>
          <p className="text-sm text-gray-400 mt-2">Emails sent to your temporary address will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <EmailMessage 
              key={message.id}
              {...message}
              onDelete={handleDeleteMessage}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default InboxView;
