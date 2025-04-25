"use client";

import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useTheme } from "@/context/ThemeContext";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg flex items-center justify-center cursor-pointer transition-colors ease-in-out duration-300 ${
        theme === "dark"
          ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
          : "bg-zinc-300 text-zinc-900 hover:bg-zinc-300"
      }`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <IoSunnyOutline size={24} />
      ) : (
        <IoMoonOutline size={24} />
      )}
    </button>
  );
};

export default DarkModeToggle;
