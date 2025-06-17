import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { products } from '../data/productData';
import type { ProductType } from '../types/types';
import ProductCard from '../components/ProductCard'; // Using our enhanced ProductCard component

const SearchResultsPage = () => {
  const location = useLocation();
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Parse the query parameter from the URL
    const params = new URLSearchParams(location.search);
    const query = params.get('query');

    setIsLoading(true);
    
    if (query) {
      setSearchTerm(query);
      // Simulate search delay for better UX
      const timer = setTimeout(() => {
        const results = products.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description?.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(results);
        setIsLoading(false);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setFilteredProducts([]);
      setSearchTerm('');
      setIsLoading(false);
    }
  }, [location.search]);

  return (
    <div className="container mx-auto px-4 py-20 mt-16 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white transition-colors duration-300">
          {searchTerm ? `Search Results for "${searchTerm}"` : 'Search Products'}
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredProducts.length === 0 && searchTerm ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors duration-300">
              No products found matching "{searchTerm}"
            </p>
            <Link 
              to="/collections" 
              className="mt-6 inline-block px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors duration-300"
            >
              Browse All Products
            </Link>
          </div>
        ) : filteredProducts.length === 0 && !searchTerm ? (
          <p className="text-lg text-gray-600 dark:text-gray-400 transition-colors duration-300">
            Please enter a search term in the search bar
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;