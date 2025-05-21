import  { useState } from 'react'
import { BACKEND_URL } from '../config'
import axios from 'axios'
import { fetchbytitle } from '../hooks'
type SearchBarProps={
  onSearch?:(query:string)=>void;
}
const SearchBar = ({onSearch}:SearchBarProps) => {
  const [title,setTitle]=useState("")
  


  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter"&& onSearch) {
    onSearch(title.trim()); // Use currentTarget for typed safety
  }
};
  return (
    <div className="w-full max-w-sm min-w-[200px]">
  <div className="relative flex items-center">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600">
      <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
    </svg>
 
    <input  value={title} onChange={(e)=>setTitle(e.target.value)} onKeyDown={handleKeyDown} 
    className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-2xl pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow placeholder:text-gray-700"
    placeholder="Search" 
    />
  
    
  </div>
 
</div>
  )
}

export default SearchBar