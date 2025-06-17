import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCollection from '../components/ProductCollection';
import type { ProductType } from '../types/types';

const Collections = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialCategory = params.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const categories = ['all', 'Casual', 'Vintage', 'Premium', 'Summer'];

  const filterFn = (selectedCategory === 'all')
    ? undefined
    : (product: ProductType) => product.category === selectedCategory;

  // Update selected category when URL changes
  useEffect(() => {
    const newParams = new URLSearchParams(location.search);
    const newCategory = newParams.get('category') || 'all';
    setSelectedCategory(newCategory);
  }, [location.search]);

  return (
    <div className='mt-16 dark:bg-gray-900 transition-colors duration-200 min-h-screen'>
      {/* Category Filter */}
      <div className="bg-white dark:bg-gray-800 py-8 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 dark:bg-blue-700 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? 'All Products' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Collection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProductCollection
          title="Our Collection"
          subtitle={`${selectedCategory === 'all' ? 'All' : selectedCategory} Products`}
          filterFn={filterFn}
          gridCols="lg:grid-cols-4"
        />
      </div>
    </div>
  );
};

export default Collections;
