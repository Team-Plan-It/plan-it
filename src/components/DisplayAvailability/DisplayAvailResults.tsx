import axios from "axios";
import React, { useState, useEffect } from "react";
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
  userName?: string;
  timeZone?: string;
  availability?: Availability[];
  id?: string;
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
interface AvailabilityArray{
  sunday: UserInfo[];
  monday: UserInfo[];
  tuesday: UserInfo[];
  wednesday: UserInfo[];
  thursday: UserInfo[];
  friday: UserInfo[];
  saturday: UserInfo[];
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



const DisplayAvailResults = () => {
  let calendar = DayPilot.Calendar;
  // calendar.init();
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
  const [ userNames, setUserNames ] = useState<(string | undefined)[]>();
  // user info array
  const [ userInfoData, setUserInfoData ] = useState<UserInfo[]>()
  // if an event has been created
  const [ eventCreated, setEventCreated ] = useState<boolean>(false);
  // array of all events created
  const [ arrayOfEvents, setArrayOfEvents ] = useState<any[]>();
  // calendar month
  const [ month, setMonth ] = useState<string>();


  // arrays of each users events
  const [ user1eventArray, setUser1eventArray ] = useState<UserInfo>();
  const [ user2eventArray, setUser2eventArray ] = useState<UserInfo>();
  const [ user3eventArray, setUser3eventArray ] = useState<UserInfo>();
  const [ user4eventArray, setUser4eventArray ] = useState<UserInfo>();
  const [ user5eventArray, setUser5eventArray ] = useState<UserInfo>();
  const [ user6eventArray, setUser6eventArray ] = useState<UserInfo>();



  // axios call in async function
  const getData = async () => {
    const response = await axios.get(`http://localhost:4000/dates/results/${meetingNumID}`);
   
      const data = response.data[0];
      console.log(data.eventName)
      // setDataObj(data)
      const { eventName, length, date, timezone, emails, meetingNumber, users} = data!;

      // set event created to false
      setEventCreated(false)
      // save data in state
      setEventName(eventName);
      setMeetingLength(length);
      setSelectedDate(date);
      setCoordTimeZone(timezone);
      setMeetingNumber(meetingNumber);
      setUserInfoData(users);

      // populate userNameArray 
      const userNamesArray:(string | undefined)[] = users.map((user:UserInfo) => {
          return user.userName;
      });
      setUserNames(userNamesArray);

      // determine number of meeting attendees
      // includes coordinator
      let arrayOfNumOfUsers = [1];
      if(emails.length > 0){
        for (let i= 0; i < emails.length; i++){
          arrayOfNumOfUsers.push(i + 2)
        }
        setNumOfAttendees(arrayOfNumOfUsers);
      }

      // get month as string from event date
      const month = new Date(date).toLocaleString('default', {month: "long"});
      setMonth(month);

     console.log("about to call createEventList")
    //  setTimeout(() => {
       createEventList(users);
      //  if(userInfoData){
      //    createEventList();
   
      //  }else{
      //    console.log("userInfoData was not true")
      //  }
       
    //  }, 2000);

    // console.log("about to call createEventList")
  
 
    }

  useEffect(() => {
     getData();
    
  }, [])

  // useEffect(() => {

  //    console.log("about to call createEventList")
  
  //      if(userInfoData){
  //        createEventList();

  //      }
       
 
  // }, [userInfoData])


  

  const createEventList = (userData:UserInfo[]) => {
    const colorArray:string[] = ["#ff3db1", "#ff6b00", "#ffe500", "#49c491", "#4198f7", "#b03ce7"];

    let eventArray:any[] = [];

    console.log("in createEventList")
    console.log(`eventCreate is ${eventCreated}`)
    console.log(`userInfoData is ${userInfoData}`)
    if(!eventCreated){
      //  if(!eventCreated && userInfoData){
     userData!.forEach((user, index) => {
          console.log(user)
             // assign a color for each user 
             let color:string = colorArray[index];
  
             switch(index){
               case 0:
                  let user1array = user;
                  let user1color = color;

                  setUser1eventArray(user)
  
                   // loop through the availability for the user
                  user1array.availability!.forEach(availBlock => {

                    console.log(user1array.userName!.charAt(0))
                    //  create a new event for each availability block
                    let newEvent:any[] = new DayPilot.Event({
                      start: availBlock.start,
                      end: availBlock.end,
                      id: "user1",
                      text: user1array.userName!.charAt(0),
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
                  user2array.availability!.forEach(availBlock => {
                    //  create a new event for each availability block
                    let newEvent:any[] = new DayPilot.Event({
                      start: availBlock.start,
                      end: availBlock.end,
                      id: "user2",
                      text: user2array.userName!.charAt(0),
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
                  user3array.availability!.forEach(availBlock => {
                    //  create a new event for each availability block
                    let newEvent:any[] = new DayPilot.Event({
                      start: availBlock.start,
                      end: availBlock.end,
                      id: "user3",
                      text: user3array.userName!.charAt(0),
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
                  user4array.availability!.forEach(availBlock => {
                    //  create a new event for each availability block
                    let newEvent:any[] = new DayPilot.Event({
                      start: availBlock.start,
                      end: availBlock.end,
                      id: "user4",
                      text: user4array.userName!.charAt(0),
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
                  user5array.availability!.forEach(availBlock => {
                    //  create a new event for each availability block
                    let newEvent:any[] = new DayPilot.Event({
                      start: availBlock.start,
                      end: availBlock.end,
                      id: "user5",
                      text: user5array.userName!.charAt(0),
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
                  user6array.availability!.forEach(availBlock => {
                    //  create a new event for each availability block
                    let newEvent:any[] = new DayPilot.Event({
                      start: availBlock.start,
                      end: availBlock.end,
                      id: "user6",
                      text: user6array.userName!.charAt(0),
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
  
              if (index === userData!.length -1){
                setEventCreated(true)
                setArrayOfEvents(eventArray)
                calendar.events.update();
                console.log("eventCreated should be true")
              }else {
                console.log("error")
              }
        })

    }

  }

  

 
  // // THIS IS NOT CURRENTLY WORKING AND IS NOT FINISHED
  // // when  user clicks on event
  const handleEventClick = (args:any)  => {
              // if(args.e.id() === "user1"){
              //   console.log("user1 event clicked", args.e.calendar.events.list);
              //   const allevents = args.e.calendar.events.list;
              //   let user1events = allevents.filter((event:any) => {return event.id === "user1"});
       
              //   user1events.forEach((event:any) => {event.cssClass = "hide"})
              //   console.log(user1events)
              // }
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
            <>  
            {selectedDate
            ? <p>{new Date(selectedDate).toLocaleString('default', {month: "long"})}, {new Date(selectedDate).getFullYear()} </p>
            :null
          }
           
      
          </>
          </div>
          <div className="calendar" id="calendar">

          </div>
             <DayPilotCalendar 
            durationBarVisible={false}
            startDate={"2022-05-09T09:00:00"}
            // viewType={"WorkWeek"}
            viewType = {"Week"}
            headerDateFormat={"ddd dd"}
            heightSpec={"Full"}
            showToolTip={"true"}
            id={"calendar"}
            // onEventClick={handleEventClick}
            cellHeight={15}
            autoRefreshEnabled = {true}
            // beforeCellRender={(args: any) => {createEventList()}}
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