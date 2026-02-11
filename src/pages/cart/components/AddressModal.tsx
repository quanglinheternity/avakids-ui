import React, { useState, useEffect } from 'react';
import { useAddress, UserAddress } from '../../../contexts/AddressContext';
import { toast } from 'react-toastify';

interface AddressModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddressModal: React.FC<AddressModalProps> = ({
    isOpen,
    onClose,
}) => {
    const { addresses, selectedAddress, selectAddress, createAddress, updateAddress, deleteAddress } = useAddress();

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);
    const [formData, setFormData] = useState({
        recipientName: '',
        phone: '',
        address: '',
        district: '',
        city: '',
        province: '',
        isDefault: false
    });

    useEffect(() => {
        if (editingAddress) {
            setFormData({
                recipientName: editingAddress.recipientName,
                phone: editingAddress.phone,
                address: editingAddress.address,
                district: editingAddress.district,
                city: editingAddress.city,
                province: editingAddress.province,
                isDefault: editingAddress.isDefault
            });
        } else {
            setFormData({
                recipientName: '',
                phone: '',
                address: '',
                district: '',
                city: '',
                province: '',
                isDefault: false
            });
        }
    }, [editingAddress]);

    if (!isOpen) return null;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingAddress) {
                await updateAddress(editingAddress.id, formData);
            } else {
                await createAddress(formData);
            }
            setIsFormOpen(false);
            setEditingAddress(null);
            toast.success(editingAddress ? "Cập nhật địa chỉ thành công!" : "Thêm địa chỉ mới thành công!");
        } catch (error) {
            toast.error("Có lỗi xảy ra khi lưu địa chỉ.");
        }
    };

    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
            try {
                await deleteAddress(id);
                toast.success("Xóa địa chỉ thành công!");
            } catch (error) {
                toast.error("Không thể xóa địa chỉ.");
            }
        }
    };

    const handleEdit = (e: React.MouseEvent, addr: UserAddress) => {
        e.stopPropagation();
        setEditingAddress(addr);
        setIsFormOpen(true);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-[95%] max-w-[550px] max-h-[90vh] overflow-y-auto rounded-[20px] bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
                <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-5">
                    <h3 className="text-20 font-bold text-gray-800">
                        {isFormOpen ? (editingAddress ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới") : "Địa chỉ nhận hàng"}
                    </h3>
                    <button onClick={onClose} className="rounded-full p-1 hover:bg-gray-100 transition-colors">
                        <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-5">
                    {!isFormOpen ? (
                        <div className="space-y-4">
                            {addresses.length > 0 ? (
                                addresses.map(addr => (
                                    <div
                                        key={addr.id}
                                        className={`group relative cursor-pointer rounded-xl border-2 p-4 transition-all hover:shadow-md ${selectedAddress?.id === addr.id ? 'border-pink-500 bg-pink-50/30' : 'border-gray-100'}`}
                                        onClick={() => {
                                            selectAddress(addr);
                                            onClose();
                                        }}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-gray-900">{addr.recipientName}</span>
                                                {addr.isDefault && (
                                                    <span className="rounded-full bg-pink-100 px-3 py-0.5 text-[11px] font-semibold text-pink-600">Mặc định</span>
                                                )}
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={(e) => handleEdit(e, addr)}
                                                    className="text-blue-500 hover:text-blue-700 text-14 font-medium"
                                                >
                                                    Sửa
                                                </button>
                                                <span className="text-gray-300">|</span>
                                                <button
                                                    onClick={(e) => handleDelete(e, addr.id)}
                                                    className="text-red-500 hover:text-red-700 text-14 font-medium"
                                                >
                                                    Xóa
                                                </button>
                                            </div>
                                        </div>
                                        <div className="space-y-1 text-14 text-gray-600">
                                            <p className="flex items-center gap-2">
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                                {addr.phone}
                                            </p>
                                            <p className="flex items-start gap-2">
                                                <svg className="h-4 w-4 mt-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                {addr.address}, {addr.district}, {addr.city}
                                            </p>
                                        </div>
                                        {selectedAddress?.id === addr.id && (
                                            <div className="absolute top-1/2 right-4 -translate-y-1/2">
                                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-500 text-white shadow-sm">
                                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="py-10 text-center">
                                    <p className="text-gray-500">Bạn chưa có địa chỉ nhận hàng nào.</p>
                                </div>
                            )}

                            <button
                                onClick={() => {
                                    setEditingAddress(null);
                                    setIsFormOpen(true);
                                }}
                                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 py-5 text-16 font-semibold text-gray-600 transition-all hover:border-pink-500 hover:text-pink-500 hover:bg-pink-50/20"
                            >
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                <span>Thêm địa chỉ mới</span>
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5 animate-in slide-in-from-right duration-300">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-14 font-semibold text-gray-700 mb-1">Họ tên người nhận</label>
                                    <input
                                        type="text"
                                        name="recipientName"
                                        required
                                        placeholder="VD: Nguyễn Văn A"
                                        className="w-full rounded-xl border-2 border-gray-100 p-3 focus:border-pink-500 focus:outline-none transition-all"
                                        value={formData.recipientName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-14 font-semibold text-gray-700 mb-1">Số điện thoại</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="Số điện thoại"
                                        className="w-full rounded-xl border-2 border-gray-100 p-3 focus:border-pink-500 focus:outline-none transition-all"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-14 font-semibold text-gray-700 mb-1">Địa chỉ cụ thể</label>
                                <input
                                    type="text"
                                    name="address"
                                    required
                                    placeholder="Số nhà, tên đường..."
                                    className="w-full rounded-xl border-2 border-gray-100 p-3 focus:border-pink-500 focus:outline-none transition-all"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-14 font-semibold text-gray-700 mb-1">Quận/Huyện</label>
                                    <input
                                        type="text"
                                        name="district"
                                        required
                                        className="w-full rounded-xl border-2 border-gray-100 p-3 focus:border-pink-500 focus:outline-none transition-all"
                                        value={formData.district}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div>
                                    <label className="block text-14 font-semibold text-gray-700 mb-1">Thành phố/Tỉnh</label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        className="w-full rounded-xl border-2 border-gray-100 p-3 focus:border-pink-500 focus:outline-none transition-all"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl">
                                <input
                                    type="checkbox"
                                    id="isDefault"
                                    name="isDefault"
                                    className="h-5 w-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500 cursor-pointer"
                                    checked={formData.isDefault}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="isDefault" className="text-15 font-medium text-gray-700 cursor-pointer select-none">Đặt làm địa chỉ mặc định</label>
                            </div>

                            <div className="flex gap-4 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsFormOpen(false);
                                        setEditingAddress(null);
                                    }}
                                    className="flex-1 rounded-xl border-2 py-4 font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                                >
                                    Quay lại
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 rounded-xl bg-[#E12D39] py-4 font-bold text-white shadow-lg shadow-red-200 hover:bg-red-600 transition-all active:scale-[0.98]"
                                >
                                    {editingAddress ? "Lưu thay đổi" : "Lưu địa chỉ"}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddressModal;
