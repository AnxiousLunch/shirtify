import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/productData';
import { Link } from 'react-router-dom';
import type { ProductCollectionProps } from '../types/types';

const ProductCollection: React.FC<ProductCollectionProps> = ({ 
  title, 
  subtitle, 
  filterFn, 
  maxItems, 
  showViewAll = false,
  viewAllLink = '/collections',
  gridCols = 'lg:grid-cols-3'
}) => {
  // Filter products based on the provided function
  const filteredProducts = filterFn 
    ? products.filter(filterFn).slice(0, maxItems) 
    : products.slice(0, maxItems);
  
  // Limit items if maxItems is specified
  const displayProducts = maxItems 
    ? filteredProducts.slice(0, maxItems) 
    : filteredProducts;

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors duration-300">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Product Grid */}
        <div className="flex justify-center">
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols} gap-8 max-w-5xl`}>
            {displayProducts.map((product) => (
              <Link 
                to={`/product/${product.id}`} 
                key={product.id}
                className="transition-transform duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-4 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 rounded-xl"
              >
                <ProductCard
                  {...product}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* View All Button */}
        {showViewAll && (
          <div className="text-center mt-12">
            <Link 
              to={viewAllLink} 
              className="px-8 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-full hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductCollection;