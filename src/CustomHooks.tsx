import { useState, useEffect } from "react";

export const useViewport = () => {
  // window resizing
   const [ width, setWidth ] = useState<number>(window.innerWidth);
   const [ height, setHeight ] = useState<number>(window.innerHeight);
 
   // add event listener for window resize
   useEffect(() => {
     const handleWindowResize = () => {
       setWidth(window.innerWidth);
       setHeight(window.innerHeight);
     }

     window.addEventListener("resize", handleWindowResize);
 
     return () => window.removeEventListener("resize", handleWindowResize);
 
     
   }, [])

   return { width, height };
}