import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  showSearch?: boolean;
  showMenu?: boolean;
  userName?: string;
}

export function Header({
  showSearch = false,
  showMenu = false,
  userName,
}: HeaderProps) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAddClick = () => {
    navigate("/add");
  };

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleStatsClick = () => {
    navigate("/stats");
    setSidebarOpen(false);
  };

  const handleProfileClick = () => {
    navigate("/profile");
    setSidebarOpen(false);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-am-cream">
      <div className="flex items-center gap-4">
        {showMenu && (
          <Button
            variant="ghost"
            size="icon"
            className="text-am-dark"
            onClick={handleMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        {userName && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
              <span className="text-sm font-semibold text-white">F</span>
            </div>
            <div>
              <p className="text-sm text-am-dark">Hi {userName},</p>
              <h1 className="text-2xl font-bold text-am-dark">Your feed</h1>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {showSearch && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search"
                className="pl-10 pr-4 py-2 rounded-full border-2 border-gray-300 bg-white w-64"
              />
            </div>
            <Button
              onClick={handleAddClick}
              className="bg-am-blue hover:bg-am-blue/90 text-white rounded-full px-6"
            >
              Add
            </Button>
          </div>
        )}

        <div className="bg-am-blue rounded-lg px-4 py-2">
          <div className="flex items-center gap-2 text-white">
            <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <span className="font-semibold text-sm">APPLIED MATERIALS</span>
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative w-80 bg-white shadow-xl">
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-am-dark"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>

            {/* Sidebar Content */}
            <div className="p-6">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-8 mt-8">
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
                  <h3
                    className="text-lg font-semibold text-am-dark hover:text-am-blue cursor-pointer transition-colors"
                    onClick={handleProfileClick}
                  >
                    My profile
                  </h3>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-am-dark hover:text-am-blue cursor-pointer transition-colors">
                    Favourites
                  </h3>
                </div>
                <div>
                  <h3
                    className="text-lg font-semibold text-am-dark hover:text-am-blue cursor-pointer transition-colors"
                    onClick={handleStatsClick}
                  >
                    Your stats
                  </h3>
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
