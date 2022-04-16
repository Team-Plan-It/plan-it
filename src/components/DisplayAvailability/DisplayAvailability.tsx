import React, { useState, useEffect } from "react";
// import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DayPilot, DayPilotCalendar, DayPilotCalendarComponent } from "@daypilot/daypilot-lite-react";


//components
import availabilities from "../../testEvents";

//styles



// types





const DisplayAvailability = () => {
  let calendar:any|void = DayPilot.Calendar;
  
  const colorArray:string[] = ["#ff5733", "#ffb533", "#fcff33", "#33ff46", "#33f6ff", "#3361ff", "#d733ff"];
  
  //initialize state
  const [eventArray, setEventArray] = useState(availabilities);
  
  useEffect(() => {
     if(eventArray){
       // map through each object in the events array
       eventArray.forEach((obj, index) => {
         // assign a color for each user object
         let color:string = colorArray[index];
         
         obj.dates.forEach((date:string[]) => {
           // in each object, map through the array of dates to create new Date Pilot events
           let newEvent:any[] = new DayPilot.Event({
             start: date[0],
             end: date[1],
             id: DayPilot.guid(),
             text: obj.user,
             backColor: color,
             fontColor: "#000000",
            });
            // add the new event to the events list
            calendar.events.add(newEvent);
            console.log(newEvent)
         })
        })
     }

 
  }, [])

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
            // startDate={"2022-04-11"}
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