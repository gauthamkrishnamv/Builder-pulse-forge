import { Menu, Search } from "lucide-react";
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

  const handleAddClick = () => {
    navigate("/add");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <header className="flex items-center justify-between p-4 bg-am-cream">
      <div className="flex items-center gap-4">
        {showMenu && (
          <Button variant="ghost" size="icon" className="text-am-dark">
            <Menu className="h-5 w-5" />
          </Button>
        )}

        {userName && (
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center cursor-pointer hover:bg-orange-600 transition-colors"
              onClick={handleProfileClick}
            >
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
    </header>
  );
}
