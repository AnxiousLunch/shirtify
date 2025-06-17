import  { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqCategories = [
  {
    title: 'Orders & Customization',
    icon: '🛒',
    faqs: [
      {
        question: 'How do I place a custom order?',
        answer: 'Simply browse our products, click on the item you want to customize, upload your design or use our design tools, select your preferences (size, color, quantity), and add to cart. Our team will review your design and contact you if any adjustments are needed before production.'
      },
      {
        question: 'What file formats do you accept for custom designs?',
        answer: 'We accept PNG, JPG, PDF, AI, PSD, and SVG files. For best quality, we recommend vector files (AI, SVG) or high-resolution images (300 DPI minimum). Our design team can also help optimize your files for printing.'
      },
      {
        question: 'Can I see a preview before my order is printed?',
        answer: 'Absolutely! We provide a digital mockup of your design on the selected product. You can request revisions until you\'re completely satisfied. We also offer physical samples for large orders (50+ pieces).'
      },
      {
        question: 'What\'s the minimum order quantity?',
        answer: 'We have no minimum order quantity! Whether you need just one custom piece or thousands, we\'re here to help. However, bulk orders (25+ pieces) qualify for volume discounts.'
      },
      {
        question: 'Can I mix different sizes in one order?',
        answer: 'Yes! You can order multiple sizes and even different products in a single order. Our system automatically calculates the best pricing and production timeline for mixed orders.'
      }
    ]
  },
  {
    title: 'Printing & Quality',
    icon: '🎨',
    faqs: [
      {
        question: 'What printing methods do you use?',
        answer: 'We use various premium printing methods including Direct-to-Garment (DTG), Screen Printing, Heat Transfer Vinyl (HTV), and Embroidery. The method depends on your design, quantity, and fabric type. Our team selects the best technique for optimal results.'
      },
      {
        question: 'How long do the prints last?',
        answer: 'Our prints are designed to last! With proper care, DTG prints maintain their quality for 50+ washes, screen prints for 100+ washes, and embroidery is virtually permanent. We provide care instructions with every order.'
      },
      {
        question: 'Do you offer eco-friendly printing options?',
        answer: 'Yes! We use water-based, eco-friendly inks for DTG printing and offer organic cotton and recycled polyester garments. We\'re committed to sustainable practices and can accommodate eco-conscious customers.'
      },
      {
        question: 'What if I\'m not satisfied with the print quality?',
        answer: 'We stand behind our work with a 100% satisfaction guarantee. If you\'re not happy with the quality, we\'ll reprint your order at no extra cost or provide a full refund within 30 days of delivery.'
      }
    ]
  },
  {
    title: 'Shipping & Delivery',
    icon: '🚚',
    faqs: [
      {
        question: 'How long does production and shipping take?',
        answer: 'Standard production takes 3-5 business days, with shipping taking an additional 2-7 days depending on location. Rush orders (24-48 hours) are available for an additional fee. You\'ll receive tracking information once shipped.'
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Yes! We ship to 25+ countries worldwide. International shipping typically takes 7-14 business days. Customs duties and taxes may apply and are the responsibility of the recipient.'
      },
      {
        question: 'Can I track my order?',
        answer: 'Absolutely! You\'ll receive a tracking number via email once your order ships. You can also log into your account dashboard to track all your orders in real-time.'
      },
      {
        question: 'What if my package is lost or damaged?',
        answer: 'We\'re fully insured against lost or damaged packages. If your order doesn\'t arrive or arrives damaged, contact us immediately. We\'ll investigate with the carrier and either locate your package or send a replacement at no charge.'
      }
    ]
  },
  {
    title: 'Returns & Exchanges',
    icon: '↩️',
    faqs: [
      {
        question: 'What\'s your return policy?',
        answer: 'We accept returns within 30 days of delivery for manufacturing defects or errors on our part. Since our products are custom-made, we cannot accept returns for change of mind, but we\'ll work with you to resolve any concerns.'
      },
      {
        question: 'Can I exchange for a different size?',
        answer: 'Size exchanges are possible within 30 days if the item is unworn and in original condition. However, since items are custom-made, exchanges may require reprinting, which could incur additional costs depending on the situation.'
      },
      {
        question: 'How do I initiate a return or exchange?',
        answer: 'Contact our customer service team at support@shirtify.com or through your account dashboard. Provide your order number and photos of any issues. We\'ll guide you through the process and provide a prepaid return label if applicable.'
      }
    ]
  },
  {
    title: 'Account & Payment',
    icon: '💳',
    faqs: [
      {
        question: 'Do I need an account to place an order?',
        answer: 'While you can checkout as a guest, creating an account allows you to track orders, save designs, access exclusive discounts, and manage your order history. Plus, account holders get early access to new products!'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers for large orders. All transactions are secured with 256-bit SSL encryption.'
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Absolutely! We use industry-standard security measures and never store your payment information on our servers. All transactions are processed through secure, PCI-compliant payment gateways.'
      },
      {
        question: 'Do you offer bulk order discounts?',
        answer: 'Yes! We offer tiered pricing: 10% off for 25+ pieces, 15% off for 50+ pieces, 20% off for 100+ pieces, and custom pricing for 500+ pieces. Contact our sales team for enterprise pricing.'
      }
    ]
  }
];

const quickStats = [
  { label: 'Average Response Time', value: '< 2 hours', icon: '⚡' },
  { label: 'Customer Satisfaction', value: '98.5%', icon: '😊' },
  { label: 'FAQ Resolution Rate', value: '85%', icon: '✅' },
];

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  // const [openFAQ, setOpenFAQ] = useState(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);


  const toggleFAQ = (index: number) => {
  setOpenFAQ(openFAQ === index ? null : index);
};


  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="px-4 py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6"
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Got questions? We've got answers! Find everything you need to know about ordering, 
          customization, shipping, and more.
        </motion.p>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
        >
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-xl backdrop-blur-sm">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-blue-400 mb-1">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Main FAQ Section */}
      <div className="px-4 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="sticky top-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-center lg:text-left">Categories</h3>
              <div className="space-y-3">
                {faqCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCategory(index)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center space-x-3 ${
                      activeCategory === index
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-semibold">{category.title}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center space-x-3 mb-8">
                  <span className="text-4xl">{faqCategories[activeCategory].icon}</span>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    {faqCategories[activeCategory].title}
                  </h2>
                </div>

                <div className="space-y-4">
                  {faqCategories[activeCategory].faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-700 transition-colors duration-300"
                      >
                        <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                        <motion.div
                          animate={{ rotate: openFAQ === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-blue-400 text-xl flex-shrink-0"
                        >
                          ▼
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {openFAQ === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 text-white leading-relaxed text-left border-t border-gray-700 pt-4">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Still Have Questions Section */}
      <div className="px-4 py-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Still Have Questions?
            </h2>
            <p className="text-white text-lg mb-8 leading-relaxed">
              Can't find what you're looking for? Our friendly customer support team is here to help! 
              We typically respond within 2 hours during business hours.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-3xl mb-3">📧</div>
                <h3 className="font-bold text-blue-400 mb-2">Email Support</h3>
                <p className="text-gray-300 text-sm mb-3">Get detailed help via email</p>
                <button className="text-purple-400 hover:text-purple-300 transition-colors">
                  support@shirtify.com
                </button>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-3xl mb-3">💬</div>
                <h3 className="font-bold text-blue-400 mb-2">Live Chat</h3>
                <p className="text-gray-300 text-sm mb-3">Instant help when you need it</p>
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform">
                  Start Chat
                </button>
              </div>
              
              <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
                <div className="text-3xl mb-3">📞</div>
                <h3 className="font-bold text-blue-400 mb-2">Phone Support</h3>
                <p className="text-gray-300 text-sm mb-3">Speak directly with our team</p>
                <button className="text-purple-400 hover:text-purple-300 transition-colors">
                  +1 (555) 123-4567
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg font-semibold">
                Contact Support
              </button>
              <button className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg transition-all duration-300 font-semibold">
                Back to Home
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="px-4 py-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold mb-6 text-white">Search Our Knowledge Base</h3>
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full px-6 py-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-colors">
              🔍
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;