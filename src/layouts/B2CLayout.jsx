// layouts/RootLayout.jsx
import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  MessageSquare,
  GraduationCap,
  PlaySquare,
  Building2,
  HelpCircle,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const B2CLayout = () => {
  const location = useLocation();

  const sidebarItems = [
    { icon: MessageSquare, text: "실전모의면접", path: "/user/interview" },
    { icon: GraduationCap, text: "취업 코칭", path: "/user/coaching" },
    { icon: PlaySquare, text: "이용권", path: "/user/subscription" },
    { icon: Building2, text: "제휴서비스 신청", path: "/user/partnership" },
    { icon: HelpCircle, text: "의견을 들려주세요", path: "/user/feedback" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r min-h-screen p-4 fixed">
        <div className="flex items-center space-x-2 mb-8">
          <NavLink to="/user" className="text-xl font-bold">
            Salarable
          </NavLink>
        </div>

        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-lg cursor-pointer",
                  isActive
                    ? "bg-purple-50 text-purple-500"
                    : "text-gray-600 hover:bg-gray-100"
                )
              }
            >
              <item.icon size={20} />
              <span>{item.text}</span>
            </NavLink>
          ))}
          <div className="pt-8">
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600">
              <User size={20} />
              <span>User</span>
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default B2CLayout;
