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
    <div className="relative group perspective-1000 cursor-pointer">

      <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-500 
                      opacity-0 group-hover:opacity-75 blur-sm transition-all duration-500 
                      animate-gradient-xy dark:from-blue-500 dark:via-teal-500 dark:to-indigo-400" />
      
      <div className="relative p-6 bg-white dark:bg-neutral-900 rounded-lg 
                      transition-all duration-500 ease-out
                      group-hover:translate-y-1 group-hover:shadow-lg
                      dark:group-hover:shadow-[0px_0px_10px_rgba(255,255,255,0.1)]
                      border border-neutral-200 dark:border-neutral-800">
        
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-xl
                          transform transition-all duration-500
                          group-hover:rotate-12 group-hover:scale-110">
            <Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </div>
          <span className="text-sm font-medium bg-gradient-to-r from-teal-500 to-blue-500 
                         dark:from-blue-400 dark:to-teal-400
                         bg-clip-text text-transparent
                         transform transition-all duration-500
                         group-hover:scale-105">
            Step {step}
          </span>
        </div>

        <h3 className="mt-4 text-xl font-semibold text-black dark:text-white
                       transform transition-all duration-500
                       group-hover:translate-x-2">
          {title}
        </h3>
        <p className="mt-2 mb-4 text-neutral-600 dark:text-neutral-400
                      transform transition-all duration-300
                      group-hover:text-neutral-800 dark:group-hover:text-neutral-200">
          {description}
        </p>

        <div className="relative h-48 w-full rounded-lg overflow-hidden
                        transform transition-all duration-500
                        group-hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-500/10 
                          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain transform transition-all duration-700
                       group-hover:scale-110"
          />
        </div>
      </div>
    </div>
  );
}

const keyframes = {
  '0%, 100%': {
    'background-position': '0% 50%',
  },
  '50%': {
    'background-position': '100% 50%',
  },
};