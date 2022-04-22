import React, { useState, useEffect } from "react";
// import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";


//components
import meetingData from "../../testEventsMeetingInfo";

//styles
import "./DisplayAvailability.css";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import UserToggles from "../UserToggles/UserToggles";


// types
// interface Availability {
//     Start: string,
//     End: string,
// }

// interface UserInfo {
//   UserName: string,
//   UserAvailabiliy: Availability
// }
type UserInfo = {
  userName: string;
  timeZone: string;
  availability: {
    start: string;
    end:string;
    id: string;
    text: string;
  }[]
} 

// function toggle(value){
//   return !value;
// }


const DisplayAvailResults = () => {
  let calendar = DayPilot.Calendar;
  
  
  //initialize state
  // event name
  const [ eventName, setEventName ] = useState<string>();
  // length of meeting
  const [ meetingLength, setMeetingLength ] = useState<string>();
  // date selected by coordinator
  const [ selectedDate, setSelectedDate ] = useState<string>();
  // time zone of coordinator
  const [ coordTimeZone, setCoordTimeZone ] = useState<string>();
  // meeting number/id
  const [ meetingNumber, setMeetingNumber ] = useState<string>();
  // user names
  const [ userNames, setUserNames ] = useState<string[]>();
  // user info array
  const [ userInfoData, setUserInfoData ] = useState<UserInfo[]>()
  // if an event has been created
  const [ eventCreated, setEventCreated ] = useState<boolean>(false);
 



  // ** add axios call to get meeting data **
  // deconstruct data from meetingData
  useEffect(() => {
    const { eventName, length, date, timeZone, meetingNumber, users} = meetingData;

    const userNamesArray = users.map(user => {
      return user.userName;
    });
    

    // save data in state
    setEventName(eventName);
    setMeetingLength(length);
    setSelectedDate(date);
    setCoordTimeZone(timeZone);
    setMeetingNumber(meetingNumber);
    setUserNames(userNamesArray);
    setUserInfoData(users);

  }, []);

  //  create events from meeting data
  useEffect(() => {
    const colorArray:string[] = ["#ff5733", "#ffb533", "#fcff33", "#33ff46", "#33f6ff", "#3361ff", "#d733ff"];

    let userInfoArray = userInfoData ?[...userInfoData] :null;
    
    try{
  
        let eventArray = [];
        if(userInfoData){

        // map through each user object in the meeting data
        userInfoData.forEach((user, index) => {
           if(!eventCreated){

           // assign a color for each user 
           let color:string = colorArray[index];

          console.log(index, userInfoData.length)
            
           if (user === undefined){
             console.log("obj is undefined", index)
           }else {
             // loop through the availability for the user
              user.availability.forEach((availBlock) => {
                // in each object, map through the array of dates to create new Date Pilot events
                if(availBlock === undefined){
                  console.log("availBlock is undefined", availBlock)
  
                }else {
                  // create a new DayPilot event for each time block
                  let newEvent:any[] = new DayPilot.Event({
                    start: availBlock.start,
                    end: availBlock.end,
                    id: DayPilot.guid(),
                    text: user.userName,
                    toolTip: user.userName,
                    backColor: color,
                    fontColor: "#000000",
                    // cssClass: user.userName,
                    cssClass: "target",
                   });
                  //  add the new event to the events list
                   calendar.events.add(newEvent);

                   eventArray.push(newEvent);
                   
                   if(calendar === undefined){
                     console.log("calendar is undefined");
                   }else {
                     console.log(calendar)
                   }
                }
              })
           } 
           console.log(index, userInfoData.length - 1)
          if (index === userInfoData.length -1){
              setEventCreated(true)
              console.log("eventCreated should be true")
            }
          };
          });
        };
     }catch{
       console.log("error");
     }
  }, [userInfoData])


  // calculate overlapping times when all users available
  useEffect(() => {
    // create an array for each day with 48 slots 
    // each slot should have a time value
    let timeSlotArray = [];
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
 

    // get the userInfo 
    // 


    
  }, [selectedDate])




  return(
     <div className="display wrapper">
      <div className="displayIntro">
        {/* get meeting name from database */}
        <h1>{eventName}</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam tempora similique corporis nesciunt quo numquam!</p>
      </div>
      <div className="displayResults">
        <div className="displayNames">
          <p>Names </p>
          <ul>
            <>
            {
              userNames
              ?<UserToggles names={userNames}/>
              :null
            }
            </>
          </ul>
        </div>
        <div className="displayCalendar">
          <DayPilotCalendar 
            durationBarVisible={false}
            startDate={"2022-05-09T09:00:00"}
            viewType={"WorkWeek"}
            headerDateFormat={"d MMMM yyyy"}
            eventArrangement={"SideBySide"}
            CssOnly={"true"}
            cssOnly={"true"}
            showToolTip={"true"}
            // cssClassPrefix = {"calendar_black"}
            ref={(component:any | void) => {
              calendar = component && component.control;
            }}
          />
        </div>
      </div>

    </div>

  )

}

export default DisplayAvailResults;