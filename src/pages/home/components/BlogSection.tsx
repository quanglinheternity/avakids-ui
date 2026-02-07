import { useState, useEffect } from 'react';
import axios from 'axios';
import ArticleCard from './ArticleCard';

interface Article {
    id: number;
    title: string;
    date: string;
    image: string;
    link?: string;
}

interface BlogResponse {
    id: number;
    title: string;
    slug: string;
    thumbnailUrl: string;
    publishedAt: string;
    summary: string;
}

interface ApiResponse {
    code: number;
    message: string;
    data: {
        content: BlogResponse[];
    };
}

const BlogSection = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get<ApiResponse>('http://localhost:8080/avakids/api/v1/blogs/list');
                if (res.data && res.data.data) {
                    const mappedArticles: Article[] = res.data.data.content.map((blog) => ({
                        id: blog.id,
                        title: blog.title,
                        date: new Date(blog.publishedAt).toLocaleDateString('vi-VN'),
                        image: blog.thumbnailUrl || 'https://cdnv2.tgdd.vn/mwg-static/common/News/1589356/thong-bao-thu-hoi-san-pham-thuc-pham-bao-ve-suc-thumbbbb.jpg', // Fallback or mapping
                        link: `/tin-tuc/${blog.slug}`
                    }));
                    setArticles(mappedArticles);
                }
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (isLoading) {
        return (
            <section className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800 h-[400px] animate-pulse bg-gray-200 dark:bg-gray-700">
            </section>
        );
    }

    return (
        <section className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="text-xl font-bold text-pink-600 dark:text-pink-400">
                    Cẩm Nang Mua Sắm
                </h2>
            </div>

            {/* Articles Grid */}
            <div className="bg-gray-50 px-4 py-6 dark:bg-gray-900">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
