import React, { useState } from "react";
import { CalendarDays, LayoutGrid, CreditCard, Menu } from "lucide-react";
import Calendar from "./Calendar"; // your Calendar component

const Footer = () => {
  const [activeIndex, setActiveIndex] = useState(1); // Default to Calendar

  const icons = [
    { icon: <CreditCard size={20} />, id: 0 },
    { icon: <CalendarDays size={20} />, id: 1 },
    { icon: <LayoutGrid size={20} />, id: 2 },
    { icon: <Menu size={20} />, id: 3 },
  ];

  const renderActiveContent = () => {
    switch (activeIndex) {
      case 0:
        return <div className="text-white p-6">💳 Credit Card View (placeholder)</div>;
      case 1:
        return <Calendar />;
      case 2:
        return <div className="text-white p-6">📦 Layout Grid View (placeholder)</div>;
      case 3:
        return <div className="text-white p-6">📋 Menu View (placeholder)</div>;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#1c1f24]">
      {/* Content Area */}
      <div className="pb-24">{renderActiveContent()}</div>

      {/* Floating Footer Menu */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#22272b] px-4 py-2 rounded-2xl shadow-lg flex gap-6 items-center z-50">
        {icons.map(({ icon, id }) => (
          <div
            key={id}
            onClick={() => setActiveIndex(id)}
            className={`relative p-2 rounded-lg cursor-pointer transition-colors duration-200
              ${activeIndex === id ? "bg-[#2b3c64]" : "hover:bg-[#333c44]"}`}
            title={`Menu ${id + 1}`}
          >
            <div
              className={`text-white/80 ${
                activeIndex === id ? "text-blue-400" : ""
              }`}
            >
              {icon}
            </div>
            {activeIndex === id && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-blue-400 rounded-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Footer;
