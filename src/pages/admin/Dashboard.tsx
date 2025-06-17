import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { FiPackage, FiDollarSign, FiShoppingBag, FiUserPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: any;
  user: {
    name: string;
    email: string;
  };
}

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [processingOrders, setProcessingOrders] = useState(0);
  const [adminEmail, setAdminEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch all orders
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Order[];
      
      setOrders(fetchedOrders);
      
      // Calculate statistics
      const revenue = fetchedOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const processing = fetchedOrders.filter(order => order.status === 'Processing').length;
      
      setTotalRevenue(revenue);
      setTotalOrders(fetchedOrders.length);
      setProcessingOrders(processing);
    });

    return () => unsubscribe();
  }, []);

  const makeUserAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    try {
      // Find user by email
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', adminEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setMessage('No user found with this email address.');
        return;
      }

      // Get the first matching user document
      const userDoc = querySnapshot.docs[0];
      
      // Update the user document to make them an admin
      await updateDoc(doc(db, 'users', userDoc.id), {
        isAdmin: true
      });

      setMessage(`Successfully made ${adminEmail} an admin!`);
      setAdminEmail('');
    } catch (error) {
      console.error('Error making user admin:', error);
      setMessage('Error making user admin. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Admin Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <FiDollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <FiShoppingBag className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
                <FiPackage className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Processing Orders</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{processingOrders}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Management Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Admin Management</h2>
            <form onSubmit={makeUserAdmin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Make User Admin
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="email"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="Enter user's email"
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                  <button
                    type="submit"
                    className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <FiUserPlus className="mr-2" />
                    Make Admin
                  </button>
                </div>
              </div>
              {message && (
                <p className={`text-sm ${message.includes('Successfully') ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{order.id.slice(0, 8)}...</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{order.user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' : 
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                            'bg-blue-100 text-blue-800'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${order.totalAmount.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {order.createdAt.toDate().toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Additional Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-20">
          <Link
            to="/admin/products"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Manage Products</h2>
            <p className="text-gray-600 dark:text-gray-400">Add, edit, or remove products from your store</p>
          </Link>

          <Link
            to="/admin/add-sample-products"
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Add Sample Products</h2>
            <p className="text-gray-600 dark:text-gray-400">Quickly add sample products to your store</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 