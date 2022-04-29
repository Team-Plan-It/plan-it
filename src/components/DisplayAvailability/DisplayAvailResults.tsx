import React, { useState, useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";
import { useLocation } from "react-router-dom";


//components
import meetingData from "../../testEventsMeetingInfo";
import Sidebar from "../Sidebar/Sidebar";

//styles
import "./DisplayAvailability.css";



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



const DisplayAvailResults = () => {
  let calendar = DayPilot.Calendar;
  const availabilityNavigation: any = useLocation();
  const meetingNumID = availabilityNavigation.state['meetingNumID'];
  
  //initialize state
  // event name
  const [ eventName, setEventName ] = useState<string>();
  // length of meeting
  const [ meetingLength, setMeetingLength ] = useState<string>();
  // date selected by coordinator
  const [ selectedDate, setSelectedDate ] = useState<string>();
  // time zone of coordinator
  const [ coordTimeZone, setCoordTimeZone ] = useState<string>();
  // number of invitees
  const [ numOfAttendees, setNumOfAttendees ] = useState<number[]>();
  // meeting number/id
  const [ meetingNumber, setMeetingNumber ] = useState<string>();
  // user names
  const [ userNames, setUserNames ] = useState<string[]>();
  // user info array
  const [ userInfoData, setUserInfoData ] = useState<UserInfo[]>()
  // if an event has been created
  const [ eventCreated, setEventCreated ] = useState<boolean>(false);
  // array of all events created
  const [ arrayOfEvents, setArrayOfEvents ] = useState<any[]>();




  // arrays of each users events
  const [ user1eventArray, setUser1eventArray ] = useState<UserInfo>();
  const [ user2eventArray, setUser2eventArray ] = useState<UserInfo>();
  const [ user3eventArray, setUser3eventArray ] = useState<UserInfo>();
  const [ user4eventArray, setUser4eventArray ] = useState<UserInfo>();
  const [ user5eventArray, setUser5eventArray ] = useState<UserInfo>();
  const [ user6eventArray, setUser6eventArray ] = useState<UserInfo>();



  // ** add axios call to get meeting data **
  axios.get(`http://localhost:4000/dates/results/${meetingNumID}`)
        .then(data => {
          console.log(data)
        //  Passing the meeting number through the URL to the Availability page
        })


  // deconstruct data from meetingData
  useEffect(() => {
    const { eventName, length, date, timeZone, emails, meetingNumber, users} = meetingData;

    // populate userNameArray 
    const userNamesArray = users.map(user => {
      return user.userName;
    });

    // determine number of meeting attendees
    // includes coordinator
    let arrayOfNumOfUsers = [1];
    if(emails.length > 0){
      for (let i= 0; i < emails.length; i++){
        arrayOfNumOfUsers.push(i + 2)
      }
      setNumOfAttendees(arrayOfNumOfUsers);
    }
      
    

    
    // save data in state
    setEventName(eventName);
    setMeetingLength(length);
    setSelectedDate(date);
    setCoordTimeZone(timeZone);
    setMeetingNumber(meetingNumber);
    setUserNames(userNamesArray);
    setUserInfoData(users);
    
    // get month as string from event date
    if(date){
    
     const month = new Date(date).toLocaleString('default', {month: "long"});
     console.log(month)
   }
  }, []);

  // separate users and create events based on the availability data
  useEffect(() => {
     const colorArray:string[] = ["#ff3db1", "#ff6b00", "#ffe500", "#49c491", "#4198f7", "#b03ce7"];

      let eventArray:any[] = [];

      if(!eventCreated && userInfoData){

        userInfoData!.forEach((user, index) => {
         
             // assign a color for each user 
             let color:string = colorArray[index];
  
             switch(index){
               case 0:
                  let user1array = user;
                  let user1color = color;

                  setUser1eventArray(user)
  
                   // loop through the availability for the user
                  user1array.availability.forEach(availBlock => {
                    //  create a new event for each availability block
                    let newEvent:any[] = new DayPilot.Event({
                      start: availBlock.start,
                      end: availBlock.end,
                      id: "user1",
                      text: user1array.userName.charAt(0),
                      toolTip: user1array.userName,
                      backColor: user1color,
                      fontColor: "#ffffff",
                      className:"target",
                      ref:"user1"
                     });
                    //  add the new event to the events list
                     calendar.events.add(newEvent);
  
                     eventArray.push(newEvent);
                  })
                  break;
                case 1:
                  let user2array = user;
                  let user2color = color;

                  setUser2eventArray(user);

                  // loop through the availability for the user
                  user2array.availability.forEach(availBlock => {
                    //  create a new event for each availability block
                    let newEvent:any[] = new DayPilot.Event({
                      start: availBlock.start,
                      end: availBlock.end,
                      id: "user2",
                      text: user2array.userName.charAt(0),
                      toolTip: user2array.userName,
                      backColor: user2color,
                      fontColor: "#ffffff",
                      className:"target",
                      ref:"user2"
                     });
                    //  add the new event to the events list
                     calendar.events.add(newEvent);
  
                     eventArray.push(newEvent);
                  })
                  break;
                case 2:
                  let user3array = user;
                  let user3color = color;

                  setUser3eventArray(user);
  
                  // loop through the availability for the user
                  user3array.availability.forEach(availBlock => {
                    //  create a new event for each availability block
                    let newEvent:any[] = new DayPilot.Event({
                      start: availBlock.start,
                      end: availBlock.end,
                      id: "user3",
                      text: user3array.userName.charAt(0),
                      toolTip: user3array.userName,
                      backColor: user3color,
                      fontColor: "#000000",
                      className:"target",
                      ref:"user3"
                     });
                    //  add the new event to the events list
                     calendar.events.add(newEvent);
  
                     eventArray.push(newEvent);
                  })
                  break;
                case 3:
                  let user4array = user;
                  let user4color = color;

                  setUser4eventArray(user);
  
                  // loop through the availability for the user
                  user4array.availability.forEach(availBlock => {
                    //  create a new event for each availability block
                    let newEvent:any[] = new DayPilot.Event({
                      start: availBlock.start,
                      end: availBlock.end,
                      id: "user4",
                      text: user4array.userName.charAt(0),
                      toolTip: user4array.userName,
                      backColor: user4color,
                      fontColor: "#ffffff",
                      className:"target",
                      ref:"user4"
                     });
                    //  add the new event to the events list
                     calendar.events.add(newEvent);
  
                     eventArray.push(newEvent);
                  })
                  break;
                case 4:
                  let user5array = user;
                  let user5color = color;
  
                  setUser5eventArray(user);

                  // loop through the availability for the user
                  user5array.availability.forEach(availBlock => {
                    //  create a new event for each availability block
                    let newEvent:any[] = new DayPilot.Event({
                      start: availBlock.start,
                      end: availBlock.end,
                      id: "user5",
                      text: user5array.userName.charAt(0),
                      toolTip: user5array.userName,
                      backColor: user5color,
                      fontColor: "#ffffff",
                      className:"target",
                      ref:"user5"
                     });
                    //  add the new event to the events list
                     calendar.events.add(newEvent);
  
                     eventArray.push(newEvent);
                  })
                  break;
                case 5:
                  let user6array = user;
                  let user6color = color;
  
                  setUser6eventArray(user);

                  // loop through the availability for the user
                  user6array.availability.forEach(availBlock => {
                    //  create a new event for each availability block
                    let newEvent:any[] = new DayPilot.Event({
                      start: availBlock.start,
                      end: availBlock.end,
                      id: "user6",
                      text: user6array.userName.charAt(0),
                      toolTip: user6array.userName,
                      backColor: user6color,
                      fontColor: "#ffffff",
                      className:"target",
                      ref:"user6"
                     });
                    //  add the new event to the events list
                     calendar.events.add(newEvent);
  
                     eventArray.push(newEvent);
                  })
                  break;
             }
  
              if (index === userInfoData!.length -1){
                setEventCreated(true)
                setArrayOfEvents(eventArray)
                console.log("eventCreated should be true")
              }
        })
      }
     
  }, [userInfoData])

 
  // THIS IS NOT CURRENTLY WORKING AND IS NOT FINISHED
  // when  user clicks on event
  const handleEventClick = (args:any)  => {
              if(args.e.id() === "user1"){
                console.log("user1 event clicked", args.e.calendar.events.list);
                const allevents = args.e.calendar.events.list;
                let user1events = allevents.filter((event:any) => {return event.id === "user1"});
       
                user1events.forEach((event:any) => {event.cssClass = "hide"})
                console.log(user1events)
              }
            }

  


  return(
     <div className="results">
       <Sidebar userNames={userNames} numOfAttendees={numOfAttendees} results={true}/>
    
      <div className="resultsMain">

        <div className="resultsIntro">
          {/* get meeting name from database */}
          <h1>{eventName}</h1>
          <p>Everyone is viewing the calendar in the coordinator's time zone: <span className="text">{coordTimeZone}</span></p>
        </div>
   
        <div className="resultsCalendar">
          <div className="calendarHeader">
            {selectedDate
            ? <p>{new Date(selectedDate).toLocaleString('default', {month: "long"})}, {new Date(selectedDate).getFullYear()} </p>
            :null
            }
           
          </div>
          <DayPilotCalendar 
            durationBarVisible={false}
            startDate={"2022-05-09T09:00:00"}
            // viewType={"WorkWeek"}
            viewType = {"Week"}
            headerDateFormat={"ddd dd"}
            heightSpec={"Full"}
            showToolTip={"true"}
            onEventClick={handleEventClick}
            cellHeight={15}
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