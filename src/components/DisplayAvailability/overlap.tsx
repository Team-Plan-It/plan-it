import React, { useEffect} from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";

// types
type Availability = {
    start: string;
    end:string;
    id: number;
    text: string;
  }
type UserInfo = {
  userName: string;
  timeZone: string;
  availability: Availability[];
} 

type DayEvent = {
  user: string;
  availability: Availability;
}

type EventObj = {
  user: string; 
  start: number;
  end: number;
}

const overlap = (props:any) => {


  // create an array for each day with 48 slots 
  // each slot should have a time value
  const createTimeArray = () => {
    let timeSlotArray:{time: string, array:EventObj[]}[] = [];
    let timeDisplay = "";
     
    for (let i = 0; i < 48; i++) {
      let counter = 0;
      if (i === 0) {
        timeDisplay = "00:00:00";
      } else {
        if (i % 2 !== 0) {
          counter++;
        }
        timeDisplay =
          i % 2 === 0 ? `${(i - counter) / 2}:00:00` : `${(i - counter) / 2}:30:00`;
      }
      timeSlotArray.push({ time: timeDisplay,  array: [] });
    }
    return timeSlotArray;
  }


  // calculate overlapping times when all users available
  useEffect(() => {
    // go through each user and sort into each day
    let day0array:DayEvent[]= [];
    let day1array:DayEvent[] = [];
    let day2array:DayEvent[] = [];
    let day3array:DayEvent[] = [];
    let day4array:DayEvent[] = [];
    let day5array:DayEvent[] = [];
    let day6array:DayEvent[] = [];
    let day7array:DayEvent[] = [];


    try{
      props.userInfoData!.forEach((user:any) => {
        console.log(user)
       // go through each user's availability
       user.availability.forEach((timeBlock:Availability) => {
        // push the user name and timeBlock to the array for that day of the week according to id
           switch(timeBlock.id){
             case 0:
               day0array.push({user: user.userName, availability: timeBlock});
               break
             case 1:
               day1array.push({user: user.userName, availability: timeBlock});  
               break         
             case 2:
               day2array.push({user: user.userName, availability: timeBlock});
               break
             case 3:
               day3array.push({user: user.userName, availability: timeBlock});
               break
             case 4:
               day4array.push({user: user.userName, availability: timeBlock});   
               break
             case 5:
               day5array.push({user: user.userName, availability: timeBlock});  
               break
             case 6:
               day6array.push({user: user.userName, availability: timeBlock});  
               break
             case 7:
               day7array.push({user: user.userName, availability: timeBlock});    
               break 
           }
          })
          console.log(day1array, day2array, day0array, day3array, day4array, day5array, day6array, day7array)
     })

     // **  MAKE A FUNCTION FOR THIS AND SEND EACH DAY ARRAY TO IT 
     // for each day, loop through array add user to the timeslot array for that day 
     // create array for day
     const day1results = createTimeArray();
     // loop through array for that day
     day1array.forEach(event => {
       // get start and end for each event as Date object
       let startObj = new DayPilot.Date(event.availability.start);
       let endObj = new DayPilot.Date(event.availability.end);
       let start = 
          startObj.getHours() * 2 + 
          (startObj.getMinutes() === 0 ?0 :1);
        let end =
          endObj.getHours() * 2 +
          (endObj.getMinutes() === 0 ? 0 : 1);
        // add user to day1results for the timeblock start and end
        for(let i=start; i < end; i++){
          day1results[i].array.push({user: event.user, start: start, end: end})
        }
        //  console.log(day1results)
       
     })


    }
    catch{
      console.log("error")
    }
  }, [props.userInfoData])
  return(
    <>
    </>
  )
}

export default overlap;