import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/productData';
import { useCart } from '../hooks/useCart';
import { FiShoppingCart, FiHeart, FiChevronLeft } from 'react-icons/fi';
import { useWishlist } from '../hooks/useWishlist';

interface ProductType {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
  material?: string;
  fit?: string;
  manufacturer?: string;
  origin?: string;
  originalPrice?: number;
  discount?: number;
  additionalImages?: string[];
  reviews?: Array<{
    rating: number;
    title: string;
    comment: string;
    author: string;
    date: string;
  }>;
}

const ProductDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const { toggleItem, isInWishlist } = useWishlist();
  const product = products.find(p => p.id === id) as ProductType;
  const isWishlisted = isInWishlist(product.id);

  const handleToggleWishlist = () => {
    toggleItem({ 
      id: product.id, 
      title: product.title,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  if (!product) {
    return <Navigate to="/collections" replace />;
  }

  const handleAddToCart = () => {
    if (!currentUser) {
      setError('Please login to add items to cart');
      return;
    }
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    
    const itemToAdd = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      size: selectedSize,
    };
    
    for (let i = 0; i < quantity; i++) {
      addItem(itemToAdd);
    }

    setError('');
    alert(`${quantity} x ${product.title} (Size: ${selectedSize}) added to cart!`);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            aria-label="Go back to products"
          >
            <FiChevronLeft className="mr-1" />
            Back to Products
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transition-colors duration-200">
          <div className="md:flex">
            {/* Product Images */}
            <div className="md:w-1/2 p-6">
              <div className="h-96 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-4 transition-colors duration-200">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[product.image, ...(product.additionalImages || [])].map((img, idx) => (
                  <div key={idx} className="h-20 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition-all duration-200">
                    <img
                      src={img}
                      alt={`${product.title} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
                    {product.title}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 transition-colors duration-200">
                    {product.category}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={handleToggleWishlist}
                    className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                    aria-label="Toggle wishlist"
                  >
                    <FiHeart className={`h-5 w-5 ${
                      isWishlisted 
                        ? 'text-red-500 dark:text-red-400 fill-current' 
                        : 'text-gray-600 dark:text-gray-400'
                    } transition-colors duration-200`} />
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <span className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="ml-2 text-xl text-gray-500 dark:text-gray-400 line-through transition-colors duration-200">
                    ${product.originalPrice}
                  </span>
                )}
                {product.discount && (
                  <span className="ml-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-sm font-medium px-2 py-0.5 rounded transition-colors duration-200">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-200">
                  Description
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300 transition-colors duration-200">
                  {product.description}
                </p>
              </div>

              {/* Product Specifications */}
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-200">
                  Specifications
                </h2>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">Material</p>
                    <p className="text-gray-900 dark:text-gray-200 transition-colors duration-200">
                      {product.material || '100% Cotton'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">Fit</p>
                    <p className="text-gray-900 dark:text-gray-200 transition-colors duration-200">
                      {product.fit || 'Regular Fit'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">Manufacturer</p>
                    <p className="text-gray-900 dark:text-gray-200 transition-colors duration-200">
                      {product.manufacturer || 'Shirtify Inc.'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">Origin</p>
                    <p className="text-gray-900 dark:text-gray-200 transition-colors duration-200">
                      {product.origin || 'USA'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-200">
                  Size
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md transition-colors duration-200 ${
                        selectedSize === size
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-200">
                  Quantity
                </h2>
                <div className="mt-2 flex items-center">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-l-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-t border-b border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-r-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mt-4 text-red-600 dark:text-red-400 text-sm transition-colors duration-200">
                  {error}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-md transition-colors duration-200"
                  aria-label="Add to cart"
                >
                  <FiShoppingCart className="mr-2" />
                  Add to Cart
                </button>
                <button 
                  className="flex-1 px-6 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-md transition-colors duration-200"
                  aria-label="Buy now"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-6 transition-colors duration-200">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-200">
            Customer Reviews
          </h2>
          
          {product.reviews && product.reviews.length > 0 ? (
            <div className="space-y-6">
              {product.reviews.map((review, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0 transition-colors duration-200">
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'} transition-colors duration-200`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white transition-colors duration-200">
                      {review.rating}.0
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white transition-colors duration-200">
                    {review.title}
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-300 transition-colors duration-200">
                    {review.comment}
                  </p>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                    By {review.author} on {review.date}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 transition-colors duration-200">
              No reviews yet. Be the first to review this product!
            </p>
          )}

          <div className="mt-8">
            <button 
              className="px-4 py-2 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
              aria-label="Write a review"
            >
              Write a Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;