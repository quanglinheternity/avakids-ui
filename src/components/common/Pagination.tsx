
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 0; i < totalPages; i++) {
        pages.push(i);
    }

    // Logic to show limited page numbers (e.g., 1 2 3 ... 10) can be added here
    // For now, let's keep it simple or use a sliding window if totalPages is large
    // Simple version: show all or max 5-7 pages

    // Let's implement a smarter view: First, Last, Current, surrounding
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        for (let i = Math.max(0, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (range[0] > 0) {
            if (range[0] > 1) {
                range.unshift(-1); // ellipsis
            }
            range.unshift(0);
        }

        if (range[range.length - 1] < totalPages - 1) {
            if (range[range.length - 1] < totalPages - 2) {
                range.push(-2); // ellipsis
            }
            range.push(totalPages - 1);
        }

        return range;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex items-center justify-center space-x-2 mt-8">
            <button
                onClick={() => onPageChange(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {visiblePages.map((page, index) => (
                page < 0 ? (
                    <span key={`ellipsis-${index}`} className="px-3 py-1 text-gray-400">...</span>
                ) : (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${currentPage === page
                                ? 'bg-primary-600 text-white border border-primary-600 shadow-sm'
                                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                            }`}
                    >
                        {page + 1}
                    </button>
                )
            ))}

            <button
                onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;
