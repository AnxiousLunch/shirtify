import React, { useState } from 'react';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { products } from '../../data/productData';

const AddSampleProducts: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAddSampleProducts = async () => {
    setIsLoading(true);
    setMessage('');
    
    try {
      const db = getFirestore();
      const productsCollection = collection(db, 'products');
      
      for (const product of products) {
        const productWithStock = {
          ...product,
          stock: Math.floor(Math.random() * 50) + 10 // Random stock between 10 and 60
        };
        
        await addDoc(productsCollection, productWithStock);
      }
      
      setMessage('Sample products added successfully!');
    } catch (error) {
      console.error('Error adding sample products:', error);
      setMessage('Error adding sample products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Add Sample Products</h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Click the button below to add sample products to your store. This will add all the predefined products with random stock levels.
          </p>
          
          <button
            onClick={handleAddSampleProducts}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg text-white ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Adding Products...' : 'Add Sample Products'}
          </button>
          
          {message && (
            <p className={`mt-4 ${
              message.includes('Error') 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-green-600 dark:text-green-400'
            }`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSampleProducts; 