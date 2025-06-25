import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
import { useEffect, useState } from "react";

type VideoMeta = {
  filename: string;
  title: string;
  description: string;
  // add more fields if needed
};

// const videoData = {
//   "1": {
//     title: "Resolving Java freeze",
//     thumbnail:
//       "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop&crop=center",
//     author: "Joseph Vijay",
//     views: 150,
//     rating: 4.68,
//     description:
//       "Lorem pellentesque cursus risus nibh enim tellus. At mi suspendisse purus nunc porttitor mi ornare. Hac sagittis felis libero lorem aliquet. Suspendisse quam sed id et dignissim diam pulvinar consectetur. Ut elit ac leo in posuere id. Sit.\n\nLacus pellentesque cursus risus nibh enim tellus. At mi suspendiss.",
//   },
// };

// const comments = [
//   {
//     id: 1,
//     author: "@john.connor",
//     text: "That is a nice informative video. Thank you! @supervisor",
//   },
//   {
//     id: 2,
//     author: "@supervisor",
//     text: "That is a nice informative video. Thank you! @supervisor",
//   },
//   {
//     id: 3,
//     author: "@supervisor",
//     text: "That is a nice informative video. Thank you!",
//   },
// ];

export default function VideoDetail() {
  const { id } = useParams<{ id: string }>();
  const [video, setVideo] = useState<VideoMeta | null>(null);
  const [play, setPlay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then(res => res.json())
      .then((videos: VideoMeta[]) => {
        const found = videos.find(v => v.filename === id);
        setVideo(found || null);
      });
  }, [id]);
  
  if (!video) {
    return <div>Loading...</div>;
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
              {!play ? (
                <div
                  className="w-full h-80 flex items-center justify-center bg-black cursor-pointer relative"
                  onClick={() => setPlay(true)}
                >
                  {/* Optionally use a thumbnail here */}
                  {/* <img src={video.thumbnail} alt={video.title} className="absolute w-full h-full object-cover opacity-60" /> */}
                  <Play className="h-16 w-16 text-white z-10" fill="currentColor" />
                </div>
              ) : (
                <video
                  src={`http://localhost:5000/uploads/${video.filename}`}
                  controls
                  autoPlay
                  className="w-full h-80 object-cover bg-black"
                />
              )}
            </div>
          </div>

          {/* Video Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-am-dark mb-2">
                {video.title}
              </h1>
              <p className="text-gray-700 leading-relaxed mb-6">
                {video.description}
              </p>
              {/* ...rest of your info, ratings, comments... */}
            </div>
            {/* Comment Section */}
            {/* ... */}
          </div>
        </div>
      </main>
    </div>
  );
}
