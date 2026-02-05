interface ArticleCardProps {
    article: {
        id: number;
        title: string;
        date: string;
        image: string;
        link?: string;
    };
}

const ArticleCard = ({ article }: ArticleCardProps) => {
    return (
        <div className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-xl dark:bg-gray-700">
            {/* Article Image */}
            <div className="relative w-full overflow-hidden">
                <img
                    alt={article.title}
                    className="w-full object-cover transition duration-300 group-hover:scale-105"
                    src={article.image}
                />
            </div>

            {/* Article Content */}
            <div className="p-4">
                <h3 className="mb-2 line-clamp-2 text-sm font-medium leading-tight text-gray-800 dark:text-gray-100">
                    {article.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    {article.date}
                </p>
            </div>
        </div>
    );
};

export default ArticleCard;
