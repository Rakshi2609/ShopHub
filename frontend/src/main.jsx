import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import store from './redux/store';
import './index.css';

// Components
import Header from './components/Header';
import CategoryMarquee from './components/CategoryMarquee';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Loader from './components/Loader';

// Eager load critical pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Lazy load other pages
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const OrderPage = lazy(() => import('./pages/OrderPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const ProductsListPage = lazy(() => import('./pages/admin/ProductsListPage'));
const AddProductPage = lazy(() => import('./pages/admin/AddProductPage'));
const BecomeSellerPage = lazy(() => import('./pages/seller/BecomeSellerPage'));
const SellerDashboard = lazy(() => import('./pages/seller/SellerDashboard'));
const SellerAddProductPage = lazy(() => import('./pages/seller/SellerAddProductPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header />
            <CategoryMarquee />
            <main className="flex-grow">
              <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route
                  path="/checkout"
                  element={
                    <PrivateRoute>
                      <CheckoutPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/order/:id"
                  element={
                    <PrivateRoute>
                      <OrderPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <PrivateRoute>
                      <OrdersPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/products"
                  element={
                    <AdminRoute>
                      <ProductsListPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/products/add"
                  element={
                    <AdminRoute>
                      <AddProductPage />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/become-seller"
                  element={
                    <PrivateRoute>
                      <BecomeSellerPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/seller/dashboard"
                  element={
                    <PrivateRoute>
                      <SellerDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/seller/add-product"
                  element={
                    <PrivateRoute>
                      <SellerAddProductPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <ProfilePage />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              </Suspense>
            </main>
            <Footer />
            <Toaster position="top-right" />
          </div>
        </Router>
      </Provider>
    </HelmetProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
