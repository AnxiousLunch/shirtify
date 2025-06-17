import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { Menu, Search, ShoppingCart, User, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { currentUser } = useAuth();
  const { items: cartItems } = useCart();
  const navigate = useNavigate();

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Menu Button */}
            <div className="flex items-center -ml-4">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
              <Link to='/'>
                <div className="ml-2 flex items-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Shirtify
                  </span>
                </div>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search for custom shirts..."
                  className="w-full px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all dark:bg-gray-800 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="absolute right-0 top-0 h-full w-12 flex items-center justify-center text-gray-400 dark:text-gray-500"
                >
                  <Search className="h-6 w-6" />
                </button>
              </form>
            </div>

            {/* Cart and User */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <Link 
                to="/cart" 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
              >
                <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 dark:bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </Link>

              {/* User */}
              {currentUser ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Toggle user menu"
                  >
                    <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                  </button>

                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                      <Link 
                        to="/order-history" 
                        onClick={() => setIsMenuOpen(false)} 
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Order History
                      </Link>
                      <Link 
                        to="/profile" 
                        onClick={() => setIsMenuOpen(false)} 
                        className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          setIsMenuOpen(false);
                          handleLogout();
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col transition-colors duration-300">
          <div className="flex items-center justify-between px-4 py-4 border-b dark:border-gray-700">
            <span className="text-xl font-bold text-gray-800 dark:text-white">Menu</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <nav className="flex flex-col px-4 py-2 space-y-2">
            {currentUser ? (
              <>
                <Link 
                  to="/order-history" 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="text-left w-full px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
                >
                  Order History
                </Link>
                <Link 
                  to="/current-orders" 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="text-left w-full px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
                >
                  Current Orders
                </Link>
                <Link 
                  to="/wishlist" 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="text-left w-full px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
                >
                  Wishlist
                </Link>
                <Link 
                  to="/settings" 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="text-left w-full px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
                >
                  Settings
                </Link>
                <Link 
                  to="/profile" 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="text-left w-full px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
                >
                  Profile
                </Link>
              </>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsSidebarOpen(false)} 
                className="text-left w-full px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
              >
                Login / Register
              </Link>
            )}
            <Link 
              to="/contact" 
              onClick={() => setIsSidebarOpen(false)} 
              className="text-left w-full px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;