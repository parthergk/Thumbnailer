import { LinkIcon, Search, Zap } from "lucide-react";
import { StepCard } from "@/components/ui/step-card";

const steps = [
    {
      icon: LinkIcon,
      title: "Enter YouTube URL",
      description: "Paste any YouTube video URL to get started with the analysis",
      image: "/image/step1.png",
    },
    {
      icon: Search,
      title: "Fetch Thumbnail",
      description:
        "Our tool automatically retrieves the high-quality thumbnail image",
      image: "/image/step2.png",
    },
    {
      icon: Zap,
      title: "Get Insights",
      description: "View detailed analysis of fonts, colors, layout, and more",
      image: "/image/step3.png",
    },
  ];

export function HowItWorksSection() {
  return (
    <div className="py-40 px-4 bg-gradient-to-b from-neutral-100 to-white">
      <h2 className="text-2xl md:text-4xl font-semibold text-center mb-12 text-black dark:text-white">
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
  );
}