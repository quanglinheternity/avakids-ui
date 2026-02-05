interface DeliveryLocationProps {
    address?: string;
    className?: string;
    showArrow?: boolean;
    onClick?: () => void;
}

const DeliveryLocation: React.FC<DeliveryLocationProps> = ({
    address = 'Chọn địa chỉ giao hàng',
    className = '',
    showArrow = true,
    onClick,
}) => {
    return (
        <div
            className={`w-44 cursor-pointer rounded-full bg-gray-800/25 p-1 transition-all duration-200 hover:bg-gray-800/40 active:scale-[0.98] ${className} `}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick?.();
                    e.preventDefault();
                }
            }}
            aria-label={`Chọn địa chỉ giao hàng: ${address}`}
        >
            <div className="relative flex h-9 w-full items-center rounded-full bg-blue-600 pr-5 pl-8 text-white sm:bg-transparent sm:pl-6">
                <div className="absolute top-1/2 left-2 -translate-y-1/2">
                    <i className="icon-mapHeader size-5"></i>
                </div>
                {/* Nội dung địa chỉ */}
                <div className="flex-1 overflow-hidden pl-1">
                    <div className="line-clamp-1 text-xs font-medium sm:line-clamp-2 md:text-sm">
                        <span className="text-gray-200">Giao đến:</span>
                        <span className="ml-1 block truncate font-semibold">{address}</span>
                    </div>
                </div>

                {/* Mũi tên dropdown (chỉ hiện trên desktop) */}
                {showArrow && (
                    <div className="absolute top-1/2 right-2 hidden -translate-y-1/2 sm:block">
                        <div className="size-2 rotate-[-135deg] border-b-2 border-l-2 border-white/80"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeliveryLocation;
