
import { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const EmailBox = ({ email, onRefresh }: { email: string; onRefresh: () => void }) => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    toast({
      title: "Copied to clipboard",
      description: "Email address has been copied to clipboard",
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Your Temporary Email Address</h2>
          <button 
            onClick={handleRefresh}
            className="text-tempmail-500 hover:text-tempmail-600 transition-colors"
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-5 w-5 ${isRefreshing ? 'animate-spin-slow' : ''}`} />
          </button>
        </div>
        
        <div className="flex items-center border rounded-md overflow-hidden">
          <div className="flex-grow px-4 py-3 text-gray-800 bg-gray-50 truncate">
            {email}
          </div>
          <button 
            onClick={copyToClipboard} 
            className="flex items-center justify-center px-4 py-3 bg-tempmail-500 text-white hover:bg-tempmail-600 transition-colors"
          >
            <Copy className="h-4 w-4 mr-1" />
            <span className="text-sm">Copy</span>
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="bg-gray-100 text-xs px-3 py-1 rounded-full text-gray-600">
            30 minutes validity
          </div>
          <div className="bg-gray-100 text-xs px-3 py-1 rounded-full text-gray-600">
            Auto refresh
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailBox;
