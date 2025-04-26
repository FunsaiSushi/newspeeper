"use client";

import { useTheme } from "@/context/ThemeContext";
import { NewsCard } from "./NewsCard";
import { Comments } from "./Comments";
import { IoClose } from "react-icons/io5";

type Category = "All" | "Politics" | "Sports" | "Entertainment" | "Technology";

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: {
    source: string;
    title: string;
    description: string;
    image?: string;
    category: Category;
    id: string;
    initialUpvotes: number;
    initialDownvotes: number;
    publisher: string;
    publishTime: string;
  };
  initialComments: Array<{
    id: string;
    text: string;
    author: string;
    timestamp: string;
  }>;
  onReport: (newsId: string) => void;
}

export function NewsModal({
  isOpen,
  onClose,
  news,
  initialComments,
  onReport,
}: NewsModalProps) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm px-4">
      <div
        className={`p-6 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden ${
          theme === "dark" ? "bg-zinc-800" : "bg-zinc-300"
        }`}
      >
        <div className="flex flex-col lg:flex-row gap-6 h-full">
          <div className="flex-1 overflow-y-auto">
            <NewsCard
              source={news.source}
              title={news.title}
              description={news.description}
              image={news.image}
              category={news.category}
              id={news.id}
              initialUpvotes={news.initialUpvotes}
              initialDownvotes={news.initialDownvotes}
              publisher={news.publisher}
              publishTime={news.publishTime}
              onReport={onReport}
              initialComments={initialComments}
            />
          </div>
          <div className="flex-1 overflow-y-auto">
            <Comments newsId={news.id} initialComments={initialComments} />
          </div>
        </div>
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-lg cursor-pointer transition-colors ${
            theme === "dark"
              ? "text-zinc-100 hover:bg-zinc-700"
              : "text-zinc-900 hover:bg-zinc-400"
          }`}
        >
          <IoClose size={24} />
        </button>
      </div>
    </div>
  );
}
