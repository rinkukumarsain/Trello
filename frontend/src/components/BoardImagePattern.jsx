import React from 'react';
import {
  ClipboardList,
  CheckSquare,
  UserPlus,
  MessageSquare,
  CalendarClock,
  Bell,
  ArrowRightLeft,
  StickyNote,
  Tag,
} from 'lucide-react';

const BoardImagePattern = ({ title, subtitle }) => {
  const items = [
    { icon: <ClipboardList className="size-4" />, text: "New card created" },
    { icon: <CheckSquare className="size-4" />, text: "Task marked done" },
    { icon: <UserPlus className="size-4" />, text: "Member added to card" },
    { icon: <MessageSquare className="size-4" />, text: "Comment added" },
    { icon: <CalendarClock className="size-4" />, text: "Deadline updated" },
    { icon: <Bell className="size-4" />, text: "You’ve got an update" },
    { icon: <ArrowRightLeft className="size-4" />, text: "Card moved to In Progress" },
    { icon: <StickyNote className="size-4" />, text: "Description added" },
    { icon: <Tag className="size-4" />, text: "Label applied: Urgent" },
  ];

  return (
    <div className="items-center justify-center hidden p-12 lg:flex bg-base-200">
      <div className="max-w-md text-center">
        <div className="relative h-[320px] mb-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="absolute flex items-center gap-2 px-4 py-2 text-sm rounded-xl shadow bg-base-100 text-base-content/80 animate-bounce"
              style={{
                top: `${index * 32}px`,
                left: `${index % 2 === 0 ? 0 : 100}px`,
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {item.icon}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
        <h2 className="mb-4 text-2xl font-bold">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default BoardImagePattern;
