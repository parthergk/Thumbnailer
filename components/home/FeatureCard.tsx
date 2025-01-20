interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div
      className="cursor-pointer group p-6 rounded-md bg-white/5 border border-neutral-300 dark:border-neutral-800 backdrop-blur-sm 
                   transition-all duration-300 ease-in-out
                   hover:border-blue-500 dark:hover:border-blue-400
                   hover:shadow-lg hover:shadow-blue-500/10
                   hover:-translate-y-1 shadow-lg"
    >
      <div
        className="p-3 text-gray-950 bg-neutral-100 dark:bg-neutral-800 rounded-xl w-fit
                         transition-transform duration-300 ease-in-out
                         group-hover:scale-110"
      >
        {icon}
      </div>
      <h3
        className="text-xl font-semibold mt-4 text-black dark:text-white
                         transition-colors duration-300 ease-in-out
                         group-hover:text-blue-500 dark:group-hover:text-blue-400"
      >
        {title}
      </h3>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
    </div>
  );
}
