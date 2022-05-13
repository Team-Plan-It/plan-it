
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";

//components
import rightArrow from "../../assets/right-arrow.png"
import leftArrow from "../../assets/left-arrow.png"


//styles
// import "./DisplayAvailability.css";

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

interface AvailabilityArray{
  sunday?: UserInfo[];
  monday?: UserInfo[];
  tuesday?: UserInfo[];
  wednesday?: UserInfo[];
  thursday?: UserInfo[];
  friday?: UserInfo[];
  saturday?: UserInfo[];
}

interface MeetingInfo {
  id: string;
  eventName: string;
  date: string;
  length: string;
  meetingNumber: string;
  timezone: string;
  emails: string[];
  users:UserInfo[];
  availabilityArray: AvailabilityArray;
}
interface PropsInfo{
  meetingData:MeetingInfo;
  timeZoneOffset:number;
}

const AvailabilityResultsCalendar= ({meetingData, timeZoneOffset}:PropsInfo) => {
  let calendar = DayPilot.Calendar;

  // deconstruct info from data
  const { eventName, length, date, timezone, emails, meetingNumber, users, availabilityArray } = meetingData;

  //initialize state
  // user info array
  const [ userInfoData, setUserInfoData ] = useState<UserInfo[]>()
  // if an event has been created
  const [ eventCreated, setEventCreated ] = useState<boolean>(false);
  // calendar month
  // const [ calendarMonth, setCalendarMonth ] = useState<string>();
  // calendar year
  // const [ calendarYear , setCalendarYear ] = useState<number>();
  // loading
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
    // timeZoneOffset
  // const [ timeZoneOffset, setTimeZoneOffset ] = useState<number>();
   // timezone of invitee/person using this page
  // const [ currentTimeZone, setCurrentTimeZone ] = useState<string>();
  // show or hide weekends of results calendar
  const [ showWeekends, setShowWeekends ] = useState<boolean>(true);
  // all events created
  const [ allEventsCreated, setAllEventsCreated ] = useState<boolean>(false);


  // get month as string from event date
  const month = new Date(date).toLocaleString('default', {month: "long"});
  // setCalendarMonth(month);
  //get year
  const year = new Date(date).getFullYear();
  // setCalendarYear(year);


  useEffect(() => {

    
    console.log("about to call createEventList")

      if(!eventCreated && users){
           setIsLoading(false);
        createEventList(users);


      // calendar.update();
      }else{
       console.log("userInfoData undefined")
      //  console.log("eventCreate: ", eventCreated)
      }
    
  }, [users])


  const createEventList = (userData:UserInfo[]) => {

    console.log("in createEventList");
  
    if(!eventCreated && calendar !== undefined){
    calendar.events.list = [];
    console.log(calendar.events.list)
     userData!.every((user, index) => {
  
             switch(index){
               case 0:
                  let user1array = user;
                  
                   // loop through the availability for the user
                  user1array.availability!.forEach((availBlock) => {
                    // for each object, get start and end value
                    let currentStart = new DayPilot.Date(availBlock.start);
                    let currentEnd = new DayPilot.Date(availBlock.end);
                    // subtract the timeZoneOffset in minutes to currentTime
                    let newStart =  currentStart.addMinutes(-timeZoneOffset!);
                    let newEnd = currentEnd.addMinutes(-timeZoneOffset!);
                    //  create a new event for each availability block
                    let newEvent:any[] = new DayPilot.Event({
                      start: newStart,
                      end: newEnd,
                      id: "user1",
                      text: user1array.userName!.charAt(0).toUpperCase(),
                      toolTip: user1array.userName,
                      fontColor: "#000000",
                      cssClass:"user1",
                      ref:"user1"
                     });
                     console.log("new event was created")
                    //  add the new event to the events list
                    if (calendar !== undefined && newEvent){
                      console.log("calendar should be initialized")
                      console.log(calendar.events.list)
                      calendar.events.add(newEvent);
                      console.log(calendar.events.list)
                      console.log("new event added to calendar ")
                    }else{
                      console.log("calendar not initialized")
                    }
                  })
                  break;
                case 1:
                  let user2array = user;

                  // loop through the availability for the user
                  user2array.availability!.forEach(availBlock => {
                    // for each object, get start and end value
                    let currentStart = new DayPilot.Date(availBlock.start);
                    let currentEnd = new DayPilot.Date(availBlock.end);
                    // subtract the timeZoneOffset in minutes to currentTime
                    let newStart =  currentStart.addMinutes(-timeZoneOffset!);
                    let newEnd = currentEnd.addMinutes(-timeZoneOffset!);
                    //  create a new event for each availability block
                    let newEvent:any[] = new DayPilot.Event({
                      start: newStart,
                      end: newEnd,
                      id: "user2",
                      text: user2array.userName!.charAt(0).toUpperCase(),
                      toolTip: user2array.userName,
                      // backColor: user2color,
                      fontColor: "#000000",
                      cssClass:"user2",
                      ref:"user2"
                     });
                    //  add the new event to the events list
                     calendar.events.add(newEvent);
                  })
                  break;
                case 2:
                  let user3array = user;
  
                  // loop through the availability for the user
                  user3array.availability!.forEach(availBlock => {
                    // for each object, get start and end value
                    let currentStart = new DayPilot.Date(availBlock.start);
                    let currentEnd = new DayPilot.Date(availBlock.end);
                    // subtract the timeZoneOffset in minutes to currentTime
                    let newStart =  currentStart.addMinutes(-timeZoneOffset!);
                    let newEnd = currentEnd.addMinutes(-timeZoneOffset!);                    
                    //  create a new event for each availability block
                    let newEvent:any[] = new DayPilot.Event({
                      start: newStart,
                      end: newEnd,
                      id: "user3",
                      text: user3array.userName!.charAt(0).toUpperCase(),
                      toolTip: user3array.userName,
                      fontColor: "#000000",
                      cssClass:"user3",
                      ref:"user3"
                     });
                    //  add the new event to the events list
                     calendar.events.add(newEvent);
                  })
                  break;
                case 3:
                  let user4array = user; 
  
                  // loop through the availability for the user
                  user4array.availability!.forEach(availBlock => {
                    // for each object, get start and end value
                    let currentStart = new DayPilot.Date(availBlock.start);
                    let currentEnd = new DayPilot.Date(availBlock.end);
                    // subtract the timeZoneOffset in minutes to currentTime
                    let newStart =  currentStart.addMinutes(-timeZoneOffset!);
                    let newEnd = currentEnd.addMinutes(-timeZoneOffset!);                    
                    //  create a new event for each availability block
                    let newEvent:any[] = new DayPilot.Event({
                      start: newStart,
                      end: newEnd,
                      id: "user4",
                      text: user4array.userName!.charAt(0).toUpperCase(),
                      toolTip: user4array.userName,
                      fontColor: "#000000",
                      cssClass:"user4",
                      ref:"user4"
                     });
                    //  add the new event to the events list
                     calendar.events.add(newEvent);
                  })
                  break;
                case 4:
                  let user5array = user;

                  // loop through the availability for the user
                  user5array.availability!.forEach(availBlock => {
                    // for each object, get start and end value
                    let currentStart = new DayPilot.Date(availBlock.start);
                    let currentEnd = new DayPilot.Date(availBlock.end);
                    // subtract the timeZoneOffset in minutes to currentTime
                    let newStart =  currentStart.addMinutes(-timeZoneOffset!);
                    let newEnd = currentEnd.addMinutes(-timeZoneOffset!);                    
                    //  create a new event for each availability block
                    let newEvent:any[] = new DayPilot.Event({
                      start: newStart,
                      end: newEnd,
                      id: "user5",
                      text: user5array.userName!.charAt(0).toUpperCase(),
                      toolTip: user5array.userName,
                      fontColor: "#000000",
                      cssClass:"user5",
                      ref:"user5"
                     });
                    //  add the new event to the events list
                     calendar.events.add(newEvent);
                  })
                  break;
                case 5:
                  let user6array = user;

                  // loop through the availability for the user
                  user6array.availability!.forEach(availBlock => {
                    // for each object, get start and end value
                    let currentStart = new DayPilot.Date(availBlock.start);
                    let currentEnd = new DayPilot.Date(availBlock.end);
                    // subtract the timeZoneOffset in minutes to currentTime
                    let newStart =  currentStart.addMinutes(-timeZoneOffset!);
                    let newEnd = currentEnd.addMinutes(-timeZoneOffset!);                    
                    //  create a new event for each availability block
                    let newEvent:any[] = new DayPilot.Event({
                      start: newStart,
                      end: newEnd,
                      id: "user6",
                      text: user6array.userName!.charAt(0).toUpperCase(),
                      toolTip: user6array.userName,
                      fontColor: "#000000",
                      cssClass:"user6",
                      ref:"user6"
                     });
                    //  add the new event to the events list
                     calendar.events.add(newEvent);
                  })
                  break;
             }
  
              if (index === userData!.length -1){
                console.log("index is the length of the userData array")
                setEventCreated(true)
                calendar.events.update();
                console.log("eventCreated should be true")
               
                return false
              }else {
                return true
              }
        })
    }
  }

  return(
     <div className="resultsCal"> 
            {/* {calendarYear && calendarMonth */}
            {/* ?  */}
            <div className="resultsCalIntro">
                <button className="toggleWeekends" onClick={() => setShowWeekends(!showWeekends)}>
                  {showWeekends 
                    ?<>Hide Weekends <span><img src={leftArrow} alt="left arrow" /></span></> 
                    :<>Show Weekends <span><img src={rightArrow} alt="right arrow" /></span></>}  
                </button>
                <p>{month} {year} </p>
              </div>
            {/* : null
          } */}

          <div className="resultsCalendar" id="calendar">
            {/* {
              isLoading 
              ? <p>Is loading.....</p>
    
              :  */}
              <DayPilotCalendar 
                      durationBarVisible={false}
                      startDate={date}
                      viewType = {showWeekends ?"Week" :"WorkWeek"}
                      headerDateFormat={"ddd dd"}
                      heightSpec={"Full"}
                      showToolTip={"true"}
                      id={"calendar"}
                      cellHeight={15}
                      width={"98%"}
                      CssOnly={true}
                      eventMoveHandling={"Disabled"}
                      eventResizeHandling={"Diasbled"}
                      timeRangeSelectedHandling={"Disabled"}
                      ref={(component:any | void) => {
                        calendar = component && component.control;
                      }} 
                  />
              {/* } */}
          </div>
        </div>
  )
}
 
export default AvailabilityResultsCalendar;