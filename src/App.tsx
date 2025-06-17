import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collections from './pages/Collections';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import SearchResultsPage from './components/SearchResultsPage';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import OrderHistory from './pages/OrderHistory';
import OrderDetails from './pages/OrderDetails';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ContactUs from './pages/ContactUs';
import About from './pages/About';
import FAQ from "./pages/Faq";
import Shipping from "./pages/Shipping";
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import SetupAdmin from './pages/SetupAdmin';
import AddSampleProducts from './pages/admin/AddSampleProducts';
import Customization from './pages/Customization';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AdminProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/about" element={<About />} />
                <Route path="/faqs" element={<FAQ />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/setup-admin" element={<SetupAdmin />} />
                <Route path='/customizations' element={<Customization/>}/>
                
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/search" element={<SearchResultsPage />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/current-orders" element={<OrderDetails />} />
                  <Route path="/order-history" element={<OrderHistory />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<AdminRoute />}>
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route path="/admin/add-sample-products" element={<AddSampleProducts />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </AdminProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;