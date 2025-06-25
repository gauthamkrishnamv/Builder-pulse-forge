import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";

const videoData = {
  "1": {
    title: "Resolving Java freeze",
    thumbnail:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop&crop=center",
    author: "Joseph Vijay",
    views: 150,
    rating: 4.68,
    description:
      "Lorem pellentesque cursus risus nibh enim tellus. At mi suspendisse purus nunc porttitor mi ornare. Hac sagittis felis libero lorem aliquet. Suspendisse quam sed id et dignissim diam pulvinar consectetur. Ut elit ac leo in posuere id. Sit.\n\nLacus pellentesque cursus risus nibh enim tellus. At mi suspendiss.",
  },
};

const comments = [
  {
    id: 1,
    author: "@john.connor",
    text: "That is a nice informative video. Thank you! @supervisor",
  },
  {
    id: 2,
    author: "@supervisor",
    text: "That is a nice informative video. Thank you! @supervisor",
  },
  {
    id: 3,
    author: "@supervisor",
    text: "That is a nice informative video. Thank you!",
  },
];

export default function VideoDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const video = videoData[id as keyof typeof videoData];

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className="min-h-screen bg-am-cream">
      <Header />

      <main className="p-6 max-w-6xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-4 text-am-dark hover:bg-white/50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Player */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-sm">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Play className="h-16 w-16 text-white" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Video Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-am-dark mb-2">
                {video.title}
              </h1>
              <p className="text-sm text-gray-600 mb-4">
                Video courtesy:{" "}
                <span className="text-am-blue">@{video.author}</span>
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                {video.description}
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <span className="font-medium text-am-dark">
                    {video.rating.toFixed(2)}
                  </span>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.round(video.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-gray-600">{video.views} views</span>
              </div>
            </div>

            {/* Comment Section */}
            <div className="space-y-4">
              <Textarea
                placeholder="Type your comment here..."
                className="w-full bg-white border-2 border-gray-300 rounded-lg"
              />

              <div>
                <h3 className="font-semibold text-am-dark mb-4">Comments</h3>
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="text-sm">
                      <span className="font-medium text-am-blue">
                        {comment.author}
                      </span>
                      <p className="text-gray-700 mt-1">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
