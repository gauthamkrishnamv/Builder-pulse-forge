import { useNavigate } from "react-router-dom";
import { ArrowLeft, FileText, Gift, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

const stats = [
  {
    value: "31",
    label: "KB article uploaded",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    value: "92",
    label: "Rewards gained",
    icon: Gift,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    value: "4.45",
    label: "Average ratings",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
];

export default function Stats() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-am-cream">
      <Header />

      <main className="p-6 max-w-4xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="mb-6 text-am-dark hover:bg-white/50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
        </Button>

        <h1 className="text-2xl font-bold text-am-dark mb-8">Your stats</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}
                  >
                    <IconComponent className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl font-bold text-am-dark mb-2">
                    {stat.value}
                    {stat.label.includes("ratings") && (
                      <Star className="inline h-6 w-6 text-yellow-400 ml-1" />
                    )}
                    {stat.label.includes("Rewards") && (
                      <div className="inline-block w-6 h-6 bg-am-blue rounded-full ml-2 relative">
                        <div className="absolute inset-1 bg-white rounded-full"></div>
                      </div>
                    )}
                    {stat.label.includes("article") && (
                      <div className="inline-block w-6 h-6 bg-am-blue rounded ml-2 relative">
                        <div className="absolute inset-1 bg-white rounded-sm"></div>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Redeem Button */}
        <div className="flex justify-end">
          <Button className="bg-am-blue hover:bg-am-blue/90 text-white px-8 py-3 rounded-full font-semibold">
            Redeem
          </Button>
        </div>

        {/* Additional Stats Section */}
        <div className="mt-12 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-am-dark mb-4">
            Activity Overview
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-am-dark">156</div>
              <div className="text-sm text-gray-600">Videos Watched</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-am-dark">23</div>
              <div className="text-sm text-gray-600">Comments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-am-dark">8</div>
              <div className="text-sm text-gray-600">Courses Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-am-dark">47h</div>
              <div className="text-sm text-gray-600">Learning Time</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
