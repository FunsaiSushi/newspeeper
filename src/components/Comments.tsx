"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { toast } from "sonner";

interface Comment {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}

interface CommentsProps {
  newsId: string;
  initialComments: Comment[];
}

export function Comments({ newsId, initialComments }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    // Load comments from localStorage
    const savedComments = localStorage.getItem(`comments_${newsId}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [newsId]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      text: newComment,
      author: "Anonymous User", // In a real app, this would be the logged-in user
      timestamp: new Date().toLocaleString(),
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem(`comments_${newsId}`, JSON.stringify(updatedComments));
    setNewComment("");
    toast.success("Comment posted successfully!");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className={`mb-4 p-4 rounded-lg ${
                theme === "dark" ? "bg-zinc-700" : "bg-zinc-200"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span
                  className={`font-medium ${
                    theme === "dark" ? "text-zinc-100" : "text-zinc-900"
                  }`}
                >
                  {comment.author}
                </span>
                <span
                  className={`text-sm ${
                    theme === "dark" ? "text-zinc-400" : "text-zinc-600"
                  }`}
                >
                  {comment.timestamp}
                </span>
              </div>
              <p
                className={`${
                  theme === "dark" ? "text-zinc-200" : "text-zinc-800"
                }`}
              >
                {comment.text}
              </p>
            </div>
          ))
        ) : (
          <p
            className={`text-center ${
              theme === "dark" ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
      <form onSubmit={handleSubmitComment} className="mt-auto">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className={`w-full p-3 rounded-lg mb-2 resize-none transition-colors ease-in-out duration-300 focus:outline-none ${
            theme === "dark"
              ? "bg-zinc-700 text-zinc-100 hover:bg-zinc-600 focus:bg-zinc-600"
              : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 focus:bg-zinc-300"
          }`}
          rows={3}
        />
        <button
          type="submit"
          className={`w-full px-4 py-2 rounded-lg cursor-pointer font-bold transition-colors ease-in-out duration-300 ${
            theme === "dark"
              ? "bg-zinc-700 text-zinc-100 hover:bg-zinc-600"
              : "bg-zinc-400 text-zinc-900 hover:bg-zinc-500"
          }`}
        >
          Comment
        </button>
      </form>
    </div>
  );
}
