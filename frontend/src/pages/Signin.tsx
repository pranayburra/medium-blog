import React from "react";
import Quote from "../components/Quote";
import Auth from "../components/Auth";

const Signin = () => {
 
  // Check if the user is already logged in
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 ">
      <Auth type="signin" />

      <Quote />
    </div>
  );
};

export default Signin;
