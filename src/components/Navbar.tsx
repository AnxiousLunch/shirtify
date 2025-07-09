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
                  <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                    Shirtify
                  </span>
                </div>
              </Link>
            </div>

            {/* Search Bar - Responsive */}
            <div className="flex-1 min-w-0 mx-2 sm:mx-4 md:mx-8 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-3 pr-9 py-1.5 sm:py-2 rounded-full border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all dark:bg-gray-800 dark:text-white text-sm sm:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="absolute right-0 top-0 h-full w-8 sm:w-10 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <Search className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </form>
            </div>

            {/* Cart and User */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Cart */}
              <Link 
                to="/cart" 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
              >
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-300" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 dark:bg-blue-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
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
                    <User className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-300" />
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
                  className="px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors text-sm sm:text-base"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Animated Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Header with enhanced styling */}
          <div className="flex items-center justify-between px-6 py-5 border-b dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
            <span className="text-xl font-bold text-gray-800 dark:text-white tracking-wide">Menu</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-white/50 dark:hover:bg-gray-700/50 rounded-full transition-all duration-200 transform hover:scale-105 active:scale-95"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          {/* Navigation with enhanced animations */}
          <nav className="flex flex-col px-4 py-6 space-y-1 flex-1 overflow-y-auto">
            {currentUser ? (
              <>
                <Link 
                  to="/order-history" 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="group flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-lg transition-all duration-200 transform hover:translate-x-1 hover:shadow-md"
                >
                  <span className="text-sm font-medium tracking-wide">Order History</span>
                  <div className="ml-auto w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-4 transition-all duration-300"></div>
                </Link>
                <Link 
                  to="/current-orders" 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="group flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-lg transition-all duration-200 transform hover:translate-x-1 hover:shadow-md"
                >
                  <span className="text-sm font-medium tracking-wide">Current Orders</span>
                  <div className="ml-auto w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-4 transition-all duration-300"></div>
                </Link>
                <Link 
                  to="/wishlist" 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="group flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-lg transition-all duration-200 transform hover:translate-x-1 hover:shadow-md"
                >
                  <span className="text-sm font-medium tracking-wide">Wishlist</span>
                  <div className="ml-auto w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-4 transition-all duration-300"></div>
                </Link>
                <Link 
                  to="/settings" 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="group flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-lg transition-all duration-200 transform hover:translate-x-1 hover:shadow-md"
                >
                  <span className="text-sm font-medium tracking-wide">Settings</span>
                  <div className="ml-auto w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-4 transition-all duration-300"></div>
                </Link>
                <Link 
                  to="/profile" 
                  onClick={() => setIsSidebarOpen(false)} 
                  className="group flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-lg transition-all duration-200 transform hover:translate-x-1 hover:shadow-md"
                >
                  <span className="text-sm font-medium tracking-wide">Profile</span>
                  <div className="ml-auto w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-4 transition-all duration-300"></div>
                </Link>
              </>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsSidebarOpen(false)} 
                className="group flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-lg transition-all duration-200 transform hover:translate-x-1 hover:shadow-md"
              >
                <span className="text-sm font-medium tracking-wide">Login / Register</span>
                <div className="ml-auto w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-4 transition-all duration-300"></div>
              </Link>
            )}
            
            {/* Divider */}
            <div className="my-4 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
            
            <Link 
              to="/contact" 
              onClick={() => setIsSidebarOpen(false)} 
              className="group flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-gray-700 dark:hover:to-gray-600 rounded-lg transition-all duration-200 transform hover:translate-x-1 hover:shadow-md"
            >
              <span className="text-sm font-medium tracking-wide">Contact Us</span>
              <div className="ml-auto w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-4 transition-all duration-300"></div>
            </Link>
          </nav>
        </div>
      </div>

      {/* Ultra-smooth overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-all duration-500 z-40 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsSidebarOpen(false)}
      />
    </>
  );
};

export default Navbar;