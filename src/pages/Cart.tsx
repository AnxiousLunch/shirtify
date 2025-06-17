// src/pages/Cart.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { FiTrash2, FiChevronLeft, FiArrowRight } from 'react-icons/fi';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // Example shipping cost
  const shipping = subtotal > 0 ? 15.00 : 0;
  const totalAmount = subtotal + shipping;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Shopping Cart</h1>
          <Link 
            to="/account" 
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Account
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {items.length === 0 ? (
          <div className="text-center bg-white dark:bg-gray-800 p-12 rounded-lg shadow-md transition-colors duration-200">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-200">
              Your cart is empty
            </h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400 transition-colors duration-200">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/collections"
              className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-600 transition-colors duration-200"
            >
              <FiChevronLeft className="-ml-1 mr-2 h-5 w-5" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-200">
            {/* Cart Items */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {items.map(item => (
                <div key={`${item.id}-${item.size}`} className="p-6 flex items-center space-x-6">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-24 h-24 rounded-md object-cover border border-gray-200 dark:border-gray-700"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                      Size: {item.size}
                    </p>
                    <p className="text-md font-bold text-gray-900 dark:text-white mt-1 transition-colors duration-200">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, item.size, parseInt(e.target.value))}
                      className="w-16 text-center border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md transition-colors duration-200"
                      min="1"
                    />
                    <button 
                      onClick={() => removeItem(item.id, item.size)} 
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-200"
                      aria-label="Remove item"
                    >
                      <FiTrash2 size={20}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-b-lg border-t border-gray-200 dark:border-gray-600 transition-colors duration-200">
              <div className="flex justify-between text-gray-600 dark:text-gray-300 transition-colors duration-200">
                <p>Subtotal</p>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-300 mt-2 transition-colors duration-200">
                <p>Shipping</p>
                <p>${shipping.toFixed(2)}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center text-lg font-bold text-gray-900 dark:text-white transition-colors duration-200">
                <p>Total Amount</p>
                <p>${totalAmount.toFixed(2)}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="p-6 flex justify-between items-center">
              <Link 
                to="/collections" 
                className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
              >
                <FiChevronLeft className="mr-1" />
                Back to shopping
              </Link>
              <button
                onClick={() => navigate('/checkout')}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-colors duration-200"
              >
                Proceed to Checkout
                <FiArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;