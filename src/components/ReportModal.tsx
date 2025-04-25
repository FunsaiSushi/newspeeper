"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  newsId: string | null;
}

export function ReportModal({ isOpen, onClose, newsId }: ReportModalProps) {
  const [reason, setReason] = useState("");
  const { theme } = useTheme();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Report submitted for news ID: ${newsId}`);
    onClose();
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
          Report News
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "dark" ? "text-zinc-100" : "text-zinc-900"
              }`}
            >
              Reason
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ease-in-out duration-300 ${
                theme === "dark"
                  ? "bg-zinc-700 text-zinc-100 focus:ring-zinc-500"
                  : "bg-zinc-200 text-zinc-900 focus:ring-zinc-400"
              }`}
              rows={4}
              required
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
              Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
