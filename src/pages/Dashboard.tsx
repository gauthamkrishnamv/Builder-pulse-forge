import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { VideoCard } from "@/components/VideoCard";

const suggestedVideos = [
  {
    id: "1",
    title: "Resolving JAVA freeze",
    thumbnail:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop&crop=center",
    duration: "05:10",
    views: 150,
    rating: 4.68,
  },
  {
    id: "2",
    title: "What is SEMI E84?",
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center",
    duration: "03:23",
    views: 168,
    rating: 4.58,
  },
  {
    id: "3",
    title: "All PDC explained",
    thumbnail:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop&crop=center",
    duration: "12:15",
    views: 1024,
    rating: 4.91,
  },
];

const subscriptionVideos = [
  {
    id: "4",
    title: "Semiconductor basic",
    thumbnail:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop&crop=center",
    duration: "08:30",
    views: 150,
    rating: 4.68,
  },
  {
    id: "5",
    title: "Link computing",
    thumbnail:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop&crop=center",
    duration: "03:23",
    views: 168,
    rating: 4.58,
  },
  {
    id: "6",
    title: "JAVA core",
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop&crop=center",
    duration: "12:15",
    views: 1024,
    rating: 4.91,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";

  const handleVideoClick = (videoId: string) => {
    navigate(`/video/${videoId}`);
  };

  return (
    <div className="min-h-screen bg-am-cream">
      <Header showSearch showMenu userName={userName} />

      <main className="p-6 max-w-7xl mx-auto">
        {/* Suggested Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-am-dark mb-4">Suggested</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedVideos.map((video) => (
              <VideoCard
                key={video.id}
                {...video}
                onClick={() => handleVideoClick(video.id)}
              />
            ))}
          </div>
        </section>

        {/* Subscriptions Section */}
        <section>
          <h2 className="text-lg font-semibold text-am-dark mb-4">
            Subscriptions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptionVideos.map((video) => (
              <VideoCard
                key={video.id}
                {...video}
                onClick={() => handleVideoClick(video.id)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
