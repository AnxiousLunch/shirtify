import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase/firebaseConfig';

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().createdAt?.toDate().toLocaleDateString() || 'N/A'
      }));
      setOrders(fetchedOrders);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
            User Dashboard
          </h1>
          <div>
            <Link 
              to="/account" 
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 mr-4 transition-colors duration-200"
            >
              Account
            </Link>
            <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Order History List */}
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 transition-colors duration-200">
                Order History
              </h2>
              {orders.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  No orders found.
                </p>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <Link 
                      to={`/orders/${order.id}`} 
                      key={order.id} 
                      className="block bg-gray-50 dark:bg-gray-700 p-4 rounded-lg hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-bold text-blue-600 dark:text-blue-400 transition-colors duration-200">
                            Order No: {order.id}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                            Date: {order.date}
                          </p>
                          <p className={`text-sm font-medium ${
                            order.status === 'Delivering' 
                              ? 'text-yellow-600 dark:text-yellow-400' 
                              : 'text-green-600 dark:text-green-400'
                          } transition-colors duration-200`}>
                            Status: {order.status}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-800 dark:text-white transition-colors duration-200">
                            ${order.totalAmount.toFixed(2)}
                          </p>
                          <div className="flex items-center text-blue-500 dark:text-blue-400 mt-1 transition-colors duration-200">
                            <span>View Details</span>
                            <FiChevronRight className="ml-1"/>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderHistory;