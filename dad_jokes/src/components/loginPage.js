import React from "react";
import Login from './login';
import Jokes from './jokes'; 

export const LoginPage = (props) => {
  return (
    <div>
    
      <Jokes {...props} signout={props.signout}/>
    </div>
  );
};
