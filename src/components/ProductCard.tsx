import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  isInWishlist?: boolean;
  onToggleWishlist?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  title, 
  price, 
  image, 
  category,
  isInWishlist = false,
  onToggleWishlist
}) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const itemToAdd = { id, title, price, image, size: 'L' };
    addItem(itemToAdd);
    alert(`${title} (Size: L) added to cart!`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleWishlist?.();
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:hover:shadow-xl dark:hover:shadow-gray-900/50">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Wishlist button */}
      {onToggleWishlist && (
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm shadow-md hover:scale-110 transition-transform duration-200"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg
            className={`w-5 h-5 ${isInWishlist ? 'text-red-500 fill-current' : 'text-gray-400 dark:text-gray-300'}`}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      )}
      
      <Link to={`/products/${id}`} className="block relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>

      <div className="p-4">
        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">{category}</span>
        <Link to={`/products/${id}`}>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mt-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {title}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">${price}</span>
          <button 
            onClick={handleAddToCart}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-full text-sm font-medium transform transition-all duration-300 hover:bg-blue-700 dark:hover:bg-blue-800 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="absolute inset-0 border-2 border-blue-500/0 group-hover:border-blue-500/20 dark:group-hover:border-blue-400/20 rounded-xl transition-colors duration-300"></div>
    </div>
  );
};

export default ProductCard;