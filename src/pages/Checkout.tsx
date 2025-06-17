// src/pages/Checkout.tsx
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { FiLock } from 'react-icons/fi';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';

const Checkout: React.FC = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    alert('Please log in to place an order.');
    return;
  }

  const { items, clearCart } = useCart();

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 15.00 : 0;
  const totalAmount = subtotal + shipping;
  
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const city = (document.getElementById('city') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;

    const orderData = {
      userId: user.uid,
      user: {
        name,
        email,
        address,
        city,
        phone,
      },
      items: items.map(item => ({
        id: item.id,
        title: item.title,
        quantity: item.quantity,
        size: item.size,
        price: item.price,
      })),
      subtotal,
      shipping,
      totalAmount,
      createdAt: Timestamp.now(),
      status: 'Processing',
    };

    try {
      await addDoc(collection(db, 'orders'), orderData);
      alert('Order placed successfully!');
      clearCart();
      window.location.href = '/order-history';
    } catch (error) {
      console.error('Error placing order:', error);
      alert('There was an error placing your order. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Checkout</h1>
          <Link 
            to="/account" 
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
          >
            Account
          </Link>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Side: User & Payment Info */}
          <div className="md:col-span-2 space-y-8">
            {/* User Information */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-200 mb-4">
                User Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    Address
                  </label>
                  <input 
                    type="text" 
                    id="address" 
                    required 
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    City
                  </label>
                  <input 
                    type="text" 
                    id="city" 
                    required 
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    Phone
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    required 
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-200 mb-4">
                Payment Information
              </h2>
              <div>
                <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  Card Number
                </label>
                <input 
                  type="text" 
                  id="card-number" 
                  placeholder="•••• •••• •••• ••••" 
                  required 
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white transition-colors duration-200"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    Expiration
                  </label>
                  <input 
                    type="text" 
                    id="expiry" 
                    placeholder="MM/YY" 
                    required 
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  />
                </div>
                <div>
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                    CVC
                  </label>
                  <input 
                    type="text" 
                    id="cvc" 
                    placeholder="•••" 
                    required 
                    className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white transition-colors duration-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Items Summary */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md sticky top-28 transition-colors duration-200">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-200 mb-4">
                Items in Order
              </h2>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-200 transition-colors duration-200">
                        {item.title} <span className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">x{item.quantity}</span>
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                        Size: {item.size}
                      </p>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 transition-colors duration-200">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <div className="flex justify-between text-gray-600 dark:text-gray-300 transition-colors duration-200">
                  <p>Subtotal</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-300 transition-colors duration-200 mt-2">
                  <p>Shipping</p>
                  <p>${shipping.toFixed(2)}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center text-lg font-bold text-gray-900 dark:text-white transition-colors duration-200">
                  <p>Total</p>
                  <p>${totalAmount.toFixed(2)}</p>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-3 rounded-md font-semibold transition-colors duration-200 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              >
                <FiLock className="mr-2"/>
                Place Order
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Checkout;