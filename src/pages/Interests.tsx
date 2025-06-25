import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InterestTag } from "@/components/InterestTag";

const interests = [
  "FIFA",
  "ADC",
  "PrimeVision",
  "ProVision",
  "OPWI",
  "Link",
  "Verity",
  "Athena",
  "DRSEM",
  "Computing",
  "All",
];

export default function Interests() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  const handleFinish = () => {
    // Save interests to localStorage or send to backend
    localStorage.setItem(
      "selectedInterests",
      JSON.stringify(selectedInterests),
    );
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-am-cream">
      {/* Header */}
      <div className="flex justify-end p-6">
        <div className="bg-am-blue rounded-lg px-4 py-2">
          <div className="flex items-center gap-2 text-white">
            <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <span className="font-semibold text-sm">APPLIED MATERIALS</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-am-dark mb-8">
            choose your interests..
          </h1>
        </div>

        {/* Interest Tags */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mb-12">
          {interests.map((interest) => (
            <InterestTag
              key={interest}
              name={interest}
              selected={selectedInterests.includes(interest)}
              onClick={() => toggleInterest(interest)}
            />
          ))}
        </div>

        {/* Finish Button */}
        <Button
          onClick={handleFinish}
          className="bg-am-blue hover:bg-am-blue/90 text-white px-8 py-3 rounded-full font-semibold text-lg"
          disabled={selectedInterests.length === 0}
        >
          Finish
        </Button>
      </div>
    </div>
  );
}
