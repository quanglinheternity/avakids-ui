import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Define the shape of a product (adjust based on your actual Product type if available)
export interface Product {
    id: number | string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    slug?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: number | string) => void;
    updateQuantity: (productId: number | string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    totalDiscount: number;
    finalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Failed to parse cart from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Failed to save cart to localStorage", error);
        }
    }, [cartItems]);

    // Initial dummy data for testing if empty
    useEffect(() => {
        if (cartItems.length === 0) {
            // Optional: seeding for demonstration purposes as requested by user context
            // You can remove this block later
        }
    }, []);


    const addToCart = (product: Product, quantity: number = 1) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId: number | string) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: number | string, newQuantity: number) => {
        if (newQuantity < 1) {
            return; // Optionally remove if quantity becomes 0, but usually min is 1
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const totalPrice = cartItems.reduce((total, item) => total + (item.originalPrice || item.price) * item.quantity, 0);

    // Assuming 'price' is the discounted price and 'originalPrice' is the list price.
    // If originalPrice is missing, we assume no discount.
    const finalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const totalDiscount = totalPrice - finalPrice;


    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice,
            totalDiscount,
            finalPrice
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
