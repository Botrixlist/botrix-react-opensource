import React from "react";
import { motion } from "framer-motion";

function ErrorPage(props) {
  return (
    <>
        <div>
          <div className="error">
            <h1 className="code">{props.type ? props.type : 404} </h1>
            <p>
              {getText(props.type)} 
            </p>
          </div>
        </div>
    </>
  );
}


function getText(code){

  switch(code){
    case 404:
      return "Woah there, i think you might be a little lost.."
    case 403:
      return "You're not supposed to be here! This is kinda awkward, go back home.";
    case 500:
      return "Internal server error has occured..";
    default:
      return "Woah there, i think you might be a little lost.."
  }

}

export default ErrorPage;
