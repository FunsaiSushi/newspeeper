"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Option {
  value: string;
  label: string;
}

interface CustomDropDownMenuProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CustomDropDownMenu({
  options,
  value,
  onChange,
  className = "",
}: CustomDropDownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors cursor-pointer text-sm sm:text-base font-medium ${
          theme === "dark"
            ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
            : "bg-zinc-300 text-zinc-900 hover:bg-zinc-400"
        }`}
      >
        <span>{selectedOption?.label || "Select"}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute z-10 w-full mt-1 rounded-lg shadow-lg overflow-hidden ${
            theme === "dark" ? "bg-zinc-800" : "bg-zinc-300"
          }`}
        >
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 transition-colors cursor-pointer text-sm sm:text-base font-medium ${
                theme === "dark"
                  ? "text-zinc-100 hover:bg-zinc-700"
                  : "text-zinc-900 hover:bg-zinc-400"
              } ${
                option.value === value
                  ? theme === "dark"
                    ? "bg-zinc-700"
                    : "bg-zinc-400"
                  : ""
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
