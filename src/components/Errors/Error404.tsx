import React, { useNavigate } from "react-router-dom";
 


import Error404Image from "../../assets/Error404";

import "./Error404.css";

const Error404 = () => {
  let navigate = useNavigate();

  return(
    <div className="errorPage">
      <Error404Image />
      <h1>Whoops! Lost in Space?</h1>
      <p>The page you are looking for cannot be found :(</p>
      <p>We suggest you contact the coordinator or go back to home</p>
      <button className="error404Btn" onClick={() => navigate("/")}>Go back home</button>
    </div>
  )
}


export default Error404;