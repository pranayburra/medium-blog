import React, { useRef, useState } from "react";
import Appbar from "../components/Appbar";
import { useNavigate } from "react-router-dom";
import createblog from "../components/CreateBlog";

const Publish = () => {
  const navigate = useNavigate();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Handle height resizing to fit content
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    if (textareaRef.current) {
      // Reset height to auto to allow it to grow or shrink based on content
      textareaRef.current.style.height = "auto";
      // Set height to the scrollHeight to make the textarea grow with content
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div>
      <Appbar isBlogs={false} title={title} description={description} navigate={navigate} />
      <div className="flex justify-center items-center p-5 pt-20 font-poppins">
        <div className="max-w-2xl w-full">
          <div>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="w-full bg-transparent bold h-20 placeholder:text-4xl placeholder:text-slate-400 text-slate-700 text-4xl border-0 border-l-4 border-l-transparent focus:border-l-blue-500 rounded-none px-3 py-2 transition duration-300 ease focus:outline-none"
              placeholder="Title"
              type="text"
            />
          </div>
          <div className="w-full min-w-[200px] mt-4">
            <textarea
              ref={textareaRef}
              onChange={handleInput}  // Call the handleInput function to resize the height
              value={description}
              className="w-full bg-transparent text-lg placeholder:text-slate-400 text-slate-700 text-base border-0 border-l-4 border-l-transparent focus:border-l-blue-500 rounded-none px-3 py-2 transition duration-300 ease focus:outline-none resize-none"
              placeholder="Tell your story..."
              rows={1}
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => createblog({ title, description, navigate })}
              type="button"
              className="text-white cursor-pointer bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 cursor  focus:ring-green-300 font-medium rounded-full text-sm px-8 py-2.5 text-center me-2 mb-2"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;
