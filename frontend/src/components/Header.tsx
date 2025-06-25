import { Menu, Search, X , Plus} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import myImage from '@/images/image.png';
import { useEffect, useState } from "react";


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
  const [search, setSearch] = useState("");
  const [videoTitles, setVideoTitles] = useState<{ title: string; filename: string }[]>([]);
  const [filtered, setFiltered] = useState<{ title: string; filename: string }[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

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
    navigate("/stats");
    setSidebarOpen(false);
  };

  const handleLogoutClick = () => {
    // Logic for logging out (if any) can be added here
    navigate("/login"); // Redirect to the login page
  };

  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((data) => setBackendMessage(data.message))
      .catch((err) => console.error("Backend fetch error:", err));
  }, []);

  fetch("http://localhost:5000/videos")
  .then((res) => res.json())
  .then((videos) =>
    setVideoTitles(
      videos.map((v: any) => ({
        title: v.title,
        filename: v.filename,
      }))
    )
  )
  .catch((err) => console.error("Video fetch error:", err));
  
  useEffect(() => {
    if (search.length > 0) {
      setFiltered(
        videoTitles.filter(v =>
          v.title.toLowerCase().includes(search.toLowerCase())
        )
      );
      setShowDropdown(true);
    } else {
      setFiltered([]);
      setShowDropdown(false);
    }
  }, [search, videoTitles]);

  return (
    <header className="relative flex items-center justify-between p-4 bg-am-cream">
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

      {/* <div className="absolute left-1/2 top-2 -translate-x-1/2 text-xs text-gray-500">
        {backendMessage && `Backend says: ${backendMessage}`}
      </div> */}

      {/* Centered Search and Add Button */}
      <div className="flex-grow flex justify-center items-center gap-4">
        {showSearch && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-full border-2 border-gray-300 bg-white w-64"
            onFocus={() => search && setShowDropdown(true)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // Delay to allow click
          />
          {/* Dropdown */}
          {showDropdown && filtered.length > 0 && (
            <ul className="absolute left-0 right-0 mt-1 bg-white border rounded shadow z-50 max-h-48 overflow-y-auto">
              {filtered.map((v) => (
                <li
                  key={v.filename}
                  className="px-4 py-2 hover:bg-am-blue/10 cursor-pointer"
                  onMouseDown={() => {
                    setSearch("");
                    setShowDropdown(false);
                    navigate(`/video/${v.filename}`);
                  }}
                >
                  {v.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
       {/* Add Button */}
  {showSearch && (
  <Button
    className="ml-4 bg-am-blue hover:bg-am-blue/90 text-white rounded-full px-6"
    onClick={handleAddClick}
  >
    <Plus className="h-5 w-5" />
    Add
  </Button>
  )}
      </div>

      {/* Logout Button and Image positioned at the top right corner */}
      <div className="flex items-center gap-2 absolute top-4 right-4">
        <Button
          onClick={handleLogoutClick}
          className="bg-am-blue hover:bg-am-blue/90 text-white rounded-full px-6"
        >
          Logout
        </Button>
        <img 
          src={myImage} 
          alt="Description of the image" 
          style={{ width: '10jen  0px', height: '40px' }} // Adjust size as needed
          className="rounded-lg" 
        />
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
