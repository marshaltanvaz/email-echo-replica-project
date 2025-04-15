import { EmailMessageProps } from "@/components/EmailMessage";

// Generate a random string for the email username
const generateRandomUsername = (length: number = 8): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Generate random domains for the email
const domains = ['tempmail.org', 'mailtemp.net', 'disposable.me', 'tempemail.com'];

export const generateRandomEmail = (): string => {
  const username = generateRandomUsername();
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${username}@${domain}`;
};

// Sample HTML bodies for emails
const sampleBodies = [
  `<div>
    <p>Hello there,</p>
    <p>Thank you for signing up for our service. Please confirm your account by clicking the link below.</p>
    <p><a href="#" style="color: blue; text-decoration: underline;">Confirm Account</a></p>
    <p>Best regards,<br>Support Team</p>
  </div>`,
  `<div>
    <h3>Your order has been shipped!</h3>
    <p>We're pleased to inform you that your recent order has been shipped and is on its way to you.</p>
    <p>Order Details:</p>
    <ul>
      <li>Order Number: ORD-12345</li>
      <li>Shipping Method: Express Delivery</li>
      <li>Estimated Delivery: 3-5 business days</li>
    </ul>
    <p>Thank you for your purchase!</p>
  </div>`,
  `<div>
    <p>Password Reset Request</p>
    <p>We received a request to reset your password. If you made this request, click the link below to create a new password.</p>
    <p><a href="#" style="color: blue; text-decoration: underline;">Reset Password</a></p>
    <p>If you didn't make this request, you can ignore this email.</p>
  </div>`,
  `<div>
    <h2>Welcome to Our Newsletter!</h2>
    <p>Thank you for subscribing to our weekly newsletter. We're excited to share the latest updates with you.</p>
    <p>In this issue:</p>
    <ul>
      <li>New product releases</li>
      <li>Tech industry insights</li>
      <li>Special offers and discounts</li>
    </ul>
    <p>Stay tuned for more exciting content!</p>
  </div>`,
];

const senders = [
  { name: 'Netflix', email: 'info@netflix.com' },
  { name: 'Amazon', email: 'orders@amazon.com' },
  { name: 'Facebook', email: 'notifications@facebookmail.com' },
  { name: 'Twitter', email: 'info@twitter.com' },
  { name: 'LinkedIn', email: 'members@linkedin.com' },
  { name: 'Google', email: 'no-reply@accounts.google.com' },
  { name: 'PayPal', email: 'service@paypal.com' },
  { name: 'Instagram', email: 'no-reply@instagram.com' },
];

const subjects = [
  'Your account confirmation',
  'Order confirmation #12345',
  'Password reset request',
  'Welcome to our service!',
  'Important security update',
  'Your subscription has been renewed',
  'Action required: Verify your account',
  'Your weekly newsletter',
  'Payment confirmation',
  'New login detected on your account',
];

// Generate a mock message
export const generateMockMessage = (): EmailMessageProps => {
  const sender = senders[Math.floor(Math.random() * senders.length)];
  const subject = subjects[Math.floor(Math.random() * subjects.length)];
  const body = sampleBodies[Math.floor(Math.random() * sampleBodies.length)];
  
  return {
    id: `msg-${Math.random().toString(36).substring(2, 15)}`,
    from: `${sender.name} <${sender.email}>`,
    subject,
    date: new Date().toLocaleString(),
    body,
    onDelete: () => {},
  };
};

// Generate a list of mock messages
export const generateMockMessages = (count: number = 0): EmailMessageProps[] => {
  // Randomly decide the number of messages (0-5)
  const messageCount = count || Math.floor(Math.random() * 6);
  const messages: EmailMessageProps[] = [];
  
  for (let i = 0; i < messageCount; i++) {
    messages.push(generateMockMessage());
  }
  
  return messages;
};
