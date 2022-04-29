import React, { useState } from "react";

import "./Sidebar.css";

// types
interface NameProps {
  userNames?: string[];
}


const Sidebar:React.FC<NameProps> = ({ userNames }) => {
  // init state


  const colorArray:string[] = ["#ff3db1", "#ff6b00", "#ffe500", "#49c491", "#4198f7", "#b03ce7"];

  
  return(
        <div className="sidebar">
          <p className='logo'>Logo</p>

            <div className="displayNames">
           {/*  loop through user names array received and
                display each name with an icon to the left of it matching the color and first initial of the name*/}
            <ul>

                {
                  userNames

                  ? userNames.map((name:string, index:number) => {
                    let userColor = colorArray[index];

                    return(
                      <li key={index} className={`user${index}`}>
                        <p>{name}</p>
                      </li>
                    )
                  })

                  :null

                }


            </ul>
          </div>


        </div>
  )
}


export default Sidebar;