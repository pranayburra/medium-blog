import React from 'react'
import Quote from '../components/quote';
import Auth from '../components/Auth';
const Signin = () => {
  return (
      <div className='grid grid-cols-1 md:grid-cols-2 '>
    
     <Auth type='signin'/>

    <Quote/>
      
    </div>
  )
}

export default Signin