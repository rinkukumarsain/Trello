import React, { useState } from "react";
import { CalendarDays, LayoutGrid, CreditCard, Menu } from "lucide-react";

const Footer = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Default to first icon (Credit Card)

  const icons = [
    { icon: <CreditCard size={20} />, id: 0 },
    { icon: <CalendarDays size={20} />, id: 1 },
    { icon: <LayoutGrid size={20} />, id: 2 },
    { icon: <Menu size={20} />, id: 3 },
  ];

  const renderActiveContent = () => {
    
  };

  return (
    <div className="relative  bg-[#1c1f24]">
      {/* Content Area */}
      <div>{renderActiveContent()}</div>

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
