"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";

interface BecomeContributorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BecomeContributorModal({
  isOpen,
  onClose,
}: BecomeContributorModalProps) {
  const [formData, setFormData] = useState({
    realName: "",
    currentProfession: "",
    previousExperience: "",
    idCard: null as File | null,
    terms: {
      noPlagiarism: false,
      noAiWithoutLabeling: false,
      sourceAttribution: false,
      noFakeNews: false,
    },
  });
  const { theme } = useTheme();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store contributor status in localStorage
    localStorage.setItem("isContributor", "true");
    toast.success("You are now a contributor");
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
        idCard: e.target.files![0],
      }));
    }
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      terms: {
        ...prev.terms,
        [name]: checked,
      },
    }));
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
          Become a Contributor
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "dark" ? "text-zinc-100" : "text-zinc-900"
              }`}
            >
              Real Name
            </label>
            <input
              type="text"
              name="realName"
              value={formData.realName}
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
              Current Profession
            </label>
            <input
              type="text"
              name="currentProfession"
              value={formData.currentProfession}
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
              Previous Journalism Experience
            </label>
            <textarea
              name="previousExperience"
              value={formData.previousExperience}
              onChange={handleInputChange}
              className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ease-in-out duration-300 resize-none ${
                theme === "dark"
                  ? "bg-zinc-700 text-zinc-100 focus:ring-zinc-500"
                  : "bg-zinc-200 text-zinc-900 focus:ring-zinc-400"
              }`}
              rows={4}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "dark" ? "text-zinc-100" : "text-zinc-900"
              }`}
            >
              ID Card Image
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
              required
            />
          </div>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "dark" ? "text-zinc-100" : "text-zinc-900"
              }`}
            >
              Terms and Conditions
            </label>
            <div className="space-y-2">
              <label
                className={`flex items-center ${
                  theme === "dark" ? "text-zinc-100" : "text-zinc-900"
                }`}
              >
                <input
                  type="checkbox"
                  name="noPlagiarism"
                  checked={formData.terms.noPlagiarism}
                  onChange={handleTermsChange}
                  className="mr-2"
                  required
                />
                No plagiarism
              </label>
              <label
                className={`flex items-center ${
                  theme === "dark" ? "text-zinc-100" : "text-zinc-900"
                }`}
              >
                <input
                  type="checkbox"
                  name="noAiWithoutLabeling"
                  checked={formData.terms.noAiWithoutLabeling}
                  onChange={handleTermsChange}
                  className="mr-2"
                  required
                />
                No AI-generated news without clear labeling
              </label>
              <label
                className={`flex items-center ${
                  theme === "dark" ? "text-zinc-100" : "text-zinc-900"
                }`}
              >
                <input
                  type="checkbox"
                  name="sourceAttribution"
                  checked={formData.terms.sourceAttribution}
                  onChange={handleTermsChange}
                  className="mr-2"
                  required
                />
                Source attribution is mandatory
              </label>
              <label
                className={`flex items-center ${
                  theme === "dark" ? "text-zinc-100" : "text-zinc-900"
                }`}
              >
                <input
                  type="checkbox"
                  name="noFakeNews"
                  checked={formData.terms.noFakeNews}
                  onChange={handleTermsChange}
                  className="mr-2"
                  required
                />
                Strict no-fake-news policy
              </label>
            </div>
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
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
