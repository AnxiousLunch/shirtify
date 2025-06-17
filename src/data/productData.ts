import type { ProductType } from '../types/types';

export const products: ProductType[] = [
  {
    id: '1',
    title: 'Premium Cotton Shirt',
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1578932750355-5eb30ece487a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
    ],
    category: 'Premium',
    featured: true,
    description: 'Our premium cotton shirt offers exceptional comfort and durability. Made from 100% organic cotton, this shirt is perfect for both casual and formal occasions.',
    material: '100% Organic Cotton',
    fit: 'Slim Fit',
    manufacturer: 'EcoWear Inc.',
    origin: 'USA',
    reviews: [
      {
        id: 'r1',
        author: 'John D.',
        rating: 5,
        title: 'Excellent Quality',
        comment: 'This shirt is incredibly comfortable and the fabric feels amazing. Definitely worth the price!',
        date: '2023-05-15'
      },
      {
        id: 'r2',
        author: 'Sarah M.',
        rating: 4,
        title: 'Great fit',
        comment: 'Love the slim fit. The material is high quality but it wrinkles a bit easily.',
        date: '2023-04-22'
      }
    ]
  },
  {
    id: '2',
    title: 'Vintage Graphic Tee',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'Vintage',
    featured: true,
    description: 'Retro-inspired graphic tee with a soft vintage wash. Made from a cotton-polyester blend for extra softness and durability.',
    material: '80% Cotton, 20% Polyester',
    fit: 'Regular Fit'
  },
  {
    id: '3',
    title: 'Summer Linen Shirt',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'Summer',
    featured: true,
    description: 'Lightweight linen shirt perfect for summer. Breathable fabric keeps you cool even on the hottest days.',
    material: '100% Linen',
    fit: 'Relaxed Fit'
  },
  {
    id: '4',
    title: 'Casual Button-Down',
    price: 27.99,
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'Casual',
    description: 'Versatile casual shirt that can be dressed up or down. Perfect for everyday wear.',
    material: '100% Cotton',
    fit: 'Regular Fit'
  },
  {
    id: '5',
    title: 'Classic White Tee',
    price: 19.99,
    originalPrice: 24.99,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'Casual',
    featured: true,
    description: 'Essential white t-shirt made from premium combed cotton for extra softness. A wardrobe staple.',
    material: '100% Combed Cotton',
    fit: 'Classic Fit'
  },
  {
    id: '6',
    title: 'Denim Work Shirt',
    price: 44.99,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'Premium',
    description: 'Durable denim shirt with reinforced stitching. Perfect for work or casual wear.',
    material: '100% Cotton Denim',
    fit: 'Regular Fit'
  },
  {
    id: '7',
    title: 'Striped Polo Shirt',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'Casual',
    description: 'Classic polo shirt with a modern striped pattern. Made from piqué cotton for a premium feel.',
    material: '100% Piqué Cotton',
    fit: 'Slim Fit'
  },
  {
    id: '8',
    title: 'Retro Baseball Tee',
    price: 28.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    category: 'Vintage',
    featured: true,
    description: 'Vintage-inspired baseball tee with raglan sleeves. Soft cotton blend fabric for all-day comfort.',
    material: '90% Cotton, 10% Polyester',
    fit: 'Relaxed Fit'
  }
];