import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export function Privacy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h2>1. Introduction</h2>
            <p>
              This Privacy Policy explains how we collect, use, and protect your information when you use our temporary email service.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We collect minimal information to provide our service:</p>
            <ul>
              <li>Temporary email addresses you create</li>
              <li>Emails received at your temporary address</li>
              <li>Basic usage statistics</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul>
              <li>Provide the temporary email service</li>
              <li>Display received emails to you</li>
              <li>Improve our service</li>
            </ul>

            <h2>4. Data Retention</h2>
            <p>
              All temporary email addresses and their contents are automatically deleted after 30 minutes of inactivity.
              We do not store any personal information beyond this period.
            </p>

            <h2>5. Security</h2>
            <p>
              We implement appropriate security measures to protect your information.
              However, please note that no method of transmission over the internet is 100% secure.
            </p>

            <h2>6. Third-Party Services</h2>
            <p>
              We use Mail.tm API to provide our service. Their privacy policy applies to the handling of your data.
            </p>

            <h2>7. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>

            <h2>8. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at support@tempmail.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 