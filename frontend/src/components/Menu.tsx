import React from "react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signup");  // Navigating correctly
  };

  return (
    <div className="flex flex-col text-gray-500 gap-3 p-2 max-w-[267px] w-full">
      <div></div>
      <div className="flex gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Profile"
        >
          <circle cx="12" cy="7" r="4.5" stroke="currentColor"></circle>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            d="M3.5 21.5v-4.342C3.5 15.414 7.306 14 12 14s8.5 1.414 8.5 3.158V21.5"
          ></path>
        </svg>
        <div>Profile</div>
      </div>
      <div className="flex gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          aria-label="Lists"
        >
          <path
            stroke="currentColor"
            d="M6.44 6.69a1.5 1.5 0 0 1 1.06-.44h9a1.5 1.5 0 0 1 1.06.44l.354-.354-.353.353A1.5 1.5 0 0 1 18 7.75v14l-5.694-4.396-.306-.236-.306.236L6 21.75v-14c0-.398.158-.78.44-1.06Z"
          ></path>
          <path
            stroke="currentColor"
            strokeLinecap="round"
            d="M12.5 2.75h-8a2 2 0 0 0-2 2v11.5"
          ></path>
        </svg>
        <div>Library</div>
      </div>
      <div className="flex gap-2">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            aria-label="Stories"
          >
            <path
              stroke="currentColor"
              d="M4.75 21.5h14.5a.25.25 0 0 0 .25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .138.112.25.25.25Z"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              d="M8 8.5h8M8 15.5h5M8 12h8"
            ></path>
          </svg>
        </div>
        <div>Stories</div>
      </div>
      <div className="flex gap-2">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            aria-label="Stats"
          >
            <path
              stroke="currentColor"
              d="M2.75 19h4.5a.25.25 0 0 0 .25-.25v-6.5a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25v6.5c0 .138.112.25.25.25ZM9.75 19h4.5a.25.25 0 0 0 .25-.25V8.25a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25ZM16.75 19h4.5a.25.25 0 0 0 .25-.25V4.25a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25v14.5c0 .138.112.25.25.25Z"
            ></path>
          </svg>
        </div>
        <div>stats</div>
      </div>
      <hr className="-mx-4 border-gray-400" />
      <div className="flex gap-2">
        <div>settings</div>
      </div>
      <div>Refine recommendations</div>
      <div>Manage Populations</div>
      <div>help</div>
      <hr className="-mx-4 border-gray-400" />
      <div>Email</div>
      <div onClick={handleLogout}>Signout</div>
    </div>
  );
};

export default Menu;
