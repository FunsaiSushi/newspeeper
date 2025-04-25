"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    toast.success("You have been logged in");
    onClose();
  };

  if (!isOpen) return null;

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
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className={`block mb-2 ${
                theme === "dark" ? "text-zinc-100" : "text-zinc-900"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ease-in-out duration-300 ${
                theme === "dark"
                  ? "bg-zinc-700 text-zinc-100 focus:ring-zinc-500"
                  : "bg-zinc-200 text-zinc-900 focus:ring-zinc-400"
              }`}
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
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
