"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className=" w-8 h-8 rounded-full p-2 bg-gray-100 text-gray-700" />
    );
  }

  return (
    <button
      className=" flex gap-2 sm:gap-3 p-1 rounded-sm shadow-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg hover:bg-neutral-50/60 transition-all duration-200 hover:scale-105"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-5 w-5 sm:h-6 sm:w-6 p-1 bg-neutral-800 text-white rounded-sm" />
      <Moon className="h-5 w-5 sm:h-6 sm:w-6 p-1 bg-white text-neutral-800 rounded-sm" />
    </button>
  );
}
