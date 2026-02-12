import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BannerProvider } from "./contexts/BannerContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { AddressProvider } from "./contexts/AddressContext";
import DefaultLayout from "./layouts/components/DefaultLayout/DefaultLayout"

// Lazy load pages
const Home = React.lazy(() => import("./pages/Home"));
const ProductDetailPage = React.lazy(() => import("./pages/product-detail/ProductDetailPage"));
const LoginPage = React.lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/auth/RegisterPage"));
const CartPage = React.lazy(() => import("./pages/cart/CartPage"));
const CategoryPage = React.lazy(() => import("./pages/category/CategoryPage"));
const CheckoutPage = React.lazy(() => import("./pages/checkout/CheckoutPage"));
const ProfilePage = React.lazy(() => import("./pages/profile/ProfilePage"));
const PaymentResultPage = React.lazy(() => import("./pages/payment/PaymentResultPage"));
const OrderHistoryPage = React.lazy(() => import("./pages/orders/OrderHistoryPage"));

function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AuthProvider>
        <AddressProvider>
          <CartProvider>
            <BannerProvider>
              <Suspense fallback={
                <div className="flex items-center justify-center h-screen w-full">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="product/:id" element={<ProductDetailPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                    <Route path="category/:slug" element={<CategoryPage />} />
                    <Route path="search" element={<CategoryPage />} />
                    <Route path="payment-result" element={<PaymentResultPage />} />
                    <Route path="orders" element={<OrderHistoryPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                  </Route>
                </Routes>
              </Suspense>
            </BannerProvider>
          </CartProvider>
        </AddressProvider>
      </AuthProvider>
    </>
  )
}

export default App
