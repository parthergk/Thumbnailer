import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
    return (
      <div className=" w-full flex flex-col pt-16">
        <div className="flex justify-center" style={{ opacity: 1, transform: "none" }}>
          <button className="bg-neutral-50 dark:bg-neutral-700 no-underline group cursor-pointer relative md:shadow-2xl shadow-zinc-900 rounded-full p-px text-[10px] sm:text-xs font-semibold leading-6 text-neutral-700 dark:text-neutral-300 inline-block w-fit mx-auto">
          <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-neutral-100 dark:bg-neutral-800 py-1.5 px-4 ring-1 ring-white/10">
                <span >
                  Helping creators design standout thumbnails effortlessly!
                </span>
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  ></path>
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-neutral-400/0 via-neutral-400/90 to-neutral-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
          </button>
        </div>
  
        <h1 className="mt-6 text-2xl md:text-4xl lg:text-8xl font-semibold mx-auto text-center z-10 text-black dark:text-white tracking-tight">
          Analyze YouTube Thumbnails <br /> and Design Like a Pro!
        </h1>
  
        <p className="text-center mt-8 text-base md:text-xl text-muted dark:text-muted-dark max-w-[22rem] md:max-w-3xl mx-auto z-10 text-neutral-500 dark:text-white">
            Unleash your creativity! Our tool analyzes font styles, colors, and
            layouts of existing YouTube thumbnails, giving you the insights and
            inspiration to create stunning thumbnails.
          </p>

          <div className="flex justify-center items-center mt-8 space-x-4">
            <Link href="/dashboard" className="group">
              <button className="text-sm py-3 px-6 bg-black dark:bg-white dark:text-black text-white rounded-full hover:bg-gray-950 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2">
                Get started for free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Demo Preview */}
          <div className="mt-16 mx-auto max-w-10xl px-4">
            <div className="relative rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
              <Image
                src="/img.png"
                alt="YouTube Thumbnail Analyzer Demo"
                width={1200}
                height={630}
                className="w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
      </div>
    );
  }
  