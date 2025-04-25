"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  BiUpvote,
  BiDownvote,
  BiSolidUpvote,
  BiSolidDownvote,
} from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoFlagOutline } from "react-icons/io5";
import { useTheme } from "@/context/ThemeContext";

type Category = "All" | "Politics" | "Sports" | "Entertainment" | "Technology";

interface NewsCardProps {
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
  onReport: (newsId: string) => void;
}

export function NewsCard({
  source,
  title,
  description,
  image,
  category,
  id,
  initialUpvotes,
  initialDownvotes,
  publisher,
  publishTime,
  onReport,
}: NewsCardProps) {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [hasDownvoted, setHasDownvoted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    // Load vote status from localStorage
    const voteStatus = localStorage.getItem(`newsVote_${id}`);
    if (voteStatus) {
      const { upvoted, downvoted } = JSON.parse(voteStatus);
      setHasUpvoted(upvoted);
      setHasDownvoted(downvoted);
    }
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUpvote = () => {
    if (hasDownvoted) {
      setDownvotes((prev) => prev - 1);
      setHasDownvoted(false);
    }
    if (!hasUpvoted) {
      setUpvotes((prev) => prev + 1);
      setHasUpvoted(true);
    } else {
      setUpvotes((prev) => prev - 1);
      setHasUpvoted(false);
    }
    localStorage.setItem(
      `newsVote_${id}`,
      JSON.stringify({
        upvoted: !hasUpvoted,
        downvoted: false,
      })
    );
  };

  const handleDownvote = () => {
    if (hasUpvoted) {
      setUpvotes((prev) => prev - 1);
      setHasUpvoted(false);
    }
    if (!hasDownvoted) {
      setDownvotes((prev) => prev + 1);
      setHasDownvoted(true);
    } else {
      setDownvotes((prev) => prev - 1);
      setHasDownvoted(false);
    }
    localStorage.setItem(
      `newsVote_${id}`,
      JSON.stringify({
        upvoted: false,
        downvoted: !hasDownvoted,
      })
    );
  };

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-lg ${
        theme === "dark" ? "bg-zinc-800" : "bg-zinc-300"
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3
              className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 ${
                theme === "dark" ? "text-zinc-100" : "text-zinc-900"
              }`}
            >
              {title.length > 100 ? `${title.substring(0, 100)}...` : title}
            </h3>
            <p
              className={`text-base sm:text-lg md:text-xl mb-2 font-medium ${
                theme === "dark" ? "text-zinc-300" : "text-zinc-700"
              }`}
            >
              {description.length > 200
                ? `${description.substring(0, 200)}...`
                : description}
            </p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm font-medium">
              <span
                className={`${
                  theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                }`}
              >
                {publisher}
              </span>
              <span
                className={`${
                  theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                }`}
              >
                •
              </span>
              <span
                className={`${
                  theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                }`}
              >
                {source}
              </span>
              <span
                className={`${
                  theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                }`}
              >
                •
              </span>
              <span
                className={`${
                  theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                }`}
              >
                {category}
              </span>
              <span
                className={`${
                  theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                }`}
              >
                •
              </span>
              <span
                className={`${
                  theme === "dark" ? "text-zinc-500" : "text-zinc-600"
                }`}
              >
                {publishTime}
              </span>
            </div>
          </div>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 cursor-pointer rounded-lg transition-colors ml-2 ${
                theme === "dark"
                  ? "text-zinc-100 hover:bg-zinc-700"
                  : "text-zinc-900 hover:bg-zinc-400"
              }`}
            >
              <BsThreeDotsVertical size={20} />
            </button>
            {isMenuOpen && (
              <div
                className={`absolute right-0 mt-2 w-32 rounded-lg shadow-lg overflow-hidden ${
                  theme === "dark" ? "bg-zinc-700" : "bg-zinc-400"
                }`}
              >
                <button
                  onClick={() => {
                    onReport(id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 transition-colors cursor-pointer flex items-center space-x-2 font-medium ${
                    theme === "dark"
                      ? "text-zinc-100 hover:bg-zinc-600"
                      : "text-zinc-900 hover:bg-zinc-500"
                  }`}
                >
                  <IoFlagOutline size={18} />
                  <span>Report</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {image && (
        <div className="relative aspect-[16/10]">
          <Image src={image} alt={title} className="object-cover" fill />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleUpvote}
            className={`flex items-center space-x-1 transition-colors font-medium ${
              theme === "dark"
                ? "text-zinc-100 hover:text-zinc-300"
                : "text-zinc-900 hover:text-zinc-700"
            }`}
          >
            {hasUpvoted ? <BiSolidUpvote size={20} /> : <BiUpvote size={20} />}
            <span>{upvotes}</span>
          </button>
          <button
            onClick={handleDownvote}
            className={`flex items-center space-x-1 transition-colors ${
              theme === "dark"
                ? "text-zinc-100 hover:text-zinc-300"
                : "text-zinc-900 hover:text-zinc-700"
            }`}
          >
            {hasDownvoted ? (
              <BiSolidDownvote size={20} />
            ) : (
              <BiDownvote size={20} />
            )}
            <span>{downvotes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
