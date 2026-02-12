import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/AuthContext';

interface UserInfo {
    id: number;
    email: string;
    phone: string;
    fullName: string;
    avatarUrl: string | null;
    emailVerifiedAt: string | null;
    createdAt: string;
}

const ProfilePage: React.FC = () => {
    const { user: authUser, login } = useAuth();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Form states
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await api.get('users/myInfo');
                if (response.data?.code === 1000) {
                    const userData = response.data.data;
                    setUserInfo(userData);
                    setFullName(userData.fullName || '');
                    setPhone(userData.phone || '');
                }
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                toast.error('Không thể tải thông tin người dùng.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password && password !== confirmPassword) {
            toast.error('Mật khẩu xác nhận không khớp.');
            return;
        }

        setUpdating(true);

        try {
            const formData = new FormData();

            // Data object
            const updateData: any = {
                fullName,
                phone,
            };

            if (password) {
                updateData.password = password;
            }

            const jsonBlob = new Blob([JSON.stringify(updateData)], { type: 'application/json' });
            formData.append('data', jsonBlob);

            if (avatarFile) {
                formData.append('avatar', avatarFile);
            }

            const response = await api.put('users/update/my', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200 || response.status === 201) {
                toast.success('Cập nhật thông tin thành công!');

                // Extract updated user data from nested response
                const updatedUser = response.data?.data || response.data;

                // Update local auth context
                if (authUser) {
                    login({
                        ...authUser,
                        fullName: fullName,
                        phone: phone,
                        avatarUrl: updatedUser.avatarUrl || authUser.avatarUrl
                    });
                }

                // Update local state
                if (userInfo) {
                    setUserInfo({
                        ...userInfo,
                        fullName,
                        phone,
                        avatarUrl: updatedUser.avatarUrl || userInfo.avatarUrl
                    });
                }

                // Clear password fields
                setPassword('');
                setConfirmPassword('');
            }
        } catch (error: any) {
            console.error('Update profile failed:', error);
            toast.error(error.response?.data?.message || 'Cập nhật thất bại. Vui lòng thử lại.');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar/Overview */}
                <div className="w-full md:w-1/3 lg:w-1/4">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                        <div className="relative inline-block mb-4">
                            <div className="w-24 h-24 rounded-full bg-primary-50 flex items-center justify-center text-primary-500 font-bold text-3xl border-4 border-white shadow-sm overflow-hidden group">
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                                ) : userInfo?.avatarUrl ? (
                                    <img src={userInfo.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <span>{fullName ? fullName.charAt(0).toUpperCase() : 'U'}</span>
                                )}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                    <span className="text-[10px] text-white font-bold uppercase tracking-wider">Cập nhật</span>
                                </div>
                            </div>
                            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md border border-gray-100 text-gray-500 hover:text-primary-500 transition-colors cursor-pointer">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                />
                            </label>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">{fullName || 'Chưa đặt tên'}</h2>
                        <p className="text-sm text-gray-500 mt-1">{userInfo?.email}</p>

                        <div className="mt-6 flex flex-col gap-2">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Đã tham gia</span>
                                <span className="text-sm font-semibold text-gray-700">
                                    {userInfo?.createdAt ? new Date(userInfo.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content/Form */}
                <div className="flex-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <div className="mb-8 overflow-hidden">
                            <h3 className="text-xl font-bold text-gray-900">Thông tin cá nhân</h3>
                            <p className="text-sm text-gray-500 mt-1">Cập nhật thông tin tài khoản của bạn tại đây</p>
                            <div className="h-1 w-12 bg-primary-500 rounded-full mt-4"></div>
                        </div>

                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="fullName" className="text-sm font-bold text-gray-700 ml-1">Họ và tên</label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-gray-700 font-medium"
                                        placeholder="Nhập họ và tên"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-bold text-gray-700 ml-1">Số điện thoại</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-gray-700 font-medium"
                                        placeholder="Nhập số điện thoại"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">Địa chỉ Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="email"
                                        value={userInfo?.email || ''}
                                        disabled
                                        className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 font-medium cursor-not-allowed outline-none"
                                    />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1 bg-green-50 rounded-lg border border-green-100">
                                        <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-[10px] font-bold text-green-600 uppercase">Đã xác minh</span>
                                    </span>
                                </div>
                                <p className="text-[11px] text-gray-400 ml-1 italic">* Email không thể thay đổi để đảm bảo bảo mật tài khoản</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-bold text-gray-700 ml-1">Đổi mật khẩu</label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-gray-700 font-medium"
                                        placeholder="Nhập mật khẩu mới"
                                        autoComplete="new-password"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="confirmPassword" className="text-sm font-bold text-gray-700 ml-1">Xác nhận mật khẩu mới</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all outline-none text-gray-700 font-medium"
                                        placeholder="Xác nhận mật khẩu mới"
                                        autoComplete="new-password"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <p className="text-[11px] text-gray-400 ml-1 italic">* Để trống nếu bạn không muốn thay đổi mật khẩu</p>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-50 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="px-8 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 active:scale-95 transition-all shadow-lg shadow-primary-500/25 disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
                                >
                                    {updating ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Đang lưu...</span>
                                        </>
                                    ) : (
                                        <span>Lưu thay đổi</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
