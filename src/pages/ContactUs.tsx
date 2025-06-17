import React from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const ContactUs: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen mt-16 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white transition-colors duration-200">
            Contact Us
          </h1>
          <p className="mt-1 text-md text-gray-600 dark:text-gray-300 transition-colors duration-200">
            Have questions? We'd love to hear from you.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-colors duration-200">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 transition-colors duration-200">
              Send a Message 💬
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition dark:bg-gray-700 dark:text-white"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition dark:bg-gray-700 dark:text-white"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition dark:bg-gray-700 dark:text-white"
                  placeholder="Question about an order"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 transition dark:bg-gray-700 dark:text-white"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-600"
                >
                  <FiSend className="mr-2 h-5 w-5" />
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information & Map */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg transition-colors duration-200">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6 transition-colors duration-200">
                Get in Touch 📞
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 transition-colors duration-200">
                <div className="flex items-start">
                  <FiMapPin className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 mr-4 flex-shrink-0 transition-colors duration-200" />
                  <span>
                    <strong className="text-gray-800 dark:text-white transition-colors duration-200">Our Office</strong><br/>
                    123 Fashion Ave, Suite 456<br/>
                    New York, NY 10001, USA
                  </span>
                </div>
                <div className="flex items-center">
                  <FiMail className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 flex-shrink-0 transition-colors duration-200" />
                  <span>
                    <strong className="text-gray-800 dark:text-white transition-colors duration-200">Email Us</strong><br/>
                    <a href="mailto:support@shirtify.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                      support@shirtify.com
                    </a>
                  </span>
                </div>
                <div className="flex items-center">
                  <FiPhone className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 flex-shrink-0 transition-colors duration-200" />
                  <span>
                    <strong className="text-gray-800 dark:text-white transition-colors duration-200">Call Us</strong><br/>
                    <a href="tel:+1234567890" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                      +1 (234) 567-890
                    </a>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-80 transition-colors duration-200">
              {/* Map Placeholder */}
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center transition-colors duration-200">
                <p className="text-gray-500 dark:text-gray-400 transition-colors duration-200">
                  Map loading...
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;