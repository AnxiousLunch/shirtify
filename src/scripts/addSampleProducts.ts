import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { products } from '../data/productData';

const db = getFirestore();

const addSampleProducts = async () => {
  try {
    const productsCollection = collection(db, 'products');
    
    for (const product of products) {
      // Add stock field to each product
      const productWithStock = {
        ...product,
        stock: Math.floor(Math.random() * 50) + 10 // Random stock between 10 and 60
      };
      
      await addDoc(productsCollection, productWithStock);
      console.log(`Added product: ${product.title}`);
    }
    
    console.log('All sample products added successfully!');
  } catch (error) {
    console.error('Error adding sample products:', error);
  }
};

// Run the function
addSampleProducts(); 