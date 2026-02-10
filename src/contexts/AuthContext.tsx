import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import Cookies from 'js-cookie';

// Define the shape of the user object
interface User {
    email: string;
    name?: string;
    token?: string;
    refreshToken?: string;
}

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // Initialize state from localStorage and Cookies on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const token = Cookies.get('token');

        if (storedUser && token) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse user from local storage", error);
                logout();
            }
        } else if (!token) {
            // If no token, we should probably clear user as well
            logout();
        }
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        // Ensure tokens are in cookies (usually handled by LoginPage, but good for consistency)
        if (userData.token) {
            Cookies.set('token', userData.token, { expires: 7 });
        }
        if (userData.refreshToken) {
            Cookies.set('refreshToken', userData.refreshToken, { expires: 7 });
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        // Redirect to login if needed, or let the app handle it via isAuthenticated
    };

    const isAuthenticated = !!user && !!Cookies.get('token');

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
