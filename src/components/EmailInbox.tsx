import { useState, useEffect } from 'react';
import { mailTMService } from '../services/mailtm';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';

export function EmailInbox() {
  const [email, setEmail] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateEmail = async () => {
    try {
      setLoading(true);
      setError(null);
      const account = await mailTMService.createAccount();
      await mailTMService.getToken();
      setEmail(account.address);
    } catch (err) {
      setError('Failed to generate email');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    if (!email) return;
    
    try {
      setLoading(true);
      setError(null);
      const messages = await mailTMService.getMessages();
      setMessages(messages);
    } catch (err) {
      setError('Failed to fetch messages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 10000); // Poll every 10 seconds
      return () => clearInterval(interval);
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
            <Button onClick={generateEmail} disabled={loading}>
              {loading ? 'Generating...' : 'Generate Temporary Email'}
            </Button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Your temporary email:</p>
                <code className="bg-muted px-2 py-1 rounded">{email}</code>
                <Button variant="outline" onClick={generateEmail}>
                  Generate New
                </Button>
              </div>
              
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <ScrollArea className="h-[400px] rounded-md border">
                <div className="p-4">
                  {messages.length === 0 ? (
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