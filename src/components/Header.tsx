
import { MailCheck } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MailCheck className="h-6 w-6 text-tempmail-500" />
          <h1 className="text-xl font-bold text-tempmail-500">Temp Mail</h1>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm">
          <a href="#" className="text-gray-600 hover:text-tempmail-500 transition-colors">
            Home
          </a>
          <a href="#" className="text-gray-600 hover:text-tempmail-500 transition-colors">
            FAQ
          </a>
          <a href="#" className="text-gray-600 hover:text-tempmail-500 transition-colors">
            Blog
          </a>
          <a href="#" className="text-gray-600 hover:text-tempmail-500 transition-colors">
            Premium
          </a>
          <a href="#" className="text-gray-600 hover:text-tempmail-500 transition-colors">
            API
          </a>
        </nav>
        <div className="flex items-center space-x-3">
          <button className="hidden md:block px-4 py-2 text-xs font-medium bg-tempmail-500 text-white rounded-md hover:bg-tempmail-600 transition-colors">
            Sign In
          </button>
          <select className="text-xs border rounded px-2 py-1 bg-white">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
