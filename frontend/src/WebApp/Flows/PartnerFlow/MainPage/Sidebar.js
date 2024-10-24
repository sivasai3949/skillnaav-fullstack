import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBriefcase,
  faPlus,
  faLifeRing,
  faEnvelope,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import logo from "../../../../assets-webapp/Skillnaav-logo.png"; // Replace with your actual logo path
import { useTabContext } from "./UserHomePageContext/HomePageContext"; // Adjust path as needed
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Sidebar = () => {
  const [selectedTab, setSelectedTab] = useState("your-job-posts"); // Set default tab to "your-job-posts"
  const { handleSelectTab } = useTabContext();
  const navigate = useNavigate(); // Initialize navigate hook

  const handleTabClick = (tab) => {
    if (tab === "logout") {
      // Clear user information from localStorage
      localStorage.removeItem("userInfo");
      // Redirect to login page
      navigate("/partner/login");
    } else {
      setSelectedTab(tab);
      handleSelectTab(tab);
    }
  };

  // Define menu items
  const menuItems = [
    { id: "your-job-posts", label: "Internship Posts", icon: faBriefcase },
    { id: "post-a-job", label: "Post An Internship", icon: faPlus },
    { id: "messages", label: "Messages", icon: faEnvelope },
    { id: "profile", label: "Profile", icon: faUser },
  ];

  // Define support and logout items
  const actionItems = [
    { id: "support", icon: faLifeRing, label: "Support" },
    {
      id: "logout",
      icon: faSignOutAlt,
      label: "Logout",
      customTextColor: "text-teal-500",
      hoverBg: "hover:bg-teal-100",
    },
  ];

  // Reusable Sidebar Button Component
  const SidebarButton = ({ item }) => {
    const isSelected = selectedTab === item.id;
    const selectedColor = "bg-teal-100 text-teal-500";
    const defaultColor = "text-gray-700 hover:bg-gray-100"; // Dark gray text by default

    return (
      <button
        onClick={() => handleTabClick(item.id)}
        className={`flex items-center p-3 rounded-lg w-full text-left font-semibold ${
          isSelected ? selectedColor : defaultColor
        } ${item.hoverBg || "hover:bg-gray-100"}`}
      >
        <FontAwesomeIcon
          icon={item.icon}
          className={`w-5 h-5 mr-3 ${
            isSelected ? "text-teal-500" : "text-[475467]" // Dark gray icon by default
          }`}
        />
        <span
          className={`${
            isSelected ? "text-teal-500" : "text-[475467]" // Dark gray text by default
          }`}
        >
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <div className="w-64 h-screen bg-white flex flex-col justify-between pl-6 pr-6 font-poppins shadow-lg sticky top-0 overflow-y-auto scrollbar-hide">
      {/* Logo Section */}
      <div className="sticky top-0 z-10 bg-white py-4 flex items-center justify-center">
        <img
          src={logo}
          alt="Skillnaav Logo"
          className="h-16 object-contain" // Adjust height and ensure the image maintains aspect ratio
        />
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <SidebarButton item={item} />
            </li>
          ))}
        </ul>
      </nav>

      {/* Support and Logout Section */}
      <div className="mt-6">
        <ul className="space-y-2">
          {actionItems.map((item) => (
            <li key={item.id}>
              <SidebarButton item={item} />
            </li>
          ))}
        </ul>

        {/* Upgrade Section */}
        <div className="mt-6 p-4 bg-teal-100 rounded-lg">
          <h3 className="text-teal-700 text-sm font-semibold">
            UPGRADE TO PREMIUM
          </h3>
          <p className="text-xs text-teal-600 mt-1">
            Your team has used 80% of your available space. Need more?
          </p>
          <button className="mt-4 w-full bg-teal-700 text-white py-2 px-4 rounded-lg">
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
