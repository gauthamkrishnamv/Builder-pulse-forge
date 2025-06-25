import { Star, Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  rating: number;
  className?: string;
  onClick?: () => void;
}

export function VideoCard({
  id,
  title,
  thumbnail,
  duration,
  views,
  rating,
  className,
  onClick,
}: VideoCardProps) {
  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${Math.floor(views / 1000)}k views`;
    }
    return `${views} views`;
  };

  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden",
        className,
      )}
      onClick={onClick}
    >
      <div className="relative">
        <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <Play className="h-12 w-12 text-white" fill="currentColor" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
          {duration}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-am-dark text-lg mb-2 line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{formatViews(views)}</span>
          <div className="flex items-center gap-1">
            <span className="font-medium">{rating.toFixed(2)}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "h-3 w-3",
                    star <= Math.round(rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
