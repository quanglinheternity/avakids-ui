interface CarouselNavigationProps {
    onPrev: () => void;
    onNext: () => void;
    className?: string;
    buttonClassName?: string;
    prevButtonClassName?: string;
    nextButtonClassName?: string;
}

const CarouselNavigation = ({
    onPrev,
    onNext,
    className = '',
    buttonClassName = '',
    prevButtonClassName = '',
    nextButtonClassName = '',
}: CarouselNavigationProps) => {
    return (
        <>
            {/* Previous Button */}
            <div className={`pointer-events-none absolute inset-y-0 left-4 flex items-center ${className}`}>
                <button
                    type="button"
                    onClick={onPrev}
                    className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/0 text-[#e82e81] shadow-lg backdrop-blur-md transition hover:bg-white/40 ${buttonClassName} ${prevButtonClassName}`}
                    aria-label="Slide trước"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m15 18-6-6 6-6" />
                    </svg>
                </button>
            </div>

            {/* Next Button */}
            <div className={`pointer-events-none absolute inset-y-0 right-4 flex items-center ${className}`}>
                <button
                    type="button"
                    onClick={onNext}
                    className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-red-500 shadow-lg backdrop-blur-md transition hover:bg-white/40 ${buttonClassName} ${nextButtonClassName}`}
                    aria-label="Slide tiếp theo"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </button>
            </div>
        </>
    );
};

export default CarouselNavigation;
