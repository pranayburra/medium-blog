import React, { useState } from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
const Appbar = () => {
  const [publish, SetPublish] = useState(false);
  const handlePublish = () => {
    SetPublish(!publish);
  };
  return (
    <div className="flex items-center justify-between px-8 border-b border-gray-300 p-4">
      <Link to="/blogs">
        <div>medium</div>
      </Link>
      <div className="flex items-center gap-4 ">
        
        <Link to="/publish">  
          <button
            type="button"
            className="text-white cursor-pointer bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 mr-6 cursor  focus:ring-green-300 font-medium rounded-full text-sm px-8 py-2.5 text-center me-2 mb-2"
          >
            Green
          </button>
        </Link>
           <Avatar name={"Medium"} />
      
      

      
      </div>
    </div>
  );
};

export default Appbar;
