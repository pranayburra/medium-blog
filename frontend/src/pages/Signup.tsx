
import React from 'react'
import Quote from '../components/Quote';
import Auth from '../components/Auth';

const Signup = () => {
  
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 '>
    
     <Auth type='signup'/>
      <Quote/>
      
    </div>
  )
}

export default Signup