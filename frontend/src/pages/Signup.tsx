
import React from 'react'
import Quote from '../components/Quote';
import Auth from '../components/Auth';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
   const navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem("token") && navigate("/blogs");
  }, []);
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 '>
    
     <Auth type='signup'/>
      <Quote/>
      
    </div>
  )
}

export default Signup