import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../hooks/useWishlist';
import ProductCard from '../components/ProductCard';

const Wishlist: React.FC = () => {
    const { items } = useWishlist();

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-200">
            <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
                        My Wishlist
                    </h1>
                </div>
            </header>
            
            <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {items.length === 0 ? (
                    <div className="text-center bg-white dark:bg-gray-800 p-12 rounded-lg shadow-md transition-colors duration-200">
                        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 transition-colors duration-200">
                            Your wishlist is empty
                        </h2>
                        <p className="mt-2 text-gray-500 dark:text-gray-400 transition-colors duration-200">
                            Explore our collections and save your favorite items.
                        </p>
                        <Link
                            to="/collections"
                            className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-600 transition-colors duration-200"
                        >
                            Find Your Favorites
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {items.map(item => (
                            <Link 
                                to={`/product/${item.id}`} 
                                key={item.id}
                                className="transition-transform duration-200 hover:scale-[1.02]"
                            >
                                <ProductCard 
                                    id={item.id}
                                    title={item.title}
                                    price={item.price}
                                    image={item.image}
                                    category={item.category}
                                />
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Wishlist;