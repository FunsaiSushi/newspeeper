"use client";

import { NewsCard } from "./NewsCard";
import { CustomDropDownMenu } from "./CustomDropDownMenu";
import { useState } from "react";

type Category = "All" | "Politics" | "Sports" | "Entertainment" | "Technology";
type Country =
  | "All"
  | "USA"
  | "UK"
  | "Canada"
  | "Australia"
  | "India"
  | "Japan";
type SortOption = "popularity" | "newest" | "oldest";

interface NewsItem {
  source: string;
  title: string;
  description: string;
  image: string;
  category: Category;
  country: Country;
  id: string;
  initialUpvotes: number;
  initialDownvotes: number;
  publisher: string;
  publishTime: string;
  comments: Array<{
    id: string;
    text: string;
    author: string;
    timestamp: string;
  }>;
}

// Sample news data - in a real app, this would come from an API
const sampleNews: NewsItem[] = [
  {
    source: "Tech News",
    title: "New AI Breakthrough in Natural Language Processing",
    description:
      "Researchers have developed a new model that can understand and generate human-like text with unprecedented accuracy.",
    image:
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=60",
    category: "Technology",
    country: "USA",
    id: "tech-1",
    initialUpvotes: 42,
    initialDownvotes: 3,
    publisher: "Sarah Chen",
    publishTime: "2 hours ago",
    comments: [
      {
        id: "1",
        text: "This is amazing! Can't wait to see how this technology evolves.",
        author: "Tech Enthusiast",
        timestamp: "1 hour ago",
      },
      {
        id: "2",
        text: "I'm curious about the potential applications in healthcare.",
        author: "Medical Professional",
        timestamp: "30 minutes ago",
      },
    ],
  },
  {
    source: "Sports Daily",
    title: "Local Team Wins Championship",
    description:
      "In an exciting match that went into overtime, the local team secured their first championship in 10 years.",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=60",
    category: "Sports",
    country: "UK",
    id: "sports-1",
    initialUpvotes: 89,
    initialDownvotes: 5,
    publisher: "Michael Rodriguez",
    publishTime: "5 hours ago",
    comments: [
      {
        id: "3",
        text: "What a game! The team really deserved this win.",
        author: "Sports Fan",
        timestamp: "4 hours ago",
      },
      {
        id: "4",
        text: "The overtime was intense! Great performance by both teams.",
        author: "Basketball Coach",
        timestamp: "3 hours ago",
      },
    ],
  },
  {
    source: "Politics Today",
    title: "New Legislation Proposed to Address Climate Change",
    description:
      "Lawmakers have introduced a comprehensive bill aimed at reducing carbon emissions and promoting renewable energy.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60",
    category: "Politics",
    country: "Canada",
    id: "politics-1",
    initialUpvotes: 156,
    initialDownvotes: 23,
    publisher: "Emma Thompson",
    publishTime: "1 day ago",
    comments: [
      {
        id: "5",
        text: "Finally, some concrete action on climate change!",
        author: "Environmental Activist",
        timestamp: "20 hours ago",
      },
      {
        id: "6",
        text: "I hope this bill gets the support it needs.",
        author: "Concerned Citizen",
        timestamp: "18 hours ago",
      },
    ],
  },
  {
    source: "Entertainment Weekly",
    title: "New Blockbuster Movie Breaks Box Office Records",
    description:
      "The latest superhero movie has shattered previous box office records, becoming the highest-grossing film of the year.",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&auto=format&fit=crop&q=60",
    category: "Entertainment",
    country: "Australia",
    id: "ent-1",
    initialUpvotes: 210,
    initialDownvotes: 12,
    publisher: "James Wilson",
    publishTime: "3 hours ago",
    comments: [
      {
        id: "7",
        text: "The special effects were mind-blowing!",
        author: "Movie Buff",
        timestamp: "2 hours ago",
      },
      {
        id: "8",
        text: "I've already watched it twice!",
        author: "Film Critic",
        timestamp: "1 hour ago",
      },
    ],
  },
];

interface NewsFeedProps {
  selectedCategory: Category;
  searchQuery: string;
  onReport: (newsId: string) => void;
  onCategoryChange: (category: Category) => void;
}

export function NewsFeed({
  selectedCategory,
  searchQuery,
  onReport,
  onCategoryChange,
}: NewsFeedProps) {
  const [selectedCountry, setSelectedCountry] = useState<Country>("All");
  const [sortBy, setSortBy] = useState<SortOption>("popularity");

  const categoryOptions = [
    { value: "All", label: "All" },
    { value: "Politics", label: "Politics" },
    { value: "Sports", label: "Sports" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Technology", label: "Technology" },
  ];

  const countryOptions = [
    { value: "All", label: "All Countries" },
    { value: "USA", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "Canada", label: "Canada" },
    { value: "Australia", label: "Australia" },
    { value: "India", label: "India" },
    { value: "Japan", label: "Japan" },
  ];

  const sortOptions = [
    { value: "popularity", label: "Most Popular" },
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
  ];

  const filteredNews = sampleNews.filter((news) => {
    const matchesCategory =
      selectedCategory === "All" || news.category === selectedCategory;
    const matchesCountry =
      selectedCountry === "All" || news.country === selectedCountry;
    const matchesSearch =
      searchQuery === "" ||
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesCountry && matchesSearch;
  });

  const sortedNews = [...filteredNews].sort((a, b) => {
    switch (sortBy) {
      case "popularity":
        return (
          b.initialUpvotes -
          b.initialDownvotes -
          (a.initialUpvotes - a.initialDownvotes)
        );
      case "newest":
        return a.publishTime.localeCompare(b.publishTime);
      case "oldest":
        return b.publishTime.localeCompare(a.publishTime);
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-end space-x-4 mb-6">
        <CustomDropDownMenu
          options={countryOptions}
          value={selectedCountry}
          onChange={(value) => setSelectedCountry(value as Country)}
          className="w-full"
        />
        <CustomDropDownMenu
          options={categoryOptions}
          value={selectedCategory}
          onChange={(value) => onCategoryChange(value as Category)}
          className="w-full"
        />
        <CustomDropDownMenu
          options={sortOptions}
          value={sortBy}
          onChange={(value) => setSortBy(value as SortOption)}
          className="w-full"
        />
      </div>
      {sortedNews.length > 0 ? (
        sortedNews.map((news, index) => (
          <NewsCard
            key={index}
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
            initialComments={news.comments}
          />
        ))
      ) : (
        <div className="text-center text-zinc-400 py-8">
          No news found matching your criteria
        </div>
      )}
    </div>
  );
}
