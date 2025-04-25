"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";

interface PublishNewsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PublishNewsModal({ isOpen, onClose }: PublishNewsModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    source: "",
    image: null as File | null,
  });
  const { theme } = useTheme();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Check if user is a contributor
    const isContributor = localStorage.getItem("isContributor") === "true";
    if (!isContributor) {
      toast.error("You must be a contributor to publish news");
      return;
    }
    toast.success("News published successfully");
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        image: e.target.files![0],
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm px-4">
      <div
        className={`p-6 rounded-lg w-full max-w-md ${
          theme === "dark" ? "bg-zinc-800" : "bg-zinc-300"
        }`}
      >
        <h2
          className={`text-xl font-bold mb-4 ${
            theme === "dark" ? "text-zinc-100" : "text-zinc-900"
          }`}
        >
          Publish News
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "dark" ? "text-zinc-100" : "text-zinc-900"
              }`}
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ease-in-out duration-300 ${
                theme === "dark"
                  ? "bg-zinc-700 text-zinc-100 focus:ring-zinc-500"
                  : "bg-zinc-200 text-zinc-900 focus:ring-zinc-400"
              }`}
              required
              maxLength={100}
            />
          </div>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "dark" ? "text-zinc-100" : "text-zinc-900"
              }`}
            >
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ease-in-out duration-300 resize-none ${
                theme === "dark"
                  ? "bg-zinc-700 text-zinc-100 focus:ring-zinc-500"
                  : "bg-zinc-200 text-zinc-900 focus:ring-zinc-400"
              }`}
              rows={4}
              required
              maxLength={200}
            />
          </div>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "dark" ? "text-zinc-100" : "text-zinc-900"
              }`}
            >
              Source
            </label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleInputChange}
              className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ease-in-out duration-300 ${
                theme === "dark"
                  ? "bg-zinc-700 text-zinc-100 focus:ring-zinc-500"
                  : "bg-zinc-200 text-zinc-900 focus:ring-zinc-400"
              }`}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "dark" ? "text-zinc-100" : "text-zinc-900"
              }`}
            >
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ease-in-out duration-300 ${
                theme === "dark"
                  ? "bg-zinc-700 text-zinc-100 focus:ring-zinc-500"
                  : "bg-zinc-200 text-zinc-900 focus:ring-zinc-400"
              }`}
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-lg cursor-pointer font-bold transition-colors ease-in-out duration-300 ${
                theme === "dark"
                  ? "bg-zinc-700 text-zinc-100 hover:bg-zinc-600"
                  : "bg-zinc-400 text-zinc-900 hover:bg-zinc-500"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg cursor-pointer font-bold transition-colors ease-in-out duration-300 ${
                theme === "dark"
                  ? "bg-zinc-700 text-zinc-100 hover:bg-zinc-600"
                  : "bg-zinc-400 text-zinc-900 hover:bg-zinc-500"
              }`}
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
