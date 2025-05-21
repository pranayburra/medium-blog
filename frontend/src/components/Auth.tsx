import React, {  type ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Quote from './Quote';
import { useState } from 'react';
import { type SignupInput } from '@pranayburra007/medium-common';
import axios from 'axios';
import { BACKEND_URL } from "../config"

const Auth = ({type}:{type:"signup"|"signin"}) => {
   const   [postInputs ,setPostInputs]=useState<SignupInput>({
    name:'',
    email:'',
    password:''
   })
   const navigate=useNavigate();
   const sign=type==="signin"?"signup":"signin";
  async function sendRequest(e:React.FormEvent){
   e.preventDefault();
        try{
        const response= await axios.post(`${BACKEND_URL}/api/v1/users/${type==="signup"?"signup":"signin"}`,postInputs);
        const data=await response.data;
        console.log(data);  
        // console.log(data.token);
        localStorage.setItem("token",data.jwt);
        navigate('/blogs');
        console.log("Login successful"); 
        }
    catch(err){ 
        console.log(err)
        alert("msg:alreadyexists")
    }
}
   
    
  return (
     <div className=' flex flex-col   justify-center items-center h-screen'>
       {JSON.stringify(postInputs)}
          <div className='font-bold text-3xl'>{type==="signin"?"Login":"Create an account"}</div>
      <div>{type==="signin"? "don't have account?":"Already have an account?"} <Link className='underline'  to={type==="signin"?"/signup":"/signin"} >{sign}</Link></div>
        
        <form className='flex flex-col  items-start justify-center  p-2 m-2'>
        
          {type==="signup"?<LabelledInput placeholder='Username' text='Username' onChange={(e)=>{
            setPostInputs((prev:SignupInput)=>{
              return {...prev,name:e.target.value}
            })
          }}

           />:null}
           <LabelledInput placeholder='Email' text='Email' onChange={(e)=>{
            setPostInputs((prev:SignupInput)=>{
              return {...prev,email:e.target.value}
            })
          }}
           />
            <LabelledInput placeholder='Password' type="password" text='Password' onChange={(e)=>{
            setPostInputs((prev:SignupInput)=>{
              return {...prev,password:e.target.value}
            })
          }}
           />
      
          <button type="submit" onClick={sendRequest} className='bg-black rounded-lg w-full cursor-pointer   text-white mx-auto  p-2 m-2'>{sign}</button>
        </form>
      </div>
  )
}
interface LabelledInputType{
    placeholder:string;
    text:string;
    onChange:(e:ChangeEvent<HTMLInputElement> )=>void;
    type?:string
}
const LabelledInput=({placeholder,text,onChange,type}:LabelledInputType)=>{
    return(
       <div className='flex flex-col items-start justify-center'>
        <label  className='font-bold text-md px-2'>{text}</label>
        <input  type={type||"text"} onChange={onChange}  placeholder={placeholder} className='border md:w-sm border-gray-300 rounded p-2 m-2'/>
       </div>
        
       
    )
}

export default Auth