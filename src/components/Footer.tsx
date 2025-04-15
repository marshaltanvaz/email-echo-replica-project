import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Shield, HelpCircle, FileText } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">About Temp Mail</h3>
            <p className="text-sm mb-4">
              A free temporary email service that helps protect your privacy online. 
              No registration required, instant disposable email addresses.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com/yourusername/email-echo-replica" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Generate Email
                </Link>
              </li>
              <li>
                <Link to="/inbox" className="text-sm hover:text-white transition-colors flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  View Inbox
                </Link>
              </li>
              <li>
                <a 
                  href="https://github.com/yourusername/email-echo-replica/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors flex items-center"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Report Issues
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-sm hover:text-white transition-colors flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-white transition-colors flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="mailto:support@tempmail.com" 
                  className="text-sm hover:text-white transition-colors flex items-center"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  support@tempmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">
            © {currentYear} Temp Mail. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
