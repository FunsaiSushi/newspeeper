"use client";

import { toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const { theme } = useTheme();

  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.removeItem("userData");
    toast.success("You have been logged out");
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
          Logout
        </h2>
        <p
          className={`mb-6 ${
            theme === "dark" ? "text-zinc-100" : "text-zinc-900"
          }`}
        >
          Are you sure you want to logout?
        </p>
        <div className="flex justify-end space-x-4">
          <button
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
            onClick={handleLogout}
            className={`px-4 py-2 rounded-lg cursor-pointer font-bold transition-colors ease-in-out duration-300 ${
              theme === "dark"
                ? "bg-zinc-700 text-zinc-100 hover:bg-zinc-600"
                : "bg-zinc-400 text-zinc-900 hover:bg-zinc-500"
            }`}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
