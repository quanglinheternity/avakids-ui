import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export interface UserAddress {
    id: number;
    recipientName: string;
    phone: string;
    address: string;
    district: string;
    city: string;
    province: string;
    isDefault: boolean;
}

interface AddressContextType {
    addresses: UserAddress[];
    selectedAddress: UserAddress | null;
    fetchAddresses: () => Promise<void>;
    selectAddress: (address: UserAddress) => void;
    deleteAddress: (addressId: number) => Promise<void>;
    updateAddress: (addressId: number, data: Partial<Omit<UserAddress, 'id'>>) => Promise<void>;
    createAddress: (data: Omit<UserAddress, 'id'>) => Promise<void>;
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [addresses, setAddresses] = useState<UserAddress[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(null);

    const fetchAddresses = useCallback(async () => {
        try {
            const response = await api.get('/userAddress/list');
            const data = response.data.data || [];
            setAddresses(data);

            // Auto-select default or first available if none selected
            if (!selectedAddress) {
                const defaultAddr = data.find((addr: UserAddress) => addr.isDefault);
                if (defaultAddr) {
                    setSelectedAddress(defaultAddr);
                } else if (data.length > 0) {
                    setSelectedAddress(data[0]);
                }
            } else {
                // Keep selected address updated if it still exists
                const updatedSelected = data.find((addr: UserAddress) => addr.id === selectedAddress.id);
                if (updatedSelected) {
                    setSelectedAddress(updatedSelected);
                }
            }
        } catch (error) {
            console.error("Failed to fetch addresses:", error);
        }
    }, [selectedAddress]);

    const selectAddress = (address: UserAddress) => {
        setSelectedAddress(address);
    };

    const deleteAddress = async (addressId: number) => {
        try {
            await api.delete(`/userAddress/${addressId}/delete`);
            if (selectedAddress?.id === addressId) {
                setSelectedAddress(null);
            }
            await fetchAddresses();
        } catch (error) {
            console.error("Failed to delete address:", error);
            throw error;
        }
    };

    const updateAddress = async (addressId: number, data: Partial<Omit<UserAddress, 'id'>>) => {
        try {
            await api.put(`/userAddress/${addressId}/update`, data);
            await fetchAddresses();
        } catch (error) {
            console.error("Failed to update address:", error);
            throw error;
        }
    };

    const createAddress = async (data: Omit<UserAddress, 'id'>) => {
        try {
            await api.post('/userAddress/create', data);
            await fetchAddresses();
        } catch (error) {
            console.error("Failed to create address:", error);
            throw error;
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    return (
        <AddressContext.Provider value={{
            addresses,
            selectedAddress,
            fetchAddresses,
            selectAddress,
            deleteAddress,
            updateAddress,
            createAddress
        }}>
            {children}
        </AddressContext.Provider>
    );
};

export const useAddress = () => {
    const context = useContext(AddressContext);
    if (!context) {
        throw new Error('useAddress must be used within an AddressProvider');
    }
    return context;
};
