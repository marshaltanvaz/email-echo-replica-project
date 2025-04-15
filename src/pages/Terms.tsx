import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

export function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle>Terms of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              We provide a temporary email service that allows users to create disposable email addresses for receiving emails.
              The service is provided "as is" and we make no warranties regarding its availability or functionality.
            </p>

            <h2>3. User Responsibilities</h2>
            <p>Users agree to:</p>
            <ul>
              <li>Use the service for legitimate purposes only</li>
              <li>Not use the service for illegal activities</li>
              <li>Not use the service to send spam or malicious content</li>
              <li>Not attempt to circumvent any security measures</li>
            </ul>

            <h2>4. Service Limitations</h2>
            <p>
              Temporary email addresses are valid for 30 minutes from creation.
              After this period, all emails and addresses are automatically deleted.
            </p>

            <h2>5. Prohibited Uses</h2>
            <p>You may not use our service to:</p>
            <ul>
              <li>Send spam or unsolicited emails</li>
              <li>Distribute malware or viruses</li>
              <li>Harass or threaten others</li>
              <li>Engage in illegal activities</li>
            </ul>

            <h2>6. Termination</h2>
            <p>
              We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability,
              for any reason whatsoever, including without limitation if you breach the Terms.
            </p>

            <h2>7. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
            </p>

            <h2>8. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at support@tempmail.com
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 