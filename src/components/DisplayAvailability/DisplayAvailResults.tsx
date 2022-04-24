import React, { useState, useEffect } from "react";
// import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";


//components
import meetingData from "../../testEventsMeetingInfo";

//styles
import "./DisplayAvailability.css";
import { time } from "console";


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
  // array of all events created
  const [ arrayOfEvents, setArrayOfEvents ] = useState<any[]>();

    // if checkbox toggled
  const [ user1checked, setUser1Checked ] = useState<boolean>(true);
  const [ user2checked, setUser2Checked ] = useState<boolean>(true);
  const [ user3checked, setUser3Checked ] = useState<boolean>(true);
  const [ user4checked, setUser4Checked ] = useState<boolean>(true);
  const [ user5checked, setUser5Checked ] = useState<boolean>(true);
  const [ user6checked, setUser6Checked ] = useState<boolean>(true);

  // toggle event to show or hide
  const [ user1visible, setUser1Visible ] = useState<boolean>(true);
  const [ user2visible, setUser2Visible ] = useState<boolean>(true);
  const [ user3visible, setUser3Visible ] = useState<boolean>(true);
  const [ user4visible, setUser4Visible ] = useState<boolean>(true);
  const [ user5visible, setUser5Visible ] = useState<boolean>(true);
  const [ user6visible, setUser6Visible ] = useState<boolean>(true);


  // arrays of each users events
  const [ user1eventArray, setUser1eventArray ] = useState<UserInfo>();
  const [ user2eventArray, setUser2eventArray ] = useState<UserInfo>();
  const [ user3eventArray, setUser3eventArray ] = useState<UserInfo>();
  const [ user4eventArray, setUser4eventArray ] = useState<UserInfo>();
  const [ user5eventArray, setUser5eventArray ] = useState<UserInfo>();
  const [ user6eventArray, setUser6eventArray ] = useState<UserInfo>();



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

  // separate users
  useEffect(() => {
     const colorArray:string[] = ["#ff5733", "#ffb533", "#fcff33", "#33ff46", "#33f6ff", "#3361ff", "#d733ff"];

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
                      text: user1array.userName,
                      toolTip: user1array.userName,
                      backColor: user1color,
                      fontColor: "#000000",
                      // cssClass: user1visible ?"show" :"hide",
                      
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
                      text: user2array.userName,
                      toolTip: user2array.userName,
                      backColor: user2color,
                      fontColor: "#000000",
                      cssClass: user2visible ?"show" :"hide",
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
                      text: user3array.userName,
                      toolTip: user3array.userName,
                      backColor: user3color,
                      fontColor: "#000000",
                      cssClass: user3visible ?"show" :"hide",
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
                      text: user4array.userName,
                      toolTip: user4array.userName,
                      backColor: user4color,
                      fontColor: "#000000",
                      cssClass: user4visible ?"show" :"hide",
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
                      text: user5array.userName,
                      toolTip: user5array.userName,
                      backColor: user5color,
                      fontColor: "#000000",
                      cssClass: user5visible ?"show" :"hide",
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
                      text: user6array.userName,
                      toolTip: user6array.userName,
                      backColor: user6color,
                      fontColor: "#000000",
                      cssClass: user6visible ?"show" :"hide",
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
      userInfoData!.forEach((user) => {
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
  }, [userInfoData])




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
              ?
               <>
              <ul className="userToggles">
                <li key="1">
                  {
                    userNames.length > 0

                    ?<label htmlFor={userNames[0]}>
                      <input 
                      type="checkbox" 
                      id={userNames[0]} 
                      className={userNames[0]} 
                      checked={user1checked}
                      onChange={e => {
                        setUser1Checked(e.target.checked);
                        let eventChange = calendar.elements.events;
                        const user1events = eventChange.filter((event:any) => {return event.textContent === userNames[0]});
                        user1events.forEach((event:any) => {event.classList.toggle("hide")})
                        console.log(user1events!)
                        calendar.events.update(user1events)
                        setUser1Visible(e.target.checked);
                      }}
                      />
                      {userNames[0]}
                    </label>
                    :null
                  }
                </li>
                <li key="2">
                  {
                    userNames.length === 2 || userNames.length === 3 || userNames.length === 4 || userNames.length === 5 || userNames.length === 6

                    ?<label htmlFor={userNames[1]}>
                      <input 
                      type="checkbox" 
                      id={userNames[1]} 
                      className={userNames[1]} 
                      checked={user2checked}
                      onChange={e => {
                        setUser2Checked(e.target.checked)
                        setUser2Visible(!user2visible);
                      }}
                      />
                      {userNames[1]}
                    </label>
                    :null
                  }
                </li>
                <li key="3">
                  {
                    userNames.length === 3 || userNames.length === 4 || userNames.length === 5 || userNames.length === 6 

                    ?<label htmlFor={userNames[2]}>
                      <input 
                      type="checkbox" 
                      id={userNames[2]} 
                      className={userNames[2]} 
                      checked={user3checked}
                      onChange={e => {
                        setUser3Checked(e.target.checked)
                        setUser3Visible(!user3visible);
                      }}
                      />
                      {userNames[2]}
                    </label>
                    :null
                  }
                </li>
                <li key="4">
                  {
                    userNames.length === 4 || userNames.length === 5 || userNames.length === 6 

                    ?<label htmlFor={userNames[3]}>
                      <input 
                      type="checkbox" 
                      id={userNames[3]} 
                      className={userNames[3]} 
                      checked={user4checked}
                      onChange={e => {
                        console.log(e.target)
                        setUser4Checked(e.target.checked)
                        setUser4Visible(!user4visible);
                      }}
                      />
                      {userNames[3]}
                    </label>
                    :null
                  }
                </li>
                <li key="5">
                  {
                    userNames.length === 5 || userNames.length === 6 

                    ?<label htmlFor={userNames[4]}>
                      <input 
                      type="checkbox" 
                      id={userNames[4]} 
                      className={userNames[4]} 
                      checked={user5checked}
                      onChange={e => {
                        setUser5Checked(e.target.checked);
                        setUser5Visible(!user5visible);
                      }}
                      />
                      {userNames[4]}
                    </label>
                    :null
                  }
                </li>  
                <li key="6">
                  {
                    userNames.length === 6

                    ?<label htmlFor={userNames[5]}>
                      <input 
                      type="checkbox" 
                      id={userNames[5]} 
                      className={userNames[5]} 
                      checked={user6checked}
                      onChange={e => {
                        setUser6Checked(e.target.checked);
                        setUser6Visible(!user6visible);
                      }}
                      />
                      {userNames[5]}
                    </label>
                    :null
                  }
                </li>   
              </ul>
              
              </>
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
            onEventClick={(args:any)  => {
              if(args.e.id() === "user1"){
                console.log("user1 event clicked", args.e.calendar.events.list);
                const allevents = args.e.calendar.events.list;
                let user1events = allevents.filter((event:any) => {return event.id === "user1"});
                console.log(user1events)
                user1events.forEach((event:any) => {event.cssClass = "hide"})
                console.log(user1events)
                // args.e.data.cssClass= "hide";
                
              }
            }}
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