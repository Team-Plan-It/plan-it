import React, { useState, useEffect }from "react";
import {  useParams, useNavigate } from "react-router-dom";
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DayPilot } from "@daypilot/daypilot-lite-react";

//components
import Sidebar from "../Sidebar/Sidebar";

//styles
import "./Overlap.css";

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
type TimeObj ={
  start: string;
  startObj: Date;
  end: string;
  endObj: Date;
  user:string;
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

interface AvailabilityArray{
  sunday?: UserInfo[];
  monday?: UserInfo[];
  tuesday?: UserInfo[];
  wednesday?: UserInfo[];
  thursday?: UserInfo[];
  friday?: UserInfo[];
  saturday?: UserInfo[];
}
interface DayObjects{
  time: string;
  timeString?: string;
  convertedTimeString?: DayPilot.Date;
  array: TimeObj[];
}
interface AllDayArrays {
  day0array: DayObjects[];
  day1array: DayObjects[];
  day2array: DayObjects[];
  day3array: DayObjects[];
  day4array: DayObjects[];
  day5array: DayObjects[];
  day6array: DayObjects[];
}

interface DateInfo{
  day: number;
  month: string;
  year: number;
}

interface AllAvailObj {
  start: DayPilot.Date;
  end: DayPilot.Date;
}


const Overlap:React.FC= () => {
  // init useParams to get meetingID
  const meetingNumID = useParams().id;

  // init navigate
  let navigate = useNavigate();

  // init state
  // loading
  const [ isLoadingMeetingData, setIsLoadingMeetingData ] = useState<boolean>(true);
  const [ isLoadingOverlapData, setIsLoadingOverlapData ] = useState<boolean>(true);
  // // event name
  // const [ eventName, setEventName ] = useState<string>();
  // // length of meeting
  // const [ meetingLength, setMeetingLength ] = useState<string>();
  // meeting data
  const [ meetingData, setMeetingData ] = useState<MeetingInfo>();
  // user names
  const [ userNames, setUserNames ] = useState<(string | undefined)[]>();
  // number of invitees
  const [ numOfAttendees, setNumOfAttendees ] = useState<number[]>();
  // overlap data
  const [ overlapData, setOverlapData ] = useState<AllDayArrays>();
  // // availability array
  // const [ availabiltyArray, setAvailabilityArray ] = useState();
      // timeZoneOffset
  const [ timeZoneOffset, setTimeZoneOffset ] = useState<number>();
   // timezone of invitee/person using this page
  const [ currentTimeZone, setCurrentTimeZone ] = useState<string>();

  // results arrays
  const [ sundayResultsArray , setSundayResultsArray ] = useState<DayObjects[]>();
  const [ mondayResultsArray , setMondayResultsArray ] = useState<DayObjects[]>();
  const [ tuesdayResultsArray , setTuesdayResultsArray ] = useState<DayObjects[]>();
  const [ wednesdayResultsArray , setWednesdayResultsArray ] = useState<DayObjects[]>();
  const [ thursdayResultsArray , setThursdayResultsArray ] = useState<DayObjects[]>();
  const [ fridayResultsArray , setFridayResultsArray ] = useState<DayObjects[]>();
  const [ saturdayResultsArray , setSaturdayResultsArray ] = useState<DayObjects[]>();

  // dates
  const [ sundayDate, setSundayDate ] = useState<DateInfo>();
  const [ mondayDate, setMondayDate ] = useState<DateInfo>();
  const [ tuesdayDate, setTuesdayDate ] = useState<DateInfo>();
  const [ wednesdayDate, setWednesdayDate ] = useState<DateInfo>();
  const [ thursdayDate, setThursdayDate ] = useState<DateInfo>();
  const [ fridayDate, setFridayDate ] = useState<DateInfo>();
  const [ saturdayDate, setSaturdayDate ] = useState<DateInfo>();


  // arrays of all available timeblocks
  const [ sundayAllAvail, setSundayAllAvail ] = useState<AllAvailObj[]>();
  const [ mondayAllAvail, setMondayAllAvail ] = useState<AllAvailObj[]>();
  const [ tuesdayAllAvail, setTuesdayAllAvail ] = useState<AllAvailObj[]>();
  const [ wednesdayAllAvail, setWednesdayAllAvail ] = useState<AllAvailObj[]>();
  const [ thursdayAllAvail, setThursdayAllAvail ] = useState<AllAvailObj[]>();
  const [ fridayAllAvail, setFridayAllAvail ] = useState<AllAvailObj[]>();
  const [ saturdayAllAvail, setSaturdayAllAvail ] = useState<AllAvailObj[]>();


  const getMeetingData = async () => {
    // console.log("isLoading: ", isLoading)
    try{
      const [meetingResponse, overlapResponse ] = await Promise.all([
        
      axios.get(`http://localhost:4000/dates/results/${meetingNumID}`),
      axios.get(`http://localhost:4000/dates/overlapping/${meetingNumID}`)]);
      
      if(meetingResponse !== undefined && overlapResponse !== undefined){
        console.log("in try of getMeetingData function with axios call")
        // console.log(response)
        setIsLoadingMeetingData(false)

        // deconstruct info from data
           const { eventName, length, date, timezone, emails, meetingNumber, users, availabilityArray } = meetingResponse.data[0]!;

        // save data in state
        setMeetingData(meetingResponse.data[0]);
        // setEventName(eventName);
        // setMeetingLength(length);
        // setAvailabilityArray(availabilityArray);
        // console.log(availabilityArray)
        // console.log(availabilityArray.monday[0].availability[0].start)
       

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

        setIsLoadingOverlapData(false);
        setOverlapData(overlapResponse.data);

        // get timezoneoffest
        // const timeZoneOffset = -180;
        const timeZoneOffset = new Date().getTimezoneOffset();
        // console.log("timezoneOffset=",timeZoneOffset);
        setTimeZoneOffset(timeZoneOffset);

        // get current timeZone
        const eventTimeZone = new Date().toLocaleTimeString(undefined, {timeZoneName: "short"}).split(" ")[2];
        setCurrentTimeZone(eventTimeZone);
      }
    }
    catch(error:unknown){
      if(error instanceof Error){
        console.log("error message: ", error.message)
      }
    }
  }

  // const getOverlapData = async () => {
  //   // console.log("isLoading: ", isLoading)
  //   try{
  //     const response = await axios.get(`http://localhost:4000/dates/overlapping/${meetingNumID}`);
      
  //     console.log("in try of getOverlapData function with axios call")
  //     if(response !== undefined){
  //       console.log("response is defined")
  //       setIsLoadingOverlapData(false);
  //       setOverlapData(response.data);
  //     }else{
  //       console.log("response is undefined")
  //     }
  //   }
  //   catch(error:unknown){
  //     if(error instanceof Error){
  //       console.log("error message: ", error.message)
  //     }
  //   }
  // }

  useEffect(() => {
    // getOverlapData();
    getMeetingData();
    
  }, [])

  useEffect(() => {
    if(overlapData !== undefined && meetingData !== undefined && userNames && numOfAttendees && userNames.length === numOfAttendees.length){
      console.log("calling checkOverlapArrays")
      checkOverlapArrays(overlapData);
    }
  }, [overlapData])

  // function to get the day, month and year
  const getDates = (timeblock:DayObjects) => {
    console.log("in getDates function")
    const convertedTime = new Date(timeblock.timeString!);

    // get date
    const day = convertedTime.getDate();
    const year = convertedTime.getFullYear();
    const month = convertedTime.toLocaleString('default', {month: "long"});

    return {day, month, year}
  }

  // check each day array of overlapping results for timeslots that have length > 0
  const checkOverlapArrays = (arrayOfDayArrays:AllDayArrays) => {
    console.log("in checkOverlapArrays");

    //function to filter out timeslots that have a length > 0
    const checkDayArray = (dayArray:DayObjects[]) => {
      console.log("in checkDayArray")
      const timeslotsWithAvail:any = dayArray.filter(timeslot => {return timeslot.array.length > 0})
    
      return timeslotsWithAvail;
    }

    // function to get current timeString and convert it to local time of browser
    const convertTimeString = (timeString:string) => {
      console.log("in convertedTimeString")
      // console.log(timeString)
      const currentTimeString = new DayPilot.Date(timeString);
      const convertedTimeString = currentTimeString.addMinutes(-timeZoneOffset!);
      // console.log(currentTimeString, convertedTimeString);
      return convertedTimeString;
    }

    // if array for each day of the week has content
    if(arrayOfDayArrays.day0array.length > 0){
      // get date and save in state
      const sundayDate = getDates(arrayOfDayArrays.day0array[0]);
      setSundayDate(sundayDate);

      // save filtered results in a variable for each day
      const sundayResults = checkDayArray(arrayOfDayArrays.day0array);
      
      // convert timeString of each object in the array and add it to the array and save in state
      sundayResults.forEach((timeblock:DayObjects, index:number) => {
        let convertedTimeString = convertTimeString(timeblock.timeString!);
        sundayResults[index].convertedTimeString = convertedTimeString;
      })
      setSundayResultsArray(sundayResults);

      // get availability blocks when all attendees are available and save in state
      const sundayAvailBlocks = getAvailableBlocks(sundayResults);
      setSundayAllAvail(sundayAvailBlocks!);
    }
   
    if(arrayOfDayArrays.day1array.length > 0){
      console.log("in monday")
      const mondayDate = getDates(arrayOfDayArrays.day1array[0]);
      setMondayDate(mondayDate);

      const mondayResults = checkDayArray(arrayOfDayArrays.day1array);
      
      mondayResults.forEach((timeblock:DayObjects, index:number) => {
        let convertedTimeString = convertTimeString(timeblock.timeString!);
        mondayResults[index].convertedTimeString = convertedTimeString;
      })
      setMondayResultsArray(mondayResults);

      const mondayAvailBlocks = getAvailableBlocks(mondayResults);
      // console.log(mondayResults)
      // console.log(mondayAvailBlocks!.length)
      if(mondayAvailBlocks !== undefined){
        setMondayAllAvail(mondayAvailBlocks!);
        // console.log(mondayAvailBlocks)
      }
    }

    if(arrayOfDayArrays.day2array.length > 0){
      console.log("in tuesday")
      const tuesdayDate = getDates(arrayOfDayArrays.day2array[0]);
      setTuesdayDate(tuesdayDate);
      const tuesdayResults = checkDayArray(arrayOfDayArrays.day2array);

      tuesdayResults.forEach((timeblock:DayObjects, index:number) => {
        let convertedTimeString = convertTimeString(timeblock.timeString!);
        tuesdayResults[index].convertedTimeString = convertedTimeString;
      })
      setTuesdayResultsArray(tuesdayResults);
      // console.log(tuesdayResults)
      const tuesdayAvailBlocks = getAvailableBlocks(tuesdayResults);
      if(tuesdayAvailBlocks !== undefined){
        setTuesdayAllAvail(tuesdayAvailBlocks!);
        // console.log(tuesdayAvailBlocks)
      }
    }

    if(arrayOfDayArrays.day3array.length > 0){
      console.log("in wednesday")
      const wednesdayDate = getDates(arrayOfDayArrays.day3array[0]);
      setWednesdayDate(wednesdayDate);
      const wednesdayResults = checkDayArray(arrayOfDayArrays.day3array);

      wednesdayResults.forEach((timeblock:DayObjects, index:number) => {
        let convertedTimeString = convertTimeString(timeblock.timeString!);
        wednesdayResults[index].convertedTimeString = convertedTimeString;
      })
      setWednesdayResultsArray(wednesdayResults);

      const wednesdayAvailBlocks = getAvailableBlocks(wednesdayResults);
      if(wednesdayAvailBlocks !== undefined){
        setWednesdayAllAvail(wednesdayAvailBlocks!);
      }
    }

    if(arrayOfDayArrays.day4array.length > 0){
      console.log("in thursday")
      const thursdayDate = getDates(arrayOfDayArrays.day4array[0]);
      setThursdayDate(thursdayDate);
      const thursdayResults = checkDayArray(arrayOfDayArrays.day4array);

      thursdayResults.forEach((timeblock:DayObjects, index:number) => {
        let convertedTimeString = convertTimeString(timeblock.timeString!);
        thursdayResults[index].convertedTimeString = convertedTimeString;
      })
      setThursdayResultsArray(thursdayResults);

      const thursdayAvailBlocks = getAvailableBlocks(thursdayResults);
      if(thursdayAvailBlocks !== undefined){
        setThursdayAllAvail(thursdayAvailBlocks!);
      }
    }

    if(arrayOfDayArrays.day5array.length > 0){
      console.log("in friday")
      const fridayDate = getDates(arrayOfDayArrays.day5array[0]);
      setFridayDate(fridayDate);
      const fridayResults = checkDayArray(arrayOfDayArrays.day5array);

      fridayResults.forEach((timeblock:DayObjects, index:number) => {
        let convertedTimeString = convertTimeString(timeblock.timeString!);
        fridayResults[index].convertedTimeString = convertedTimeString;
      })
      setFridayResultsArray(fridayResults);

      const fridayAvailBlocks = getAvailableBlocks(fridayResults);
      if(fridayAvailBlocks !== undefined){
        setFridayAllAvail(fridayAvailBlocks!);
      }
    }

    if(arrayOfDayArrays.day6array.length > 0){
      console.log("in saturday")
      const saturdayDate = getDates(arrayOfDayArrays.day6array[0]);
      setSaturdayDate(saturdayDate);
      const saturdayResults = checkDayArray(arrayOfDayArrays.day6array);

      saturdayResults.forEach((timeblock:DayObjects, index:number) => {
        let convertedTimeString = convertTimeString(timeblock.timeString!);
        saturdayResults[index].convertedTimeString = convertedTimeString;
      })
      setSaturdayResultsArray(saturdayResults);

      const saturdayAvailBlocks = getAvailableBlocks(saturdayResults);
      if(saturdayAvailBlocks !== undefined){
        setSaturdayAllAvail(saturdayAvailBlocks!);
      }
    }
  }


  const convertAvailTimeString = (timeblock:AllAvailObj) => {
    // console.log(timeblock)
    let startAmPm = "am";
    let endAmPm = "am";
    // get start and end time
    // set start time as am/pm format
    let startHour = timeblock.start.getHours();
    if (startHour === 0){
      startHour = 12;
    }else if(startHour === 12){
      startAmPm = "pm";
    }else if(startHour === 24){
      startHour = 12;
      startAmPm = "am";
    }else if(startHour > 12){
      startHour = startHour - 12;
      startAmPm = "pm";
    }

    // set end time as am/pm format
    let endHour = timeblock.end.getHours();
    if (endHour === 0){
      endHour = 12;
    }else if(endHour === 12){
      endAmPm = "pm";
    }else if(endHour === 24){
      endHour = 12;
      endAmPm = "am";
    }else if(endHour > 12){
      endHour = endHour - 12;
      endAmPm = "pm";
    }
    
    // get start and end minutes
    let startMinString = "00";
    const startMinutes = timeblock.start.getMinutes();
    if (startMinutes === 30){
      startMinString = "30";
    }
    let endMinString = "00";
    const endMinutes = timeblock.end.getMinutes();
    if (endMinutes === 30){
      endMinString = "30";
    }

    // get length of timeblock
    const endTimeOfBlock = timeblock.end.getTimePart();
    const startTimeOfBlock = timeblock.start.getTimePart();
    // console.log(endTimeOfBlock, startTimeOfBlock)
    const diffTime = endTimeOfBlock - startTimeOfBlock;
    // console.log(diffTime)
    let seconds = Math.floor(diffTime / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    minutes = minutes % 60;
    // console.log(`time of timeblock is: ${hours} hours, ${minutes} minutes, ${seconds} seconds`)
    let lengthOfTimeBlock = "";
    if(hours === 0){
      lengthOfTimeBlock = `${minutes} minutes`
    }else if(hours === 1 && minutes === 0){
       lengthOfTimeBlock = `${hours} hour`
    }else if(hours === 1){
      lengthOfTimeBlock = `${hours} hour, ${minutes} minutes`
    }else if( minutes === 0){
      lengthOfTimeBlock = `${hours} hours`
    }else {
      lengthOfTimeBlock = `${hours} hours, ${minutes} minutes`

    }

    return { startHour, startMinString, startAmPm, endHour, endMinString, endAmPm, lengthOfTimeBlock }
  }


  const getAvailableBlocks = (resultsArray:DayObjects[]) => {
    let startTime:DayPilot.Date;
    let endTime:DayPilot.Date;
    let allAvailBlocks:AllAvailObj[] = [];
    console.log("in getAvailabileBlocks")
    // go through array looking for array length === numOfAttendees
    if(userNames){
      console.log("usernames is defined")
      resultsArray.map(timeblock => {
        // console.log(timeblock.array.length, userNames!.length);
        if(timeblock.array.length === userNames!.length){
          if(!startTime && !endTime){
           // set start time as time of first timeString
            startTime = new DayPilot.Date(timeblock.convertedTimeString);
            // set end time as start time plus 30 minutes
            endTime = new DayPilot.Date(timeblock.convertedTimeString);
            endTime = endTime.addMinutes(30);
            console.log("should be init of start and endtime");
          }else if(timeblock.convertedTimeString === endTime){
            // check if convertedTimeString same as end time
            // if true, change endtime to results starttime plus 30 minutes
            endTime = new DayPilot.Date(timeblock.convertedTimeString);
            endTime = endTime.addMinutes(30);
            console.log("start time the same, changing end time")

          }else{
            // start and end time are defined but start time of current timestring does not equel the end time => it is a new timeblock
            // push current values of start and end time
            allAvailBlocks.push({ start:startTime, end:endTime });
            // set start time as time of current timeString
            startTime = new DayPilot.Date(timeblock.convertedTimeString);
            // set end time as start time plus 30 minutes
            endTime = new DayPilot.Date(timeblock.convertedTimeString);
            endTime = endTime.addMinutes(30);
          }
          // console.log(startTime, endTime)
        }else{
          console.log("array length not equal to userName length")
        }
      })
      if(startTime !== undefined && endTime !== undefined){
        allAvailBlocks.push({ start:startTime, end:endTime })
        // console.log(allAvailBlocks)
      }
      // console.log(allAvailBlocks)
      return allAvailBlocks;
    }else {
      console.log("usernames not defined")
    }
  }


  return(
    <>
      {
        isLoadingMeetingData && isLoadingOverlapData && overlapData && meetingData
        ?<p>Is loading meeting data....</p>
        :<div className="overlapResults">
          <Sidebar userNames={userNames} numOfAttendees={numOfAttendees} results={true}/>
          <div className="overlapInfo">
            <div className="overlapInfoIntro">
              <h1>{meetingData ?meetingData.eventName :null}</h1>
              <p>You are viewing the calendar in your time zone: <span className="text bold">{currentTimeZone}</span></p>
              <button onClick={() => navigate("/")}>+ Add New Event</button>
            </div>
            {/* if not all invitees have completed their availability */}
            {
              userNames && numOfAttendees && userNames!.length !== numOfAttendees!.length
                ?<p className="notAllAvail">{userNames!.length} of {numOfAttendees!.length} attendees have filled out their availability</p>

                : <>
                  <h2>Time Available for Everyone</h2>
                  <ul className="availableTimes">
                    <li>
                      {
                        sundayDate && sundayAllAvail && sundayAllAvail.length > 0
                        ?<p>Sunday, {sundayDate.month} {sundayDate.day}, {sundayDate.year}</p>
                        :null
                      }
                        
                      {
                        sundayAllAvail && userNames
                        ? <>
                              <ul className="dayTimes">
                                {
                                  sundayAllAvail.map((timeblock) => {
                                      const timeResults = convertAvailTimeString(timeblock);
                                      const { startHour, startMinString, startAmPm, endHour, endMinString, endAmPm, lengthOfTimeBlock } = timeResults;
                                      return(
                                        <li key={startHour}>
                                          <p className="timeP">{startHour}:{startMinString}{startAmPm} - {endHour}:{endMinString}{endAmPm}</p>
                                          <p className="length">{lengthOfTimeBlock}</p>
                                          <ul className="userNames">
                                          {
                                            userNames.map((name, index) => {
                                                return(
                                                  <li key={`${index}${name}`}>{name}</li>
                                                )
                                            })
                                          }
                                          </ul>
                                        </li>
                                      )
                                  })
                                }
                              </ul>
                          </>
                        : null
                      }
                    </li>
                    <li>
                       {
                        mondayDate && mondayAllAvail && mondayAllAvail.length > 0
                        ?<p>Monday, {mondayDate.month} {mondayDate.day}, {mondayDate.year}</p>
                        :null
                      }
                      {
                        mondayAllAvail
                        ? <>
                              <ul className="dayTimes">
                                {
                                   mondayAllAvail.map((timeblock) => {
                                    //  console.log(timeblock)
                                      const timeResults = convertAvailTimeString(timeblock);
                                      const { startHour, startMinString, startAmPm, endHour, endMinString, endAmPm, lengthOfTimeBlock } = timeResults;
                                      return(
                                        <li key={startHour}>
                                          <p className="timeP">{startHour}:{startMinString}{startAmPm} - {endHour}:{endMinString}{endAmPm}</p>
                                          <p className="length">{lengthOfTimeBlock}</p>
                                          <ul className="userNames">
                                          {
                                            userNames
                                            ? userNames.map((name, index) => {
                                                return(
                                                  <li key={`${index}${name}`}>{name}</li>
                                                )
                                            })
                                            :null
                                          }
                                          </ul>
                                        </li>
                                      )
                                  })
                                }
                              </ul>
                          </>
                        : null
                      }
                    </li>
                    <li>
                      {
                        tuesdayDate && tuesdayAllAvail && tuesdayAllAvail.length > 0
                        ?<p>Tuesday, {tuesdayDate.month} {tuesdayDate.day}, {tuesdayDate.year}</p>
                        :null
                      }
                      {
                        tuesdayAllAvail && userNames
                        ? <>
                              <ul className="dayTimes">
                                {
                                   tuesdayAllAvail.map((timeblock) => {
                                      const timeResults = convertAvailTimeString(timeblock);
                                      const { startHour, startMinString, startAmPm, endHour, endMinString, endAmPm, lengthOfTimeBlock } = timeResults;
                                      return(
                                        <li key={startHour}>
                                          <p className="timeP">{startHour}:{startMinString}{startAmPm} - {endHour}:{endMinString}{endAmPm}</p>
                                          <p className="length">{lengthOfTimeBlock}</p>
                                          <ul className="userNames">
                                          {
                                            userNames.map((name, index) => {
                                                return(
                                                  <li key={`${index}${name}`}>{name}</li>
                                                )
                                            })
                                          }
                                          </ul>
                                        </li>
                                      )
                                  })
                                }
                              </ul>
                          </>
                        : null
                      }
                    </li>
                    <li>
                      {
                        wednesdayDate && wednesdayAllAvail && wednesdayAllAvail.length > 0
                        ?<p>Wednesday, {wednesdayDate.month} {wednesdayDate.day}, {wednesdayDate.year}</p>
                        :null
                      }
                      {
                        wednesdayAllAvail && userNames
                        ? <>
                              <ul className="dayTimes">
                                {
                                  wednesdayAllAvail.map((timeblock) => {
                                      const timeResults = convertAvailTimeString(timeblock);
                                      const { startHour, startMinString, startAmPm, endHour, endMinString, endAmPm, lengthOfTimeBlock } = timeResults;
                                      return(
                                        <li key={startHour}>
                                          <p className="timeP">{startHour}:{startMinString}{startAmPm} - {endHour}:{endMinString}{endAmPm}</p>
                                          <p className="length">{lengthOfTimeBlock}</p>
                                          <ul className="userNames">
                                          {
                                            userNames.map((name, index) => {
                                                return(
                                                  <li key={`${index}${name}`}>{name}</li>
                                                )
                                            })
                                          }
                                          </ul>
                                        </li>
                                      )
                                  })
                                }
                              </ul>
                          </>
                        : null
                      }
                    </li>
                    <li>
                      {
                        thursdayDate && thursdayAllAvail && thursdayAllAvail.length > 0
                        ?<p>Thursday, {thursdayDate.month} {thursdayDate.day}, {thursdayDate.year}</p>
                        :null
                      }
                      {
                        thursdayAllAvail && userNames
                        ? <>
                              <ul className="dayTimes">
                                {
                                  thursdayAllAvail.map((timeblock) => {
                                      const timeResults = convertAvailTimeString(timeblock);
                                      const { startHour, startMinString, startAmPm, endHour, endMinString, endAmPm, lengthOfTimeBlock } = timeResults;
                                      return(
                                        <li key={startHour}>
                                          <p className="timeP">{startHour}:{startMinString}{startAmPm} - {endHour}:{endMinString}{endAmPm}</p>
                                          <p className="length">{lengthOfTimeBlock}</p>
                                          <ul className="userNames">
                                          {
                                            userNames.map((name, index) => {
                                                return(
                                                  <li key={`${index}${name}`}>{name}</li>
                                                )
                                            })
                                          }
                                          </ul>
                                        </li>
                                      )
                                  })
                                }
                              </ul>
                          </>
                        : null
                      }
                    </li>
                    <li>
                       {
                        fridayDate && fridayAllAvail && fridayAllAvail.length > 0
                        ?<p>Friday, {fridayDate.month} {fridayDate.day}, {fridayDate.year}</p>
                        :null
                      }
                      {
                        fridayAllAvail && userNames
                        ? <>
                              <ul className="dayTimes">
                                {
                                  fridayAllAvail.map((timeblock) => {
                                      const timeResults = convertAvailTimeString(timeblock);
                                      const { startHour, startMinString, startAmPm, endHour, endMinString, endAmPm, lengthOfTimeBlock } = timeResults;
                                      return(
                                        <li key={startHour}>
                                          <p className="timeP">{startHour}:{startMinString}{startAmPm} - {endHour}:{endMinString}{endAmPm}</p>
                                          <p className="length">{lengthOfTimeBlock}</p>
                                          <ul className="userNames">
                                          {
                                            userNames.map((name, index) => {
                                                return(
                                                  <li key={`${index}${name}`}>{name}</li>
                                                )
                                            })
                                          }
                                          </ul>
                                        </li>
                                      )
                                  })
                                }
                              </ul>
                          </>
                        : null
                      }
                    </li>
                    <li>
                      {
                        saturdayDate && saturdayAllAvail && saturdayAllAvail.length > 0
                        ?<p>Saturday, {saturdayDate.month} {saturdayDate.day}, {saturdayDate.year}</p>
                        :null
                      }
                      {
                        saturdayAllAvail && userNames
                        ? <>
                              <ul className="dayTimes">
                                {
                                  saturdayAllAvail.map((timeblock) => {
                                      const timeResults = convertAvailTimeString(timeblock);
                                      const { startHour, startMinString, startAmPm, endHour, endMinString, endAmPm, lengthOfTimeBlock } = timeResults;
                                      return(
                                        <li key={startHour}>
                                          <p className="timeP">{startHour}:{startMinString}{startAmPm} - {endHour}:{endMinString}{endAmPm}</p>
                                          <p className="length">{lengthOfTimeBlock}</p>
                                          <ul className="userNames">
                                          {
                                            userNames.map((name, index) => {
                                                return(
                                                  <li key={`${index}${name}`}>{name}</li>
                                                )
                                            })
                                          }
                                          </ul>
                                        </li>
                                      )
                                  })
                                }
                              </ul>
                          </>
                        : null
                      }
                    </li>
                  </ul>
                </>
            }
            
            {/* button will navigate to availability results page */}
            <button className="navToResults" onClick={() => navigate(`/results/${meetingNumID}`)}>Show Calendar View</button>

          </div>
        
        
        
        
        </div>
      }
  
    </>
  )
}


export default Overlap;