import { BannerProvider } from "./contexts/BannerContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { AddressProvider } from "./contexts/AddressContext";
import DefaultLayout from "./layouts/components/DefaultLayout/DefaultLayout"
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetailPage from "./pages/product-detail/ProductDetailPage";
import LoginPage from "./pages/auth/LoginPage";
import CartPage from "./pages/cart/CartPage";
import CategoryPage from "./pages/category/CategoryPage";
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
                  <Route path="cart" element={<CartPage />} />
                  <Route path="category/:slug" element={<CategoryPage />} />
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
