import React, { useState} from "react";




const UserToggles = (props: {names: string[]}) => {

   // if checkbox toggled
  const [ user1checked, setUser1Checked ] = useState<boolean>(true);
  const [ user2checked, setUser2Checked ] = useState<boolean>(true);
  const [ user3checked, setUser3Checked ] = useState<boolean>(true);
  const [ user4checked, setUser4Checked ] = useState<boolean>(true);
  const [ user5checked, setUser5Checked ] = useState<boolean>(true);
  const [ user6checked, setUser6Checked ] = useState<boolean>(true);


  return(
    <>
    <ul className="userToggles">
       <li key="1">
         {
           props.names.length > 0

          ?<label htmlFor={props.names[0]}>
            <input 
            type="checkbox" 
            id={props.names[0]} 
            className={props.names[0]} 
            checked={user1checked}
            onChange={e => setUser1Checked(e.target.checked)}
            />
            {props.names[0]}
          </label>
          :null
         }
      </li>
      <li key="2">
         {
           props.names.length === 2 || props.names.length === 3 || props.names.length === 4 || props.names.length === 5 || props.names.length === 6

          ?<label htmlFor={props.names[1]}>
            <input 
            type="checkbox" 
            id={props.names[1]} 
            className={props.names[1]} 
            checked={user2checked}
            onChange={e => setUser2Checked(e.target.checked)}
            />
            {props.names[1]}
          </label>
          :null
         }
      </li>
       <li key="3">
         {
           props.names.length === 3 || props.names.length === 4 || props.names.length === 5 || props.names.length === 6 

          ?<label htmlFor={props.names[2]}>
            <input 
            type="checkbox" 
            id={props.names[2]} 
            className={props.names[2]} 
            checked={user3checked}
            onChange={e => setUser3Checked(e.target.checked)}
            />
            {props.names[2]}
          </label>
          :null
         }
      </li>
      <li key="4">
         {
           props.names.length === 4 || props.names.length === 5 || props.names.length === 6 

          ?<label htmlFor={props.names[3]}>
            <input 
            type="checkbox" 
            id={props.names[3]} 
            className={props.names[3]} 
            checked={user4checked}
            onChange={e => setUser4Checked(e.target.checked)}
            />
            {props.names[3]}
          </label>
          :null
         }
      </li>
      <li key="5">
         {
           props.names.length === 5 || props.names.length === 6 

          ?<label htmlFor={props.names[4]}>
            <input 
            type="checkbox" 
            id={props.names[4]} 
            className={props.names[4]} 
            checked={user5checked}
            onChange={e => setUser5Checked(e.target.checked)}
            />
            {props.names[4]}
          </label>
          :null
         }
      </li>  
       <li key="6">
         {
           props.names.length === 6

          ?<label htmlFor={props.names[5]}>
            <input 
            type="checkbox" 
            id={props.names[5]} 
            className={props.names[5]} 
            checked={user6checked}
            onChange={e => setUser6Checked(e.target.checked)}
            />
            {props.names[5]}
          </label>
          :null
         }
      </li>   
    </ul>
    
    </>
  )
}


export default UserToggles;