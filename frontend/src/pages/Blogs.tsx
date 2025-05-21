// import React from "react";
import BlogCard from "../components/BlogCard";
import Appbar from "../components/Appbar";
import useBlogs from "../hooks";
import Skeleton from '@mui/material/Skeleton';
import { useState } from "react";




type Blog = {
  author: { name: string };
  title: string;
  content: string;
  id: string;
  publishedDate: string;
  createdAt:Date;
  // Add other fields as needed
};

const Blogs = () => {
  const { loading, blogs = [] } = useBlogs() as { loading: boolean; blogs: Blog[] };
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  // Ensure blogs is an array before filtering
  const filteredBlogs = Array.isArray(blogs) 
    ? blogs.filter(blog => blog.title.toLowerCase().includes(search.toLowerCase()))
    : [];
  
  const [itemsPerPage] = useState(3);
 
  const indexofLastItem=currentPage*itemsPerPage;
  const indexofFirstItem=indexofLastItem-itemsPerPage;
  const currentItems=filteredBlogs.slice(indexofFirstItem,indexofLastItem);
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginate=(pageNumber:number)=>{
    setCurrentPage(pageNumber); 
  }
 
  if(loading){
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full max-w-3xl p-4">
            <Skeleton variant="rectangular" height={120} className="rounded-lg" />
            <div className="pt-4">
              <Skeleton variant="text" width="60%" height={32} />
              <Skeleton variant="text" width="40%" height={24} />
              <Skeleton variant="text" width="80%" height={24} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if(!Array.isArray(blogs)){
    return  (
      <div className="flex flex-col items-center justify-center h-screen">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full max-w-3xl p-4">
            <Skeleton variant="rectangular" height={120} className="rounded-lg" />
            <div className="pt-4">
              <Skeleton variant="text" width="60%" height={32} />
              <Skeleton variant="text" width="40%" height={24} />
              <Skeleton variant="text" width="80%" height={24} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  

  return (
    <div className=" pt-20  ">
      <Appbar isBlogs={true} onSearch={setSearch} />
      {loading ? (
      <div className="flex flex-col items-center justify-center h-screen">
        {/* Show 3 skeleton blog cards as placeholders */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full max-w-3xl p-4">
            <Skeleton variant="rectangular" height={120} className="rounded-lg" />
            <div className="pt-4">
              <Skeleton variant="text" width="60%" height={32} />
              <Skeleton variant="text" width="40%" height={24} />
              <Skeleton variant="text" width="80%" height={24} />
            </div>
          </div>
        ))}
      </div>
      ) : (
      <div className=" ">
        <div className="flex flex-col items-center   justify-center">
          {currentItems.map((blog) => (
            <div key={blog.id} className="flex flex-col justify-center w-full p-4">
              <BlogCard
                id={blog.id}
                authorName={blog.author.name}
                title={blog.title}
                content={blog.content}
              
                createdAt={blog.createdAt}
              />
            </div>
          ))}
        </div>

      </div>)}
      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 pb-20 mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 cursor-pointer rounded bg-gray-200 disabled:opacity-50"
        >
          Prev
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-3 cursor-pointer py-1 rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 cursor-pointer rounded bg-gray-200 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
};




export default Blogs;
