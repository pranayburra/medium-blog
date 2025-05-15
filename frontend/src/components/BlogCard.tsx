import React from "react";
import AvatarCard from "./Avatar";
import { Link } from "react-router-dom";
interface BlogCardProps {
  authorName: string;
  title: string;
  id: string;
  content: string;
  publishedDate: string;
}

const BlogCard = ({
  authorName,
  title,
  id,
  content,
  publishedDate,
}: BlogCardProps) => {
  const readingtime = Math.ceil(content.length / 100);
  const readingTimeText = `${readingtime} minute${readingtime > 1 ? "s" : ""}`;
  return (
    <Link  to={`/blog/${id}`} className="flex flex-col justify-center">
     <div className=" font-poppins border-b border-slate-300 p-4 w-screen max-w-3xl ">
      <div className="flex items-center ">
        <AvatarCard name={authorName} />
        <div className="font-extralight text-sm text-gray-500 pl-2">
          {authorName}
        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-500 font-thin pl-2">
          <span className="text-xl leading-none">•</span>
          <span>{publishedDate}</span>
        </div>
      </div>

      <div className="font-bold text-lg pt-1">{title}</div>
      <div className="pt-2 text-gray-600 font-medium">{content.slice(0, 100) + "..."}</div>
      <div className="text-gray-500">{readingTimeText}</div>
    </div></Link>
   
  );
};


export default BlogCard;
