import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../services/api';

export interface Product {
    id: number | string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    slug?: string;
}

export interface CartItem {
    id: number;
    variantId: number;
    name: string;
    price: number;
    originalPrice?: number;
    quantity: number;
    subtotal: number;
    image: string; // Placeholder for now as requested
}

interface CartContextType {
    cartItems: CartItem[];
    refreshCart: () => Promise<void>;
    removeFromCart: (cartItemId: number) => Promise<void>;
    updateQuantity: (cartItemId: number, quantity: number) => Promise<void>;
    clearCart: () => Promise<void>;
    totalItems: number;
    totalPrice: number;
    totalDiscount: number;
    finalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [summary, setSummary] = useState({
        totalItems: 0,
        totalAmount: 0
    });

    const refreshCart = async () => {
        try {
            const response = await api.get('/cart-items/getAllSummary');
            const data = response.data.data;

            const mappedItems: CartItem[] = (data.items || []).map((item: any) => ({
                id: item.id,
                variantId: item.variantId,
                name: item.variantName,
                price: item.variantPrice,
                quantity: item.quantity,
                subtotal: item.subtotal,
                image: item.productImage // Placeholder as requested
            }));

            setCartItems(mappedItems);
            setSummary({
                totalItems: data.totalItems || 0,
                totalAmount: data.totalAmount || 0
            });
        } catch (error) {
            console.error("Failed to fetch cart summary", error);
        }
    };

    useEffect(() => {
        refreshCart();
    }, []);

    const removeFromCart = async (cartItemId: number) => {
        try {
            await api.delete(`/cart-items/deleteItems/${cartItemId}`);
            await refreshCart();
        } catch (error) {
            console.error("Failed to remove item", error);
        }
    };

    const updateQuantity = async (cartItemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;
        try {
            // Using placeholder logic for update endpoint, adjust as needed
            await api.put(`/cart-items/updateCart/${cartItemId}`, { quantity: newQuantity });
            await refreshCart();
        } catch (error) {
            console.error("Failed to update quantity", error);
        }
    };

    const clearCart = async () => {
        try {
            await api.delete('/cart-items/clear');
            await refreshCart();
        } catch (error) {
            console.error("Failed to clear cart", error);
        }
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            refreshCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems: summary.totalItems,
            totalPrice: summary.totalAmount, // Map totalAmount to totalPrice as fallback
            totalDiscount: 0, // Backend doesn't provide this yet
            finalPrice: summary.totalAmount
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
