import React, { useState, useEffect }from "react";
import {  useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
interface DayObjects{
  time: string;
  timestamp?: string;
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


const Overlap:React.FC= () => {
  // init useParams to get meetingID
  const meetingNumID = useParams().id;

  // init navigate
  let navigate = useNavigate();

  // init state
  // loading
  const [ isLoadingMeetingData, setIsLoadingMeetingData ] = useState<boolean>(true);
  const [ isLoadingOverlapData, setIsLoadingOverlapData ] = useState<boolean>(true);
  // event name
  const [ eventName, setEventName ] = useState<string>();
  // length of meeting
  const [ meetingLength, setMeetingLength ] = useState<string>();
  // user names
  const [ userNames, setUserNames ] = useState<(string | undefined)[]>();
  // number of invitees
  const [ numOfAttendees, setNumOfAttendees ] = useState<number[]>();
  // overlap data
  const [ overlapData, setOverlapData ] = useState<AllDayArrays>();
  // availability array
  const [ availabiltyArray, setAvailabilityArray ] = useState();

  // results arrays
  const [ sundayResultsArray , setSundayResultsArray ] = useState<DayObjects[]>();
  const [ mondayResultsArray , setMondayResultsArray ] = useState<DayObjects[]>();
  const [ tuesdayResultsArray , setTuesdayResultsArray ] = useState<DayObjects[]>();
  const [ wednesdayResultsArray , setWednesdayResultsArray ] = useState<DayObjects[]>();
  const [ thursdayResultsArray , setThursdayResultsArray ] = useState<DayObjects[]>();
  const [ fridayResultsArray , setFridayResultsArray ] = useState<DayObjects[]>();
  const [ saturdayResultsArray , setSaturdayResultsArray ] = useState<DayObjects[]>();

   const getMeetingData = async () => {
    // console.log("isLoading: ", isLoading)
    try{
      const response = await axios.get(`http://localhost:4000/dates/results/${meetingNumID}`);
      
      console.log("in try of getMeetingData function with axios call")
      if(response !== undefined){
        console.log(response)
        setIsLoadingMeetingData(false)

        // deconstruct info from data
           const { eventName, length, date, timezone, emails, meetingNumber, users, availabilityArray } = response.data[0]!;

        // save data in state
        setEventName(eventName);
        setMeetingLength(length);
        setAvailabilityArray(availabilityArray);
        console.log(availabilityArray)
        console.log(availabilityArray.monday[0].availability[0].start)
        // let dateObj = availabilityArray.monday[0].availability[0].start;
        // const now_utc =  Date.UTC(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), dateObj.getUTCDate(), 0, 0, 0);
        // const newDate = new Date(now_utc)
        // console.log(newDate)

        // const regEx = /(\d{1,4}([.\-/])\d{1,2}([.\-/])\d{1,4})/;

        // const dateString = regEx.exec(dateObj);

        // console.log(dateString![0])

      



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

      }
    }
    catch(error){
      console.log(error)
    }
  }

  const getOverlapData = async () => {
    // console.log("isLoading: ", isLoading)
    try{
      const response = await axios.get(`http://localhost:4000/dates/overlapping/${meetingNumID}`);
      
      console.log("in try of getOverlapData function with axios call")
      if(response !== undefined){
        console.log(response.data)
        setIsLoadingOverlapData(false);
        setOverlapData(response.data);
      }
    }
    catch(error:unknown){
      if(error instanceof Error){
        console.log("error message: ", error.message)
      }
    }
  }

  useEffect(() => {
    getOverlapData();
    getMeetingData();
  }, [])

  useEffect(() => {
    if(overlapData !== undefined){
      checkOverlapArrays(overlapData)
    }
  }, [overlapData])

  // check each day array of overlapping results for timeslots that have length > 0
  const checkOverlapArrays = (arrayOfDayArrays:AllDayArrays) => {
    console.log("in checkOverlapArrays");
    
    const checkDayArray = (dayArray:DayObjects[]) => {
 
      // filter out timeslots that have a length > 0
      const timeslotsWithAvail:any = dayArray.filter(timeslot => {return timeslot.array.length > 0})
    
      return timeslotsWithAvail;
    }
    // save filtered results in a variable for each day
    const sundayResults = checkDayArray(arrayOfDayArrays.day0array);
    setSundayResultsArray(sundayResults);
    const mondayResults = checkDayArray(arrayOfDayArrays.day1array);
    console.log(mondayResults);
    setMondayResultsArray(mondayResults)
    const tuesdayResults = checkDayArray(arrayOfDayArrays.day2array);
    setTuesdayResultsArray(tuesdayResults);
    const wednesdayResults = checkDayArray(arrayOfDayArrays.day3array);
    setWednesdayResultsArray(wednesdayResults);
    const thursdayResults = checkDayArray(arrayOfDayArrays.day4array);
    setThursdayResultsArray(thursdayResults);
    const fridayResults = checkDayArray(arrayOfDayArrays.day5array);
    setFridayResultsArray(fridayResults);
    const saturdayResults = checkDayArray(arrayOfDayArrays.day6array);
    setSaturdayResultsArray(saturdayResults);

    // set state for each day

  }


  const convertTimeslots = (dayResults:DayObjects[]) => {
    // get date 
    const dateObj =  new Date (dayResults[0].array[0].startObj);
    const dateString = dateObj.toLocaleString("default", { timeZone: "EST"})
    // const day = dateObj.getDate();
    // const year = dateObj.getFullYear();
    const monthString = dateObj.toLocaleString('default', { month: 'long' });
    console.log(dayResults[0].array[0].startObj, dateObj, monthString, dateString)
  }


  return(
    <>
      {
        isLoadingMeetingData && isLoadingOverlapData
        ?<p>Is loading meeting data....</p>
        :<div className="overlapResults">
          <Sidebar userNames={userNames} numOfAttendees={numOfAttendees} results={true}/>
          <div className="overlapInfo">
            <h1>{eventName}</h1>

            {/* if not all invitees have completed their availability */}
            {
              userNames && numOfAttendees && userNames!.length !== numOfAttendees!.length
                ?<p>{userNames!.length} of {numOfAttendees!.length} attendees have filled out their availability</p>

                : <>
                  <p>All attendees have filled out their availability</p>
                  <p>Here are the times everyone is available:</p>
                  <ul>
                    <li>
                      <p>Sunday:</p>
                      {
                        sundayResultsArray
                        ? <>
                              <ul>
                                {
                                  sundayResultsArray.map((timeblock) => {
                                    if(timeblock.array.length === numOfAttendees!.length){
                                      return(
                                        <li>
                                          <p>{timeblock.time}:</p>
                                          <ul>
                                          {
                                            timeblock.array.map((users, index) => {
                                                return(
                                                  <li key={index}>{users.user}</li>
                                                )
                                            })
                                          }
                                          </ul>
                                        </li>
                                      )
                                    }
                                  })
                                }
                              </ul>
                          </>
                        : <p>No availability</p>
                      }
                    </li>
                    <li>
                       <p>Monday:</p>
                      {
                        mondayResultsArray
                        ? <>
                              <ul>
                                {
                                  mondayResultsArray.map((timeblock) => {
                                    if(timeblock.array.length === numOfAttendees!.length){
                                      return(
                                        <li>
                                          <p>{timeblock.time}:</p>
                                          <ul>
                                            {
                                              timeblock.array.map((users, index) => {
                                                  return(
                                                    <li key={index}>{users.user}</li>
                                                  )
                                              })
                                            }
                                          </ul>
                                        </li>
                                      )
                                    }
                                  })
                                }
                              </ul>
                          </>
                        : <p>No availability</p>
                      }
                    </li>
                    <li>
                       <p>Tuesday:</p>
                      {
                        tuesdayResultsArray
                        ? <>
                              <ul>
                                {
                                  tuesdayResultsArray.map((timeblock) => {
                                    if(timeblock.array.length === numOfAttendees!.length){
                                      return(
                                        <li>
                                          <p>{timeblock.time}:</p>
                                          <ul>
                                            {
                                              timeblock.array.map((users, index) => {
                                                  return(
                                                    <li key={index}>{users.user}</li>
                                                  )
                                              })
                                            }
                                          </ul>
                                        </li>
                                      )
                                    }
                                  })
                                }
                              </ul>
                          </>
                        : <p>No availability</p>
                      }
                    </li>
                    <li>
                       <p>Wednesday:</p>
                      {
                        wednesdayResultsArray
                        ? <>
                              <ul>
                                {
                                  wednesdayResultsArray.map((timeblock) => {
                                    if(timeblock.array.length === numOfAttendees!.length){
                                      return(
                                        <li>
                                          <p>{timeblock.time}:</p>
                                          <ul>
                                            {
                                              timeblock.array.map((users, index) => {
                                                  return(
                                                    <li key={index}>{users.user}</li>
                                                  )
                                              })
                                            }
                                          </ul>
                                        </li>
                                      )
                                    }
                                  })
                                }
                              </ul>
                          </>
                        : <p>No availability</p>
                      }
                    </li>
                    <li>
                       <p>Thursday:</p>
                      {
                        thursdayResultsArray
                        ? <>
                              <ul>
                                {
                                  thursdayResultsArray.map((timeblock) => {
                                    if(timeblock.array.length === numOfAttendees!.length){
                                      return(
                                        <li>
                                          <p>{timeblock.time}:</p>
                                          <ul>
                                            {
                                              timeblock.array.map((users, index) => {
                                                  return(
                                                    <li key={index}>{users.user}</li>
                                                  )
                                              })
                                            }
                                          </ul>
                                        </li>
                                      )
                                    }
                                  })
                                }
                              </ul>
                          </>
                        : <p>No availability</p>
                      }
                    </li>
                    <li>
                       <p>Friday:</p>
                      {
                        fridayResultsArray
                        ? <>
                              <ul>
                                {
                                  fridayResultsArray.map((timeblock) => {
                                    if(timeblock.array.length === numOfAttendees!.length){
                                      return(
                                        <li>
                                          <p>{timeblock.time}:</p>
                                          <ul>
                                            {
                                              timeblock.array.map((users, index) => {
                                                  return(
                                                    <li key={index}>{users.user}</li>
                                                  )
                                              })
                                            }
                                          </ul>
                                        </li>
                                      )
                                    }
                                  })
                                }
                              </ul>
                          </>
                        : <p>No availability</p>
                      }
                    </li>
                    <li>
                       <p>Saturday:</p>
                      {
                        saturdayResultsArray
                        ? <>
                              <ul>
                                {
                                  saturdayResultsArray.map((timeblock, index) => {
                                    if(timeblock.array.length === numOfAttendees!.length){
                                      return(
                                        <li key={index}>
                                          <p>{timeblock.time}:</p>
                                          <ul>
                                            {
                                              timeblock.array.map((users, index) => {
                                                  return(
                                                    <li key={index}>{users.user}</li>
                                                  )
                                              })
                                            }
                                          </ul>
                                        </li>
                                      )
                                    }
                                  })
                                }
                              </ul>
                          </>
                        : <p>No availability</p>
                      }
                    </li>
                  </ul>
                </>
            }
            
            {/* button will navigate to availability results page */}
            <button className="navToResults" onClick={() => navigate(`/results/${meetingNumID}`)}>See everyone's availability</button>

          </div>
        
        
        
        
        </div>
      }
  
    </>
  )
}


export default Overlap;