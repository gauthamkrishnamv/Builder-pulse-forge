import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface InterestTagProps {
  name: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export function InterestTag({
  name,
  selected = false,
  onClick,
  className,
}: InterestTagProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 transition-all font-medium",
        selected
          ? "bg-am-blue text-white border-am-blue"
          : "bg-white text-am-dark border-gray-300 hover:border-am-blue hover:text-am-blue",
        className,
      )}
    >
      {name}
      <Plus className="h-4 w-4" />
    </button>
  );
}
