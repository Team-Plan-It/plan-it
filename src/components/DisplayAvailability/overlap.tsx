import React, { useState, useEffect} from "react";
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
  userName?: string;
  timeZone?: string;
  availability?: Availability[];
  id?: string;
} 



interface AvailabilityArray {
  sunday?: UserInfo[];
  monday?: UserInfo[];
  tuesday?: UserInfo[];
  wednesday?: UserInfo[];
  thursday?: UserInfo[];
  friday?: UserInfo[];
  saturday?: UserInfo[];
}

interface AllAvail{
  dayAvailabilityArray: AvailabilityArray
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

type TimeArray = {
  time: string;
  array:EventObj[];
}

const Overlap:React.FC<AllAvail> = ({ dayAvailabilityArray }) => {
  // state
  const [ availabilityByDay , setAvailabilityByDay ] = useState<AvailabilityArray>()
  const [ allAvailabilityTimeArrays , setAllAvailabilityTimeArrays ] = useState<TimeArray[]>();

  useEffect(() => {
    setAvailabilityByDay(dayAvailabilityArray);
  }, [])


  // create an array for each day with 48 slots 
  // each slot should have a time value
  // const createTimeArray = () => {
  //   let timeSlotArray:TimeArray[] = [];
  //   let timeDisplay = "";
     
  //   for (let i = 0; i < 48; i++) {
  //     let counter = 0;
  //     if (i === 0) {
  //       timeDisplay = "00:00:00";
  //     } else {
  //       if (i % 2 !== 0) {
  //         counter++;
  //       }
  //       timeDisplay =
  //         i % 2 === 0 ? `${(i - counter) / 2}:00:00` : `${(i - counter) / 2}:30:00`;
  //     }
  //     timeSlotArray.push({ time: timeDisplay,  array: [] });
  //   }
  //   return timeSlotArray;
  // }

  const createTimeArrayAmPm = () => {
    let timeArrayAmPm:{time: string, array:EventObj[]}[] = [];
    let amPmTime:string = "";

    for(let i = 0; 1 < 48; i++){
      let counter = 0;
      if ( i === 0){
        amPmTime = "12:00 am - 12:30 am"
      }else {
         if (i % 2 !== 0) {
          counter++;
        }
        if(i < 24){
          amPmTime =
          i % 2 === 0 ? `${(i - counter) / 2}:00 am` : `${(i - counter) / 2}:30 am`;
        }else{
          amPmTime =
          i % 2 === 0 ? `${(i - counter) / 2}:00 pm` : `${(i - counter) / 2}:30 pm`;
        }
      }
       timeArrayAmPm.push({ time: amPmTime,  array: [] });
      }
      return timeArrayAmPm;
    }
  
  // calculate overlapping times when all users available
 
    // create an array for each day with timeslots 
    let day0array:TimeArray[] = createTimeArrayAmPm();
    let day1array:TimeArray[] = createTimeArrayAmPm();
    let day2array:TimeArray[] = createTimeArrayAmPm();
    let day3array:TimeArray[] = createTimeArrayAmPm();
    let day4array:TimeArray[] = createTimeArrayAmPm();
    let day5array:TimeArray[] = createTimeArrayAmPm();
    let day6array:TimeArray[] = createTimeArrayAmPm();

    let weekArray:TimeArray[][] = [];





        // loop through day array
       // go through each user's availability
      //  day.forEach()
      //  day.availability.forEach((timeBlock:Availability) => {
      //   // push the user name and timeBlock to the array for that day of the week according to id
      //      switch(timeBlock.id){
      //        case 0:
      //          day0array.push({user: user.userName, availability: timeBlock});
      //          break
      //        case 1:
      //          day1array.push({user: user.userName, availability: timeBlock});  
      //          break         
      //        case 2:
      //          day2array.push({user: user.userName, availability: timeBlock});
      //          break
      //        case 3:
      //          day3array.push({user: user.userName, availability: timeBlock});
      //          break
      //        case 4:
      //          day4array.push({user: user.userName, availability: timeBlock});   
      //          break
      //        case 5:
      //          day5array.push({user: user.userName, availability: timeBlock});  
      //          break
      //        case 6:
      //          day6array.push({user: user.userName, availability: timeBlock});  
      //          break
      //        case 7:
      //          day7array.push({user: user.userName, availability: timeBlock});    
      //          break 
          //  }
      //     })
      //     console.log(day1array, day2array, day0array, day3array, day4array, day5array, day6array, day7array)
     

   
 


  // functtion that takes a day of the week array with availabilities and returns an array with the user's avilability at the alooted time
      const addUserToDayArray = (dayArray:TimeArray[], event:UserInfo) => {
       
        // get start and end for each event as Date object
        let startObj = new DayPilot.Date(event.availability![0].start);
        let endObj = new DayPilot.Date(event.availability![0].end);
        let start = 
           startObj.getHours() * 2 + 
           (startObj.getMinutes() === 0 ?0 :1);
         let end =
           endObj.getHours() * 2 +
           (endObj.getMinutes() === 0 ? 0 : 1);
         // add user to day1results for the timeblock start and end
         for(let i=start; i < end; i++){
           dayArray[i].array.push({user: event.userName!, start: start, end: end})
         }
         return dayArray;
      }


   useEffect(() => {

     // for each day array, populate with the timeblocks for that day array
       if (availabilityByDay!.sunday!.length > 0){
         dayAvailabilityArray.sunday!.forEach(timeblock => {
           let sundayResults = addUserToDayArray(day0array, timeblock)
           console.log(sundayResults)
         })
       }
       if (availabilityByDay!.monday!.length > 0){
         dayAvailabilityArray.monday!.forEach(timeblock => {
           let mondayResults = addUserToDayArray(day1array, timeblock)
           console.log(mondayResults)
         })
       }
       if (availabilityByDay!.tuesday!.length > 0){
         dayAvailabilityArray.tuesday!.forEach(timeblock => {
           let tuesdayResults = addUserToDayArray(day2array, timeblock)
           console.log(tuesdayResults)
         })
       }
      if (availabilityByDay!.wednesday!.length > 0){
         dayAvailabilityArray.wednesday!.forEach(timeblock => {
           let wednesdayResults = addUserToDayArray(day3array, timeblock)
           console.log(wednesdayResults)
         })
       }
      if (availabilityByDay!.thursday!.length > 0){
         dayAvailabilityArray.thursday!.forEach(timeblock => {
           let thursdayResults = addUserToDayArray(day4array, timeblock)
           console.log(thursdayResults)
         })
       }
       if (availabilityByDay!.friday!.length > 0){
         dayAvailabilityArray.friday!.forEach(timeblock => {
           let fridayResults = addUserToDayArray(day5array, timeblock)
           console.log(fridayResults)
         })
       }
      if (availabilityByDay!.saturday!.length > 0){
         dayAvailabilityArray.saturday!.forEach(timeblock => {
           let saturdayResults = addUserToDayArray(day6array, timeblock)
           console.log(saturdayResults)
         })
       }
       // eslint-disable-next-line
   }, [availabilityByDay])



    
  return(
    <>
      <p>overlap calculations</p>
    </>
  )
}

export default Overlap;