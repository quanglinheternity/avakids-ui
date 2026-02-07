import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';

export interface Banner {
    id: number;
    title: string;
    imageUrl: string;
    linkUrl: string;
    position: string;
    displayOrder: number;
    startAt: string;
    endAt: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

interface ApiResponse {
    code: number;
    message: string;
    data: Banner[];
}

interface BannerContextType {
    banners: Banner[];
    getBannersByPosition: (position: string) => Banner[];
    isLoading: boolean;
    refreshBanners: () => Promise<void>;
}

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [banners, setBanners] = useState<Banner[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBanners = async () => {
        setIsLoading(true);
        try {
            // Fetch all banners sorted by displayOrder
            const res = await axios.get<ApiResponse>('http://localhost:8080/avakids/api/v1/banners/list');
            setBanners(res.data.data);
        } catch (error) {
            console.error("Failed to fetch banners", error);
            // Fallback empty, components should handle empty state or use their own fallbacks if critical
            setBanners([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const getBannersByPosition = (position: string) => {
        return banners.filter(banner => banner.position === position);
    };

    return (
        <BannerContext.Provider value={{ banners, getBannersByPosition, isLoading, refreshBanners: fetchBanners }}>
            {children}
        </BannerContext.Provider>
    );
};

export const useBanner = () => {
    const context = useContext(BannerContext);
    if (context === undefined) {
        throw new Error('useBanner must be used within a BannerProvider');
    }
    return context;
};
