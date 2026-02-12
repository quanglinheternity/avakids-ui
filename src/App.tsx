import { BannerProvider } from "./contexts/BannerContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { AddressProvider } from "./contexts/AddressContext";
import DefaultLayout from "./layouts/components/DefaultLayout/DefaultLayout"
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetailPage from "./pages/product-detail/ProductDetailPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import CartPage from "./pages/cart/CartPage";
import CategoryPage from "./pages/category/CategoryPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import ProfilePage from "./pages/profile/ProfilePage";
import PaymentResultPage from "./pages/payment/PaymentResultPage";
import OrderHistoryPage from "./pages/orders/OrderHistoryPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
            </BannerProvider>
          </CartProvider>
        </AddressProvider>
      </AuthProvider>
    </>

  )
}

export default App
