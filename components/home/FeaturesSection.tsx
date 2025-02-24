import { Eye, Palette, Layout } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Font Analysis",
    description:
      "Identify fonts, sizes, and styles used in successful thumbnails",
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: "Color Detection",
    description: "Extract color palettes and understand color psychology",
  },
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Layout Insights",
    description: "Learn about composition and element placement",
  },
];

export function FeaturesSection() {
  return (
    <div className="pt-40 px-4 bg-neutral-100">
      <h2 className="text-2xl md:text-4xl font-semibold text-center mb-12 text-black dark:text-white">
        Powerful Features for Creators
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </div>
  );
}