import { BannerProvider } from "./contexts/BannerContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import DefaultLayout from "./layouts/components/DefaultLayout/DefaultLayout"
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetailPage from "./pages/product-detail/ProductDetailPage";
import LoginPage from "./pages/auth/LoginPage";
import CartPage from "./pages/cart/CartPage";


function App() {

  return (
    <>
      <AuthProvider>
        <CartProvider>
          <BannerProvider>
            <Routes>
              <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Home />} />
                <Route path="product/:id" element={<ProductDetailPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="cart" element={<CartPage />} />
              </Route>
            </Routes>
          </BannerProvider>
        </CartProvider>
      </AuthProvider>
    </>

  )
}

export default App
