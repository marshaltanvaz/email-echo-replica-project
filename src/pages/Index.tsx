import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ScrollArea } from '../components/ui/scroll-area';
import { useToast } from '../components/ui/use-toast';
import { mailTMService } from '../services/mailtm';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Copy, RefreshCw } from 'lucide-react';

export function Index() {
  const { toast } = useToast();
  const [email, setEmail] = useState<string>(localStorage.getItem('mailtm_email') || '');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(30 * 60); // 30 minutes in seconds
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);

  const generateEmail = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Creating new Mail.tm account...');
      const { email: newEmail, token } = await mailTMService.createAccount();
      console.log('Account created:', newEmail);
      setEmail(newEmail);
      localStorage.setItem('mailtm_email', newEmail);
      setTimeLeft(30 * 60); // Reset timer
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

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    toast({
      title: "Copied!",
      description: "Email address copied to clipboard",
    });
  };

  const fetchMessages = async () => {
    if (!email) return;
    
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching messages for email:', email);
      const response = await axios.get('https://api.mail.tm/messages', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('mailtm_token')}`
        }
      });
      console.log('Messages fetched:', response.data);
      setMessages(response.data['hydra:member'] || []);
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
    localStorage.removeItem('mailtm_token');
    localStorage.removeItem('mailtm_email');
    setEmail('');
    setMessages([]);
    setTimeLeft(30 * 60);
    await generateEmail();
  };

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh);
    toast({
      title: autoRefresh ? "Auto-refresh disabled" : "Auto-refresh enabled",
      description: autoRefresh ? "Messages will not refresh automatically" : "Messages will refresh every 10 seconds",
    });
  };

  useEffect(() => {
    console.log('Index mounted, email:', email);
    if (email) {
      fetchMessages();
      const interval = setInterval(() => {
        if (autoRefresh) {
          fetchMessages();
        }
      }, 10000); // Poll every 10 seconds
      return () => {
        console.log('Cleaning up interval');
        clearInterval(interval);
      };
    }
  }, [email, autoRefresh]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (email) {
      handleGenerateNew();
    }
  }, [timeLeft, email]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
            Temporary Disposable Email
          </h1>
          
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Get a free disposable email address instantly. 
              No registration required. Protect your privacy!
            </p>
          </div>

          <Card className="w-full mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Temporary Email</CardTitle>
                {email && (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      Valid for: {formatTime(timeLeft)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleAutoRefresh}
                      className={autoRefresh ? 'text-green-600' : 'text-gray-500'}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Auto-refresh {autoRefresh ? 'On' : 'Off'}
                    </Button>
                  </div>
                )}
              </div>
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
                    <code className="bg-muted px-2 py-1 rounded flex-1">{email}</code>
                    <Button variant="outline" size="sm" onClick={copyEmail}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleGenerateNew}>
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
                          {messages.slice(0, 20).map((message) => (
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
          
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">About Temp Mail</h2>
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>
                Temp Mail provides a free temporary email address that allows you to receive emails anonymously. 
                No registration is required – just use the randomly generated email address.
              </p>
              <p className="mt-3">
                Our service is perfect for:
              </p>
              <ul className="mt-2 space-y-1">
                <li>Protecting your primary inbox from spam</li>
                <li>Signing up for websites requiring email verification</li>
                <li>Testing email functionality in your applications</li>
                <li>Keeping your identity private online</li>
              </ul>
              <p className="mt-3">
                All emails are automatically deleted after 30 minutes to ensure your privacy.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
