import { useState, useEffect } from 'react';
import { mailTMService } from '../services/mailtm';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { useToast } from './ui/use-toast';

export function EmailInbox() {
  const [email, setEmail] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const generateEmail = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Creating new Mail.tm account...');
      const account = await mailTMService.createAccount();
      console.log('Account created:', account);
      setEmail(account.address);
      toast({
        title: "Success",
        description: "Temporary email created successfully!",
      });
    } catch (err) {
      console.error('Error in generateEmail:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate email';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    if (!email) return;
    
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching messages for email:', email);
      const messages = await mailTMService.getMessages();
      console.log('Messages fetched:', messages);
      setMessages(messages);
    } catch (err) {
      console.error('Error in fetchMessages:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch messages';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateNew = async () => {
    console.log('Generating new email...');
    mailTMService.clearAccount();
    setEmail('');
    setMessages([]);
    await generateEmail();
  };

  useEffect(() => {
    console.log('EmailInbox mounted, email:', email);
    if (email) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 10000); // Poll every 10 seconds
      return () => {
        console.log('Cleaning up interval');
        clearInterval(interval);
      };
    }
  }, [email]);

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Temporary Email</CardTitle>
        </CardHeader>
        <CardContent>
          {!email ? (
            <div className="flex flex-col items-center space-y-4">
              <Button onClick={generateEmail} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Temporary Email'}
              </Button>
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Your temporary email:</p>
                <code className="bg-muted px-2 py-1 rounded">{email}</code>
                <Button variant="outline" onClick={handleGenerateNew}>
                  Generate New
                </Button>
              </div>
              
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <ScrollArea className="h-[400px] rounded-md border">
                <div className="p-4">
                  {loading ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    </div>
                  ) : messages.length === 0 ? (
                    <p className="text-center text-muted-foreground">
                      No messages yet. Emails will appear here automatically.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <Card key={message.id}>
                          <CardHeader>
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium">{message.from.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {message.from.address}
                                </p>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {new Date(message.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <h3 className="font-medium mb-2">{message.subject}</h3>
                            <p className="text-sm">{message.intro}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 