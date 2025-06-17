import React from 'react';
import {  Link } from 'react-router-dom';
import { FiChevronLeft } from 'react-icons/fi';

// Mock data for a single order
const mockOrder = {
    id: '1234',
    date: '2023-10-27',
    status: 'Delivering',
    total: 95.50,
    shippingAddress: {
        name: 'John Doe',
        address: '123 Main St, Anytown, USA',
    },
    items: [
        { id: 'prod1', title: 'Classic Blue Tee', size: 'L', quantity: 1, price: 25.00, image: '/path/to/image1.jpg' },
        { id: 'prod2', title: 'Graphic Hoodie', size: 'M', quantity: 1, price: 55.50, image: '/path/to/image2.jpg' },
    ],
    subtotal: 80.50,
    shipping: 15.00,
};

const OrderDetails: React.FC = () => {
    // const { orderId } = useParams();
    const order = mockOrder; 

    if (!order) {
        return <div className="dark:text-white">Order not found</div>;
    }

    return (
        <div className="bg-gray-100 dark:bg-gray-900 min-h-screen py-12 transition-colors duration-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link 
                    to="/order-history" 
                    className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors duration-200"
                >
                    <FiChevronLeft className="mr-1" />
                    Back to Order History
                </Link>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
                    <div className="flex justify-between items-start mb-6 pb-6 border-b dark:border-gray-700 transition-colors duration-200">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
                                Order #{order.id}
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 transition-colors duration-200">
                                Placed on {order.date}
                            </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.status === 'Delivering' 
                                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' 
                                : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'
                        } transition-colors duration-200`}>
                            {order.status}
                        </div>
                    </div>

                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-200">
                        Items Ordered
                    </h2>
                    <div className="divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-200">
                        {order.items.map(item => (
                            <div key={`${item.id}-${item.size}`} className="py-4 flex items-center space-x-6">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-20 h-20 rounded-md object-cover border border-gray-200 dark:border-gray-700 transition-colors duration-200"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-200">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                                        Size: {item.size}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                                        Qty: {item.quantity}
                                    </p>
                                </div>
                                <p className="font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                                    ${item.price.toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 transition-colors duration-200">
                                Shipping Address
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                                {order.shippingAddress.name}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">
                                {order.shippingAddress.address}
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 transition-colors duration-200">
                                Total Summary
                            </h3>
                            <div className="flex justify-between text-gray-600 dark:text-gray-300 transition-colors duration-200">
                                <p>Subtotal</p>
                                <p>${order.subtotal.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-200">
                                <p>Shipping</p>
                                <p>${order.shipping.toFixed(2)}</p>
                            </div>
                            <div className="mt-2 pt-2 border-t dark:border-gray-600 flex justify-between items-center font-bold text-gray-900 dark:text-white transition-colors duration-200">
                                <p>Total</p>
                                <p>${order.total.toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;