import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    message = "Bạn có chắc muốn bỏ sản phẩm này?"
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-[90%] max-w-[400px] rounded-[16px] bg-white p-6 shadow-xl animate-in fade-in zoom-in duration-200">
                <p className="mb-6 text-center text-[18px] font-500 leading-normal text-gray-800">
                    {message}
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={onConfirm}
                        className="flex-1 rounded-[12px] bg-[#FFE1E5] py-3 text-[16px] font-600 text-[#E12D39] transition-colors hover:bg-[#FFD1D8]"
                    >
                        Chắc chắn
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 rounded-[12px] bg-[#E12D39] py-3 text-[16px] font-600 text-white transition-colors hover:bg-red-600"
                    >
                        Không
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
