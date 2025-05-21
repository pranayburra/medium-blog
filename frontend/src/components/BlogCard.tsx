import React, { useState } from "react";
import AvatarCard from "./Avatar";
import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  title: string;
  id: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

const BlogCard = ({
  authorName,
  title,
  id,
  createdAt,
  content,
}: BlogCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const readingtime = Math.ceil(content.length / 100);
  const readingTimeText = `${readingtime} min read`;
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking like
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking save
    setIsSaved(!isSaved);
  };

  return (
    <Link 
      to={`/blog/${id}`} 
      className="block w-full transition-all duration-200 hover:bg-gray-50 group"
    >
      <article className="max-w-3xl mx-auto px-4 py-6 border-b border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <AvatarCard name={authorName} />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
              {authorName}
            </span>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <time className="hover:text-gray-700 transition-colors">{formattedDate}</time>
              <span className="text-gray-300">•</span>
              <span className="hover:text-gray-700 transition-colors">{readingTimeText}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {title}
          </h2>
          <p className="text-gray-600 line-clamp-3 text-base leading-relaxed group-hover:text-gray-700 transition-colors">
            {content}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                isLiked 
                  ? 'text-yellow-500 hover:bg-yellow-50' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill={isLiked ? "currentColor" : "none"} 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`transition-transform duration-200 ${isLiked ? 'scale-110' : ''}`}
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
              <span>{likesCount > 0 ? likesCount : ''} Like</span>
            </button>
            
            
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
              {readingtime} min read
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
