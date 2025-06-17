import  { useState } from 'react';
import { motion } from 'framer-motion';

const shippingZones = [
  {
    zone: 'Domestic (USA)',
    icon: '🇺🇸',
    methods: [
      { name: 'Standard Shipping', time: '3-5 business days', cost: '$4.99', description: 'Reliable and affordable shipping for most orders' },
      { name: 'Express Shipping', time: '1-2 business days', cost: '$12.99', description: 'Fast delivery when you need it quickly' },
      { name: 'Overnight Shipping', time: 'Next business day', cost: '$24.99', description: 'Lightning-fast delivery for urgent orders' }
    ],
    freeShipping: '$50',
    details: 'All domestic orders are processed within 1-2 business days. Tracking information is provided for all shipments.'
  },
  {
    zone: 'Canada',
    icon: '🇨🇦',
    methods: [
      { name: 'Standard International', time: '7-12 business days', cost: '$12.99', description: 'Cost-effective shipping to Canada' },
      { name: 'Express International', time: '3-5 business days', cost: '$29.99', description: 'Faster delivery across the border' }
    ],
    freeShipping: '$100',
    details: 'Customs duties may apply. We mark packages appropriately and provide all necessary documentation.'
  },
  {
    zone: 'Europe',
    icon: '🇪🇺',
    methods: [
      { name: 'Standard International', time: '10-15 business days', cost: '$15.99', description: 'Economical shipping to European countries' },
      { name: 'Express International', time: '5-8 business days', cost: '$35.99', description: 'Priority delivery to Europe' }
    ],
    freeShipping: '$150',
    details: 'VAT and duties may apply depending on destination country. Delivery times may vary during peak seasons.'
  },
  {
    zone: 'Asia Pacific',
    icon: '🌏',
    methods: [
      { name: 'Standard International', time: '12-20 business days', cost: '$18.99', description: 'Reliable shipping across the Pacific' },
      { name: 'Express International', time: '6-10 business days', cost: '$39.99', description: 'Expedited delivery to Asia Pacific' }
    ],
    freeShipping: '$150',
    details: 'Remote locations may require additional delivery time. Custom clearance procedures may cause delays.'
  },
  {
    zone: 'Rest of World',
    icon: '🌍',
    methods: [
      { name: 'Standard International', time: '15-25 business days', cost: '$22.99', description: 'Global shipping to all other destinations' },
      { name: 'Express International', time: '8-12 business days', cost: '$45.99', description: 'Faster worldwide delivery' }
    ],
    freeShipping: '$200',
    details: 'Delivery times vary by location. Additional customs documentation may be required for some countries.'
  }
];

const productionTimes = [
  { type: 'Standard Orders', time: '3-5 business days', icon: '👕', description: 'Most custom apparel orders' },
  { type: 'Complex Designs', time: '5-7 business days', icon: '🎨', description: 'Multi-color or detailed artwork' },
  { type: 'Embroidery', time: '5-8 business days', icon: '🧵', description: 'Embroidered items require additional time' },
  { type: 'Large Orders (50+)', time: '7-10 business days', icon: '📦', description: 'Bulk orders need extra production time' },
  { type: 'Rush Orders', time: '24-48 hours', icon: '⚡', description: 'Express production (additional fees apply)' }
];

const policyHighlights = [
  {
    title: 'Free Shipping Thresholds',
    icon: '🚚',
    content: 'Enjoy free shipping on orders over our minimum thresholds. Thresholds vary by region to account for shipping costs.',
    details: ['USA: $50+', 'Canada: $100+', 'Europe: $150+', 'Asia Pacific: $150+', 'Rest of World: $200+']
  },
  {
    title: 'Order Processing',
    icon: '⚙️',
    content: 'All orders are processed Monday through Friday, excluding holidays. Production begins after design approval.',
    details: ['Orders placed before 2 PM EST are processed same day', 'Weekend orders processed on Monday', 'Design approval required before production', 'Rush processing available for urgent orders']
  },
  {
    title: 'Tracking & Insurance',
    icon: '🔍',
    content: 'Every shipment includes tracking and insurance. You\'ll receive tracking information via email once shipped.',
    details: ['Real-time tracking updates', 'Insurance included up to $100', 'SMS notifications available', 'Delivery confirmation required for high-value orders']
  },
  {
    title: 'International Shipping',
    icon: '🌐',
    content: 'We ship worldwide with proper customs documentation. Additional duties and taxes may apply.',
    details: ['Customs forms completed accurately', 'Commercial invoices provided', 'Restricted items policy followed', 'Local duties/taxes are customer responsibility']
  }
];

