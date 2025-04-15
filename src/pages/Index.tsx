
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import EmailBox from '@/components/EmailBox';
import InboxView from '@/components/InboxView';
import Footer from '@/components/Footer';
import { generateRandomEmail, generateMockMessages } from '@/services/emailService';
import { EmailMessageProps } from '@/components/EmailMessage';

const Index = () => {
  const [email, setEmail] = useState<string>('');
  const [messages, setMessages] = useState<EmailMessageProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const newEmail = generateRandomEmail();
    setEmail(newEmail);
    
    setTimeout(() => {
      setMessages(generateMockMessages());
      setIsLoading(false);
    }, 1500);

    const intervalId = setInterval(() => {
      refreshInbox();
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const refreshEmail = () => {
    setIsLoading(true);
    const newEmail = generateRandomEmail();
    setEmail(newEmail);
    
    setMessages([]);
    setTimeout(() => {
      setMessages(generateMockMessages());
      setIsLoading(false);
    }, 1000);
  };

  const refreshInbox = () => {
    setIsLoading(true);
    
    const currentMessages = [...messages];
    const shouldAddNewMessage = Math.random() > 0.7;

    setTimeout(() => {
      if (shouldAddNewMessage) {
        const newMessage = generateMockMessages(1)[0];
        setMessages([newMessage, ...currentMessages]);
      } else {
        setMessages(currentMessages);
      }
      setIsLoading(false);
    }, 1000);
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(message => message.id !== id));
  };

  const deleteAllMessages = () => {
    setMessages([]);
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
          
          <EmailBox email={email} onRefresh={refreshEmail} />
          
          {isLoading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin-slow rounded-full border-4 border-gray-200 border-t-tempmail-500 h-12 w-12"></div>
              <p className="mt-4 text-gray-500">Loading your inbox...</p>
            </div>
          ) : (
            <InboxView 
              messages={messages}
              onDeleteAll={deleteAllMessages}
              onRefresh={refreshInbox}
            />
          )}
          
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
};

export default Index;
