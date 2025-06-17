import { FiInstagram, FiTwitter, FiFacebook, FiYoutube } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Shirtify</h3>
            <p className="text-sm">
              Your one-stop destination for custom shirts. Design, create, and express yourself.
            </p>
            <div className="flex space-x-4">
              <a href="/instagram" className="hover:text-white transition-colors">
                <FiInstagram className="h-6 w-6" />
              </a>
              <a href="/twitter" className="hover:text-white transition-colors">
                <FiTwitter className="h-6 w-6" />
              </a>
              <a href="/facebook" className="hover:text-white transition-colors">
                <FiFacebook className="h-6 w-6" />
              </a>
              <a href="/youtube" className="hover:text-white transition-colors">
                <FiYoutube className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/faqs" className="hover:text-white transition-colors">FAQs</a></li>
              <li><a href="/shipping" className="hover:text-white transition-colors">Shipping Policy</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2">
<li>
  <Link to="/collections?category=Casual" className="hover:text-white transition-colors">
    Casual Shirts
  </Link>
</li>
<li>
  <Link to="/collections?category=Vintage" className="hover:text-white transition-colors">
    Vintage Shirts
  </Link>
</li>
<li>
  <Link to="/collections?category=Premium" className="hover:text-white transition-colors">
    Premium Shirts
  </Link>
</li>
<li>
  <Link to="/collections?category=Summer" className="hover:text-white transition-colors">
    Summer Collection
  </Link>
</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Stay Updated</h4>
            <p className="text-sm mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; 2024 Shirtify. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-sm hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-sm hover:text-white transition-colors">Terms of Service</a>
              <a href="/cookies" className="text-sm hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 