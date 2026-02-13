import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import api from '../../../services/api';

interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    productId: number;
    orderId: number;
    productName: string;
    productImage?: string;
    onSuccess?: () => void;
}

const ReviewModal = ({ isOpen, onClose, productId, orderId, productName, productImage, onSuccess }: ReviewModalProps) => {
    const [rating, setRating] = useState(5);
    const [content, setContent] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setRating(5);
            setContent('');
            setSelectedFile(null);
            setPreviewUrl(null);
        }
    }, [isOpen]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = async () => {
        if (!content.trim()) {
            toast.warning('Vui lòng nhập nội dung đánh giá');
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();

        const reviewData = {
            productId,
            orderId,
            rating,
            content
        };

        // Append data as a JSON string Blob to ensure Content-Type is application/json for the @RequestPart
        formData.append('data', new Blob([JSON.stringify(reviewData)], { type: 'application/json' }));

        if (selectedFile) {
            formData.append('file', selectedFile);
        }

        try {
            const response = await api.post('/reviews/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data?.code === 1000) {
                toast.success('Đánh giá sản phẩm thành công!');
                onClose();
                if (onSuccess) onSuccess();
            } else {
                toast.error(response.data?.message || 'Có lỗi xảy ra khi gửi đánh giá');
            }
        } catch (error: any) {
            console.error('Submit review error:', error);
            toast.error(error.response?.data?.message || 'Không thể gửi đánh giá, vui lòng thử lại sau');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">Đánh giá sản phẩm</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="p-6 space-y-6 overflow-y-auto max-h-[70vh]">
                    {/* Product Info */}
                    <div className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden shrink-0 border border-gray-200">
                            <img
                                src={productImage || "/placeholder-product.png"}
                                alt={productName}
                                className="w-10 h-10 object-contain"
                            // onError={(e) => (e.currentTarget.src = "/placeholder-product.png")}
                            />
                        </div>
                        <p className="text-sm font-semibold text-gray-800 line-clamp-2">{productName}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-sm font-bold text-gray-700">Chất lượng sản phẩm</span>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setRating(star)}
                                    className="focus:outline-none transition-transform active:scale-110"
                                >
                                    <svg
                                        className={`w-8 h-8 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                    </svg>
                                </button>
                            ))}
                        </div>
                        <span className="text-xs font-medium text-yellow-600">
                            {rating === 5 ? 'Tuyệt vời' : rating === 4 ? 'Hài lòng' : rating === 3 ? 'Bình thường' : rating === 2 ? 'Không hài lòng' : 'Tệ'}
                        </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Nội dung đánh giá</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none min-h-[100px] text-sm"
                        />
                    </div>

                    {/* Image Upload */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700">Thêm hình ảnh (tùy chọn)</label>
                        <div className="flex gap-4">
                            <label className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-primary-400 transition-colors text-gray-400 hover:text-primary-500">
                                <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-[10px] font-bold">Thêm ảnh</span>
                                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </label>

                            {previewUrl && (
                                <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-gray-200 group">
                                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setPreviewUrl(null);
                                            setSelectedFile(null);
                                        }}
                                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex-1 py-2.5 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Trở lại
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="flex-1 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-bold hover:bg-primary-700 transition-all shadow-md shadow-primary-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                Đang gửi...
                            </>
                        ) : 'Hoàn thành'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;
