"use client";

import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Youtube, Eye, Layout, Palette, ArrowRight, CheckCircle, Link as LinkIcon, Search, Zap, Quote, Mail, Twitter, Github, Instagram } from "lucide-react";import Link from "next/link";
import Image from "next/image";
import { StepCard } from "@/components/ui/step-card";

const steps = [
  {
    icon: LinkIcon,
    title: "Enter YouTube URL",
    description: "Paste any YouTube video URL to get started with the analysis",
    image: "/image/step1.png"
  },
  {
    icon: Search,
    title: "Fetch Thumbnail",
    description: "Our tool automatically retrieves the high-quality thumbnail image",
    image: "/image/step2.png"
  },
  {
    icon: Zap,
    title: "Get Insights",
    description: "View detailed analysis of fonts, colors, layout, and more",
    image: "/image/step3.png"
  }
];

const features = [
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Font Analysis",
    description: "Identify fonts, sizes, and styles used in successful thumbnails"
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Color Detection",
    description: "Extract color palettes and understand color psychology"
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Layout Insights",
    description: "Learn about composition and element placement"
  }
];

const benefits = [
  "Instant thumbnail analysis",
  "Professional design insights",
  "Competitor research made easy",
  "Time-saving recommendations"
];

const testimonials = [
  {
    quote: "I've clipped for some of the biggest creators on the internet. This tool is what I wish I had when I started.",
    author: "Musa Mustafa",
    role: "Co-Founder, Crayo",
    details: "Clipped for SNEAKO, Sidemen, and more",
    avatar: "/image/avatar.jpg"
  }
];

export default function Home() {
  return (
    <div className="mt-16 w-full">
      <BackgroundBeamsWithCollision>
        {/* Hero Section */}
        <div className="flex flex-col pt-16">
          <div
            className="flex justify-center"
            style={{ opacity: 1, transform: "none" }}
          >
            <button className="bg-neutral-50 dark:bg-neutral-700 no-underline group cursor-pointer relative md:shadow-2xl shadow-zinc-900 rounded-full p-px text-[10px] sm:text-xs font-semibold leading-6 text-neutral-700 dark:text-neutral-300 inline-block w-fit mx-auto">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-neutral-100 dark:bg-neutral-800 py-1.5 px-4 ring-1 ring-white/10">
                <span>Helping creators design standout thumbnails effortlessly!</span>
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

          <h1 className="mt-6 font-g text-2xl md:text-4xl lg:text-8xl font-semibold mx-auto text-center z-10 text-black dark:text-white tracking-tight">
            Analyze YouTube Thumbnails <br /> and Design Like a Pro!
          </h1>

          <p className="text-center mt-8 text-base md:text-xl text-muted dark:text-muted-dark max-w-[22rem] md:max-w-3xl mx-auto z-10 text-neutral-500 dark:text-white">
            Unleash your creativity! Our tool analyzes font styles, colors, and
            layouts of existing YouTube thumbnails, giving you the insights and
            inspiration to create stunning thumbnails.
          </p>

          <div className="flex justify-center items-center mt-8 space-x-4">
            <Link href="/dashboard">
              <button className="text-sm py-3 px-6 bg-black dark:bg-white dark:text-black text-white rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors flex items-center gap-2">
                Get started for free
                <ArrowRight className="w-4 h-4" />
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
      </BackgroundBeamsWithCollision>

      {/* Features Section */}
      <div className=" pt-40 px-4 bg-neutral-100">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-black dark:text-white">
          Powerful Features for Creators
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/5 border border-neutral-200 dark:border-neutral-800 backdrop-blur-sm"
            >
              <div className="p-3 text-gray-950 bg-neutral-100 dark:bg-neutral-800 rounded-xl w-fit">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mt-4 text-black dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>


      {/* How It Works Section */}
      <div className=" pt-48 px-4 bg-gradient-to-b from-neutral-100 to-white">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-black dark:text-white">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              step={index + 1}
              title={step.title}
              description={step.description}
              image={step.image}
            />
          ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="px-4 pt-40 pb-24">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-black dark:text-white">
          Why Choose Our Tool?
        </h2>
        <div className="max-w-2xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex justify-between items-center space-x-3 mb-4"
            >
              <span className="text-lg text-neutral-700 dark:text-neutral-300">
                {index}.{benefit}
              </span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
          ))}
        </div>
      </div>

      {/* footer image */}
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
            Manually analyzing thumbnails is time-consuming. Streamline your content strategy with instant, precise insights.
          </p>
          
          <div className="flex justify-center items-center space-x-4">
            <Link href="/dashboard" className="group">
              <button className="px-8 py-3.5 bg-white text-black font-semibold rounded-full 
                hover:bg-neutral-100 transition-all duration-300 
                flex items-center gap-2.5 shadow-lg group-hover:shadow-xl">
                Get Started for Free
                <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    {/* Footer Section */}
    <footer className="bg-white text-neutral-800 pt-20 pb-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between  gap-12">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-semibold mb-4 text-neutral-900">About Thumbnail Analyzer</h3>
            <p className="text-neutral-600 mb-6 leading-relaxed max-w-lg">
              Our AI-powered tool helps content creators optimize their YouTube thumbnails
              by analyzing successful videos and providing actionable insights about fonts,
              colors, and layouts.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/parther_gk" className="text-neutral-500 hover:text-black transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com/parthergk" className="text-neutral-500 hover:text-black transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/parther_gk" className="text-neutral-500 hover:text-black transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-neutral-900">Contact Us</h3>
            <div className="space-y-3">
              <a href="mailto:support@thumbnailanalyzer.com" 
                 className="flex items-center space-x-2 text-neutral-600 hover:text-black transition-colors">
                <Mail className="w-4 h-4" />
                <span>support@thumbnailanalyzer.com</span>
              </a>
              <p className="text-neutral-600">
                Available Monday to Friday<br />
                9:00 AM - 6:00 PM EST
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-neutral-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} Thumbnail Analyzer. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/" className="text-neutral-600 hover:text-black transition-colors">
                Privacy Policy
              </Link>
              <Link href="/" className="text-neutral-600 hover:text-black transition-colors">
                Terms of Service
              </Link>
              <Link href="/" className="text-neutral-600 hover:text-black transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}