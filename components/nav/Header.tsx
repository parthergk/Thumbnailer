"use client";
import { User, LogIn } from "lucide-react";
import { useState } from "react";
import UserDetial from "./UserDetial";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "../ThemeToggle";

const Header: React.FC = () => {
  const [showDetail, setShowDetail] = useState(false);
  const router = useRouter();
  const { data, status } = useSession();
  
  const isUser = status === "authenticated";

  function handleUser() {
    if (status === "authenticated") {
      setShowDetail((prev) => !prev);
    }

    if (status === "unauthenticated") {
      router.push("/sign-in");
    }
  }

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-500 bg-white dark:bg-neutral-950 fixed z-20">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2 text-black dark:text-white">
              <span className="text-2xl font-bold ">✱</span>
              <span className="text-base md:text-xl font-semibold">
                Thumblyzer
              </span>
            </a>
          </div>
          <div className="flex items-center space-x-4">
          <ThemeToggle/>
            <button
              className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
              aria-label="Toggle User Menu"
              aria-expanded={isUser}
              onClick={handleUser}
            >
              {isUser ? (
                <User className="h-5 w-5" />
              ) : (
                <LogIn className="h-5 w-5" />
              )}
            </button>
            <UserDetial isUser={showDetail} data={data?.user} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
