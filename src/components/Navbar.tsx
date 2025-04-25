"use client";

import { useState, useEffect } from "react";
import { IoSearch, IoClose, IoPersonOutline, IoAdd } from "react-icons/io5";
import DarkModeToggle from "./DarkModeToggle";
import { useTheme } from "@/context/ThemeContext";
import { toast } from "sonner";
import { PublishNewsModal } from "./PublishNewsModal";

interface NavbarProps {
  onSearchChange: (query: string) => void;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onContributorClick: () => void;
}

export function Navbar({
  onSearchChange,
  onLoginClick,
  onSignupClick,
  onContributorClick,
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isContributor, setIsContributor] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const contributorStatus = localStorage.getItem("isContributor") === "true";
    setIsLoggedIn(!!userData);
    setIsContributor(contributorStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
    toast.success("You have been logged out");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  const handleMenuAction = (action: () => void) => {
    action();
    setIsMenuOpen(false);
  };

  const renderMenuItems = () => (
    <>
      {isLoggedIn ? (
        <>
          {!isContributor && (
            <button
              onClick={() => handleMenuAction(onContributorClick)}
              className={`block w-full text-left px-4 py-2 transition-colors ease-in-out duration-300 cursor-pointer ${
                theme === "dark"
                  ? "text-zinc-100 hover:bg-zinc-700"
                  : "text-zinc-900 hover:bg-zinc-300"
              }`}
            >
              Become a Contributor
            </button>
          )}
          <button
            onClick={handleLogout}
            className={`block w-full text-left px-4 py-2 transition-colors ease-in-out duration-300 cursor-pointer ${
              theme === "dark"
                ? "text-zinc-100 hover:bg-zinc-700"
                : "text-zinc-900 hover:bg-zinc-300"
            }`}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => handleMenuAction(onLoginClick)}
            className={`block w-full text-left px-4 py-2 transition-colors ease-in-out duration-300 cursor-pointer ${
              theme === "dark"
                ? "text-zinc-100 hover:bg-zinc-700"
                : "text-zinc-900 hover:bg-zinc-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => handleMenuAction(onSignupClick)}
            className={`block w-full text-left px-4 py-2 transition-colors ease-in-out duration-300 cursor-pointer ${
              theme === "dark"
                ? "text-zinc-100 hover:bg-zinc-700"
                : "text-zinc-900 hover:bg-zinc-300"
            }`}
          >
            Signup
          </button>
        </>
      )}
    </>
  );

  return (
    <nav
      className={`sticky top-0 z-50 p-4 ${
        theme === "dark"
          ? "bg-zinc-900 text-zinc-100"
          : "bg-zinc-100 text-zinc-900"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xl font-bold">Newspeeper</span>
          <span
            className={`text-sm font-semibold hidden md:block ${
              theme === "dark" ? "text-zinc-300" : "text-zinc-700"
            }`}
          >
            Less time, More News
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Desktop Navigation */}
          <div
            className={`hidden md:flex items-center space-x-4 ${
              isSearchFocused ? "hidden" : ""
            }`}
          >
            <input
              type="text"
              placeholder="Search news..."
              className={`px-3 py-2 rounded-lg w-64 transition-colors duration-200 ${
                theme === "dark"
                  ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 focus:bg-zinc-700"
                  : "bg-zinc-300 text-zinc-900 hover:bg-zinc-300 focus:bg-zinc-300"
              } focus:outline-none`}
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
            />

            {isContributor && (
              <button
                onClick={() => setIsPublishModalOpen(true)}
                className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                  theme === "dark"
                    ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
                    : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
                }`}
              >
                <IoAdd size={24} />
              </button>
            )}

            <div className="cursor-pointer">
              <DarkModeToggle />
            </div>

            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                  theme === "dark"
                    ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
                    : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
                }`}
              >
                <IoPersonOutline size={24} />
              </button>
              {isMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-64 rounded-lg shadow-lg overflow-hidden ${
                    theme === "dark" ? "bg-zinc-800" : "bg-zinc-200"
                  }`}
                >
                  {renderMenuItems()}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search */}
          <div className="flex md:hidden items-center space-x-4">
            {!isSearchFocused ? (
              <>
                <button
                  onClick={() => setIsSearchFocused(true)}
                  className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                    theme === "dark"
                      ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
                      : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
                  }`}
                >
                  <IoSearch size={24} />
                </button>
                {isContributor && (
                  <button
                    onClick={() => setIsPublishModalOpen(true)}
                    className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                      theme === "dark"
                        ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
                        : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300"
                    }`}
                  >
                    <IoAdd size={24} />
                  </button>
                )}
                <div className="cursor-pointer">
                  <DarkModeToggle />
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                      theme === "dark"
                        ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
                        : "bg-zinc-300 text-zinc-900 hover:bg-zinc-300"
                    }`}
                  >
                    <IoPersonOutline size={24} />
                  </button>
                  {isMenuOpen && (
                    <div
                      className={`absolute right-0 mt-2 w-64 rounded-lg shadow-lg overflow-hidden ${
                        theme === "dark" ? "bg-zinc-800" : "bg-zinc-200"
                      }`}
                    >
                      {renderMenuItems()}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search news..."
                  className={`flex-1 px-3 py-2 rounded-lg transition-colors duration-200 ${
                    theme === "dark"
                      ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 focus:bg-zinc-700"
                      : "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 focus:bg-zinc-300"
                  } focus:outline-none`}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchFocused(false)}
                  className={`p-2 rounded-lg transition-colors duration-200 cursor-pointer ${
                    theme === "dark"
                      ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
                      : "bg-zinc-300 text-zinc-900 hover:bg-zinc-300"
                  }`}
                >
                  <IoClose size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <PublishNewsModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
      />
    </nav>
  );
}
