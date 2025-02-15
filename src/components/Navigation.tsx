
import { Bell, Home, Search, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t md:relative md:border-t-0 md:border-r md:w-64 md:h-screen z-50">
      <div className="px-4 py-2 md:py-6">
        <h1 className="hidden md:block text-2xl font-bold text-primary mb-8">João 23</h1>
        <ul className="flex justify-around md:flex-col md:space-y-4">
          <li>
            <Link
              to="/"
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isActive("/") ? "text-primary" : "text-gray-600 hover:text-primary"
              }`}
            >
              <Home className="w-6 h-6" />
              <span className="hidden md:inline">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isActive("/search") ? "text-primary" : "text-gray-600 hover:text-primary"
              }`}
            >
              <Search className="w-6 h-6" />
              <span className="hidden md:inline">Buscar</span>
            </Link>
          </li>
          <li>
            <Link
              to="/notifications"
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isActive("/notifications") ? "text-primary" : "text-gray-600 hover:text-primary"
              }`}
            >
              <Bell className="w-6 h-6" />
              <span className="hidden md:inline">Notificações</span>
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                isActive("/profile") ? "text-primary" : "text-gray-600 hover:text-primary"
              }`}
            >
              <User className="w-6 h-6" />
              <span className="hidden md:inline">Perfil</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
