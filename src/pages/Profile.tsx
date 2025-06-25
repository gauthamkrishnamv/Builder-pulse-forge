import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

export default function Profile() {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "User";

  return (
    <div className="min-h-screen bg-am-cream">
      <Header />

      <main className="flex">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard")}
          className="absolute top-4 left-4 z-10 text-am-dark hover:bg-white/50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>
        {/* Profile Sidebar */}
        <div className="w-80 bg-white shadow-sm min-h-screen p-6">
          {/* User Info */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
              <span className="text-lg font-semibold text-white">F</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-am-dark">
                Fazil Mohamed
              </h2>
              <p className="text-sm text-gray-600">
                fazilmohamed@contractor.amat.com
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-am-dark hover:text-am-blue cursor-pointer transition-colors">
                My profile
              </h3>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-am-dark hover:text-am-blue cursor-pointer transition-colors">
                Favourites
              </h3>
            </div>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl">
            <h1 className="text-2xl font-bold text-am-dark mb-6">My Profile</h1>

            {/* Profile Content Placeholder */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-am-dark mb-4">
                Profile Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="text-am-dark">Fazil Mohamed</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="text-am-dark">
                    fazilmohamed@contractor.amat.com
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <div className="text-am-dark">Engineering</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
