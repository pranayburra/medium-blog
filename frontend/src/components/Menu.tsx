import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signup");
  };

  const menuItems = [
    {
      path: '/profile',
      label: 'Profile',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Profile"
          className="transition-transform group-hover:scale-110"
        >
          <circle cx="12" cy="7" r="4.5" stroke="currentColor"></circle>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            d="M3.5 21.5v-4.342C3.5 15.414 7.306 14 12 14s8.5 1.414 8.5 3.158V21.5"
          ></path>
        </svg>
      ),
    
    },
  ];

  return (
    <div className="flex flex-col items-center text-gray-600 gap-4 p-4 min-w-[240px] w-full bg-white rounded-lg shadow-sm">
      {menuItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`group flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:text-gray-900 ${
            location.pathname === item.path
              ? "bg-gray-50 text-gray-900 font-medium"
              : ""
          }`}
          aria-label={`Navigate to ${item.label}`}
        >
          <div className="text-gray-500 group-hover:text-gray-900">
            {item.icon}
          </div>
          <span className="text-sm">{item.label}</span>
        </button>
      ))}

      <div className="w-full h-[1px] bg-gray-200 my-2"></div>

      <div className="w-full">
        <div className="text-sm text-gray-500 mb-2">Account</div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 group"
          aria-label="Sign out of your account"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            className="transition-transform group-hover:scale-110"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="text-sm">Sign out</span>
        </button>
      </div>
    </div>
  );
};

export default Menu;
