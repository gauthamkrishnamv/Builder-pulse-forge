import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation - in real app would authenticate with backend
    if (employeeId && password) {
      localStorage.setItem("userName", "Fazil");
      navigate("/interests");
    }
  };

  return (
    <div className="min-h-screen bg-am-cream flex items-center justify-center p-4">
      {/* Applied Materials Logo */}
      <div className="absolute top-6 right-6">
        <div className="bg-am-blue rounded-lg px-4 py-2">
          <div className="flex items-center gap-2 text-white">
            <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <span className="font-semibold text-sm">APPLIED MATERIALS</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-6xl flex items-center justify-between">
        {/* Left side - Images */}
        <div className="hidden lg:flex flex-col gap-4 relative">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop&crop=center"
              alt="Team collaboration"
              className="rounded-xl shadow-lg w-80 h-48 object-cover"
            />
          </div>
          <div className="relative ml-20 -mt-8">
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=300&h=200&fit=crop&crop=center"
              alt="Scientific research"
              className="rounded-xl shadow-lg w-64 h-40 object-cover"
            />
          </div>
          <div className="absolute top-32 left-32">
            <img
              src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=250&h=180&fit=crop&crop=center"
              alt="Innovation"
              className="rounded-xl shadow-lg w-56 h-36 object-cover"
            />
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full max-w-md">
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-6xl font-bold text-am-dark mb-4">
              make
              <br />
              possible.
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Welcome to applied material's knowledge base -{" "}
              <span className="font-semibold">Learn@AMAT</span>
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="employeeId" className="sr-only">
                Employee ID
              </Label>
              <Input
                id="employeeId"
                type="text"
                placeholder="Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-am-blue focus:ring-0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:border-am-blue focus:ring-0"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-am-blue hover:bg-am-blue/90 text-white py-3 rounded-lg font-semibold text-lg mt-6"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
