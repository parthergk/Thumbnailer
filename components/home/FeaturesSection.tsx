import { Eye, Palette, Layout } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    icon: <Eye className="w-5 h-5 text-neutral-900 dark:text-neutral-300" />,
    title: "Font Analysis",
    description:
      "Identify fonts, sizes, and styles used in successful thumbnails",
  },
  {
    icon: <Palette className="w-5 h-5 text-neutral-900 dark:text-neutral-300" />,
    title: "Color Detection",
    description: "Extract color palettes and understand color psychology",
  },
  {
    icon: <Layout className="w-5 h-5 text-neutral-900 dark:text-neutral-300" />,
    title: "Layout Insights",
    description: "Learn about composition and element placement",
  },
];

export function FeaturesSection() {
  return (
    <div className="pt-32 border-none bg-gradient-to-b bg-neutral-100 dark:from-neutral-800 dark:to-neutral-950">
      <div className=" pt-12 px-6 border-t border-neutral-300 dark:border-neutral-700 ">
        <div className=" flex justify-center items-center gap-2 w-fit px-2.5 py-0.5 mb-3 bg-neutral-50 dark:bg-neutral-800 dark:shadow-neutral-950 border shadow-md rounded-full ">
          <div className=" h-1.5 w-1.5 bg-neutral-900 dark:bg-white rounded-full"></div>
          <span className=" text-xs sm:text-sm font-medium text-neutral-900 dark:text-white">
            Features
          </span>
        </div>
        <h2 className="text-2xl md:text-4xl font-medium mb-8 text-neutral-900 dark:text-white">
          Powerful Features for Creators
        </h2>
        <div className=" grid grid-cols-2 border-t pt-2 ">
          <div className="grid md:grid-rows-3 gap-2 px-4 max-w-md border-r">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
