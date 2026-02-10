


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../services/api';

interface ReviewSummary {
    averageRating: number;
    reviewCount: number;
    ratingCount: number;
    ratingDistribution: {
        [key: number]: number;
    };
}

interface Review {
    id: number;
    reviewerName: string;
    rating: number;
    comment: string;
    createdAt: string;
}

const ProductReviews = () => {
    const { id } = useParams();
    const [summary, setSummary] = useState<ReviewSummary | null>(null);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReviewsData = async () => {
            if (!id) return;
            setIsLoading(true);
            setError(null);
            try {
                const [summaryRes, listRes] = await Promise.all([
                    api.get(`/reviews/${id}/summary`),
                    api.get(`/reviews/product/${id}`)
                ]);

                setSummary(summaryRes.data.data);
                setReviews(listRes.data.data);
            } catch (err: any) {
                console.error("Failed to fetch reviews", err);
                setError("Không thể tải đánh giá sản phẩm.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviewsData();
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex h-[200px] items-center justify-center rounded-[16px] bg-white border border-gray-200">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-pink-600"></div>
            </div>
        );
    }

    if (error || !summary) {
        return null; // Or show error message
    }

    return (
        <div id="commentRating" className="flex flex-col gap-[14px] rounded-[16px] bg-white p-[20px] border border-gray-200 dark:border-gray-700">
            <div className="flex gap-[8px]">
                <div className="flex gap-[12px] items-center">
                    <span className="h-[22px] w-[4px] rounded-br-[4px] rounded-tr-[4px] bg-gradient-to-r from-[#ED1164] to-[#FF438A]"></span>
                    <p className="text-[18px] font-700 leading-[22px] text-primary-400">Đánh giá</p>
                </div>
            </div>

            <div className="flex w-full justify-between gap-[12px]">
                {/* Rating Score */}
                <div className="w-[40%] text-center">
                    <div className="m-[20px]">
                        <span className="text-[50px] font-700 text-primary-400">{summary.averageRating.toFixed(1)}</span>
                        <span className="text-[25px] font-700 text-primary-400">/5</span>
                    </div>
                    <span className="block text-[12px] font-500 leading-[16px] text-gray-700">{summary.reviewCount} Đánh giá</span>
                </div>

                {/* Progress Bars */}
                <div className="mx-[10px] flex w-full flex-col gap-[10px]">
                    {[5, 4, 3, 2, 1].map((star) => {
                        const count = summary.ratingDistribution[star] || 0;
                        const percentage = summary.reviewCount > 0 ? (count / summary.reviewCount) * 100 : 0;
                        return (
                            <div key={star} className="flex items-center gap-[10px]">
                                <div className="flex w-[40px] gap-[10px] items-center">
                                    <span className="text-[11px] font-700 text-black-100">{star}</span>
                                    <span className="text-yellow-400 text-xs">★</span>
                                </div>
                                <div className="h-[8px] w-full overflow-hidden rounded-full bg-pink-100">
                                    <div
                                        className="h-full rounded-full bg-[linear-gradient(90deg,#ED1164_30.6%,#FF438A_83.54%)]"
                                        style={{ width: `${percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Review List */}
            {reviews.length > 0 && (
                <div className="rounded-[24px] bg-pink-50 p-[10px] flex flex-col gap-[12px]">
                    {reviews.slice(0, 3).map((review) => (
                        <div key={review.id} id={`comment-${review.id}`} className="border-b border-pink-100 last:border-0 pb-[8px] last:pb-0">
                            <div className="mb-[4px] flex items-start justify-between">
                                <div className="text-[14px] font-700 text-black-700">{review.reviewerName}</div>
                                <div className="flex items-center gap-[6px]">
                                    <div className="text-[10px] font-400 text-gray-400">
                                        {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                                    </div>
                                    <div className="flex items-center gap-[2px]">
                                        <div className="text-[12px] font-700 text-primary-400">{review.rating}</div>
                                        <span className="text-pink-500 text-[10px]">★</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-left text-[13px] text-gray-600 line-clamp-3">
                                {review.comment}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {reviews.length > 3 && (
                <button className="m-auto block rounded-full border border-primary-500 px-[20px] py-[8px] text-primary-500 hover:bg-pink-50">
                    Xem tất cả
                </button>
            )}
        </div>
    );
};

export default ProductReviews;
