import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const products = [
    'Custom Shirts',
    'Unique Hoodies',
    'Designer Bags',
    'Personalized Caps',
    'Custom Jackets',
  ];

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentProductIndex((prevIndex) => 
          prevIndex === products.length - 1 ? 0 : prevIndex + 1
        );
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  return (
    <div className="relative h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden transition-colors duration-500">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30 animate-blob transition-colors duration-500"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30 animate-blob animation-delay-2000 transition-colors duration-500"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-400 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30 animate-blob animation-delay-4000 transition-colors duration-500"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-8 animate-fade-in transition-colors duration-500">
            Design Your Perfect
            <span className={`block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 transition-all duration-300 ${
              isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
            }`}>
              {products[currentProductIndex]}
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in animation-delay-200 transition-colors duration-500">
            Express yourself with our premium custom products. Choose from thousands of designs or create your own masterpiece.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in animation-delay-400">
            <Link 
              to='/customizations' 
              className='px-8 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors transform hover:scale-105 duration-300'
            >
              Start Designing
            </Link>
            <Link 
              to='/collections' 
              className="px-8 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors transform hover:scale-105 duration-300"
            >
              Browse Collection
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-6 h-6 text-gray-600 dark:text-gray-300 transition-colors duration-500" 
          fill="none" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>

      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
};

export default Hero;