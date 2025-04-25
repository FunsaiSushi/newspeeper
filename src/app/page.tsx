"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { NewsFeed } from "@/components/NewsFeed";
import { ReportModal } from "@/components/ReportModal";
import { LoginModal } from "@/components/LoginModal";
import { SignupModal } from "@/components/SignupModal";
import { BecomeContributorModal } from "@/components/BecomeContributorModal";
import { Toaster } from "sonner";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

type Category = "All" | "Politics" | "Sports" | "Entertainment" | "Technology";

function HomeContent() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isContributorOpen, setIsContributorOpen] = useState(false);
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const { theme } = useTheme();

  const handleReport = (newsId: string) => {
    setSelectedNewsId(newsId);
    setIsReportOpen(true);
  };

  return (
    <>
      <div
        className={`min-h-screen ${
          theme === "dark"
            ? "bg-zinc-900 text-zinc-100"
            : "bg-zinc-100 text-zinc-900"
        }`}
      >
        <Navbar
          onSearchChange={setSearchQuery}
          onLoginClick={() => {
            setIsLoginOpen(true);
            console.log("Login clicked");
          }}
          onSignupClick={() => {
            setIsSignupOpen(true);
            console.log("Signup clicked");
          }}
          onContributorClick={() => {
            setIsContributorOpen(true);
            console.log("Contributor clicked");
          }}
        />
        <main className="container mx-auto px-4 pb-8">
          <NewsFeed
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onReport={handleReport}
            onCategoryChange={setSelectedCategory}
          />
        </main>
        <Toaster position="top-right" />
      </div>
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => {
          setIsReportOpen(false);
          setSelectedNewsId(null);
        }}
        newsId={selectedNewsId}
      />
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <SignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />
      <BecomeContributorModal
        isOpen={isContributorOpen}
        onClose={() => setIsContributorOpen(false)}
      />
    </>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}
