import React, { useState, useEffect } from "react";
// import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";


//components
import availabilities from "../../testEvents";

//styles



// types





const DisplayAvailability = () => {
  let calendar = DayPilot.Calendar;
  
  
  //initialize state
  const [eventArray, setEventArray] = useState(availabilities);


  
  useEffect(() => {
    const colorArray:string[] = ["#ff5733", "#ffb533", "#fcff33", "#33ff46", "#33f6ff", "#3361ff", "#d733ff"];

    let eventList = [...eventArray];
    console.log(eventList);
     try{
       // map through each object in the events array
       eventList.forEach((obj, index) => {
         // assign a color for each user object
         let color:string = colorArray[index];
         if (obj === undefined){
           console.log("obj is undefined", index)
         }else {
           console.log(obj, index)
            obj.dates.forEach((date:string[]) => {
              // in each object, map through the array of dates to create new Date Pilot events
              if(date === undefined){
                console.log("date is undefined", date)

              }else {
                console.log(date)
                let newEvent:any[] = new DayPilot.Event({
                  start: date[0],
                  end: date[1],
                  id: DayPilot.guid(),
                  text: obj.user,
                  backColor: color,
                  fontColor: "#000000",
                 });
                //  add the new event to the events list
                 calendar.events.add(newEvent);
                 console.log(newEvent)
                 if(calendar === undefined){
                   console.log("calendar is undefined");
                 }else {
                   console.log(calendar)
                 }
              }
            })
         }
        })
     }catch{
       console.log("error")
     }

 
  }, [eventArray, calendar])

  return(
    <div className="display">
      <div className="displayIntro">
        {/* get meeting name from database */}
        <h1>Meeting Name</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam tempora similique corporis nesciunt quo numquam!</p>
      </div>
      <div className="displayResults">
        <div className="displayNames">

        </div>
        <div className="displayCalendar">
          <DayPilotCalendar 
            durationBarVisible={false}
            startDate={"2022-05-09T09:00:00"}
            viewType={"Week"}
            headerDateFormat={"d MMMM yyyy"}
            eventArrangement={"Full"}
            ref={(component:any | void) => {
              calendar = component && component.control;
            }}
          />
        </div>
      </div>

    </div>

  );
};

export default DisplayAvailability;