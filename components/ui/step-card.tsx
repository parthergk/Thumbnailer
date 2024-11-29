import { LucideIcon } from "lucide-react";
import Image from "next/image";

interface StepCardProps {
  icon: LucideIcon;
  step: number;
  title: string;
  description: string;
  image: string;
}

export function StepCard({ icon: Icon, step, title, description, image }: StepCardProps) {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative p-6 bg-white dark:bg-black rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
            <Icon className="w-6 h-6 text-gray-700" />
          </div>
          <span className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            Step {step}
          </span>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-black dark:text-white">
          {title}
        </h3>
        <p className="mt-2 mb-4 text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
        <div className="relative h-48 w-full rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className=" object-contain"
          />
        </div>
      </div>
    </div>
  );
}