const ShippingPolicy = () => {
  const [activeZone, setActiveZone] = useState(0);

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
          Shipping Policy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Fast, reliable, and secure shipping worldwide. Get your custom creations delivered safely to your door.
        </motion.p>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-3xl mb-2">🌍</div>
            <div className="text-2xl font-bold text-blue-400 mb-1">25+</div>
            <div className="text-gray-300">Countries Served</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-3xl mb-2">📦</div>
            <div className="text-2xl font-bold text-blue-400 mb-1">99.5%</div>
            <div className="text-gray-300">On-Time Delivery</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-3xl mb-2">🚚</div>
            <div className="text-2xl font-bold text-blue-400 mb-1">3-5</div>
            <div className="text-gray-300">Days Production</div>
          </div>
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-6 rounded-xl backdrop-blur-sm">
            <div className="text-3xl mb-2">🔒</div>
            <div className="text-2xl font-bold text-blue-400 mb-1">100%</div>
            <div className="text-gray-300">Insured Shipments</div>
          </div>
        </motion.div>
      </div>

      {/* Production Times Section */}
      <div className="px-4 py-16 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Production Times
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productionTimes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-800 p-6 rounded-xl hover:scale-105 transition-all duration-300 hover:shadow-lg"
              >
                <div className="text-4xl mb-4 text-center">{item.icon}</div>
                <h3 className="text-xl font-bold text-blue-400 mb-2 text-center">{item.type}</h3>
                <div className="text-2xl font-bold text-white mb-3 text-center">{item.time}</div>
                <p className="text-gray-300 text-center text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-8 rounded-2xl backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold mb-4 text-center text-white">Production Process</h3>
            <div className="text-white leading-relaxed text-left max-w-4xl mx-auto">
              <p className="mb-4">
                Our production process is designed for quality and efficiency. Once you place an order, our design team 
                reviews your artwork for print quality and compatibility. After approval, your order enters our production 
                queue where skilled craftspeople bring your vision to life using state-of-the-art equipment.
              </p>
              <p className="mb-4">
                Quality control is performed at every step to ensure your custom apparel meets our high standards. 
                Rush orders are available for urgent needs, with production completed within 24-48 hours for an additional fee.
              </p>
              <p>
                All production times begin after design approval and payment confirmation. Orders placed on weekends 
                or holidays will begin processing on the next business day.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Shipping Zones Section */}
      <div className="px-4 py-16 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Shipping Zones & Rates
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Zone Selector */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="sticky top-8"
            >
              <h3 className="text-2xl font-bold mb-6 text-center lg:text-left">Select Zone</h3>
              <div className="space-y-3">
                {shippingZones.map((zone, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveZone(index)}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-300 flex items-center space-x-3 ${
                      activeZone === index
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{zone.icon}</span>
                    <span className="font-semibold">{zone.zone}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Zone Details */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeZone}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-3 mb-8">
                <span className="text-4xl">{shippingZones[activeZone].icon}</span>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {shippingZones[activeZone].zone}
                </h2>
              </div>

              {/* Free Shipping Banner */}
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-4 rounded-xl mb-6 border border-green-500/30">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🎉</span>
                  <div>
                    <h4 className="font-bold text-green-400">Free Shipping Available!</h4>
                    <p className="text-white">Orders over {shippingZones[activeZone].freeShipping} qualify for free standard shipping</p>
                  </div>
                </div>
              </div>

              {/* Shipping Methods */}
              <div className="space-y-4 mb-8">
                {shippingZones[activeZone].methods.map((method, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-blue-400 mb-2">{method.name}</h3>
                        <p className="text-gray-300 text-sm">{method.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">{method.cost}</div>
                        <div className="text-purple-400 font-semibold">{method.time}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Zone Details */}
              <div className="bg-gray-800/50 p-6 rounded-xl backdrop-blur-sm">
                <h4 className="font-bold text-blue-400 mb-3">Important Information</h4>
                <p className="text-white leading-relaxed text-left">{shippingZones[activeZone].details}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Policy Highlights */}
      <div className="px-4 py-16 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Shipping Policy Highlights
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {policyHighlights.map((policy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-800 p-8 rounded-xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-4xl">{policy.icon}</span>
                  <h3 className="text-2xl font-bold text-blue-400">{policy.title}</h3>
                </div>
                <p className="text-white mb-6 leading-relaxed text-left">{policy.content}</p>
                <ul className="space-y-2">
                  {policy.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-center text-gray-300">
                      <span className="text-purple-400 mr-3">•</span>
                      <span className="text-left">{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Special Circumstances */}
      <div className="px-4 py-16 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
        >
          Special Circumstances
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-red-900/30 to-orange-900/30 p-6 rounded-xl border border-red-500/30"
          >
            <div className="text-3xl mb-4 text-center">⚠️</div>
            <h3 className="text-xl font-bold text-red-400 mb-4 text-center">Weather Delays</h3>
            <p className="text-white text-left leading-relaxed text-sm">
              Severe weather conditions may cause shipping delays beyond our control. We'll notify you immediately 
              of any weather-related delays and provide updated delivery estimates.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 p-6 rounded-xl border border-yellow-500/30"
          >
            <div className="text-3xl mb-4 text-center">🎄</div>
            <h3 className="text-xl font-bold text-yellow-400 mb-4 text-center">Holiday Seasons</h3>
            <p className="text-white text-left leading-relaxed text-sm">
              During peak seasons (Black Friday, Christmas, etc.), production and shipping times may be extended. 
              We recommend placing orders early and offer holiday rush services.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-6 rounded-xl border border-blue-500/30"
          >
            <div className="text-3xl mb-4 text-center">📋</div>
            <h3 className="text-xl font-bold text-blue-400 mb-4 text-center">Address Changes</h3>
            <p className="text-white text-left leading-relaxed text-sm">
              Address changes are possible before shipment. Once shipped, we cannot redirect packages. 
              Contact us immediately if you need to update your shipping address.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Lost or Damaged Packages */}
      <div className="px-4 py-16 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Lost or Damaged Packages
            </h2>
            <div className="bg-gray-800/50 p-8 rounded-2xl backdrop-blur-sm">
              <div className="text-6xl mb-6">🛡️</div>
              <h3 className="text-2xl font-bold text-blue-400 mb-4">100% Protection Guarantee</h3>
              <div className="text-white leading-relaxed text-left space-y-4">
                <p>
                  We stand behind every shipment with our comprehensive protection guarantee. All packages are 
                  fully insured and tracked from our facility to your door.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-400 mb-2">Lost Packages</h4>
                    <p className="text-sm">If your package is lost in transit, we'll send a replacement at no charge or provide a full refund.</p>
                  </div>
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-400 mb-2">Damaged Items</h4>
                    <p className="text-sm">Damaged items will be reprinted and shipped immediately. Just send us photos of the damage.</p>
                  </div>
                </div>
                <p className="text-center mt-6">
                  <strong>Report issues within 7 days of delivery for fastest resolution.</strong>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6 text-white">Questions About Shipping?</h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Our shipping specialists are here to help! Whether you need expedited delivery, 
              have questions about international shipping, or need to track an order, we're just a click away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-lg hover:scale-105 transition-all duration-300 hover:shadow-lg font-semibold">
                Track Your Order
              </button>
              <button className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg transition-all duration-300 font-semibold">
                Contact Shipping Support
              </button>
            </div>

            <div className="mt-8 text-sm text-gray-400">
              Last updated: June 2025 | Subject to change without notice
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;