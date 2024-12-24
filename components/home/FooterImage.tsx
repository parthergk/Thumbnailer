import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
export const FooterImage = () => {
  return (
    <div className="my-16 mx-auto max-w-10xl px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-neutral-200 dark:border-neutral-800">
          {/* Image with improved gradient and object positioning */}
          <div className="relative">
            <Image
              src="/img.png"
              alt="YouTube Thumbnail Analyzer Demo"
              width={1200}
              height={630}
              className="w-full h-[500px] object-cover brightness-75 contrast-125 transition-all duration-300 hover:brightness-90"
            />

            {/* Gradient overlay with improved visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 z-10" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center px-6">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 max-w-3xl leading-tight">
              Analyze YouTube Thumbnails in Seconds
            </h1>
            <p className="text-neutral-200 text-lg mb-8 max-w-xl">
              Manually analyzing thumbnails is time-consuming. Streamline your
              content strategy with instant, precise insights.
            </p>

            <div className="flex justify-center items-center space-x-4">
              <Link href="/dashboard" className="group">
                <button
                  className="px-8 py-3.5 bg-white text-black font-semibold rounded-full 
                hover:bg-neutral-100 transition-all duration-300 
                flex items-center gap-2.5 shadow-lg group-hover:shadow-xl"
                >
                  Get Started for Free
                  <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
  )
}