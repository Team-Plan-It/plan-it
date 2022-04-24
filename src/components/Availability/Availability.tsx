import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useLocation } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DayPilot, DayPilotCalendar } from "@daypilot/daypilot-lite-react";

// components
import TimeZone from "../TimeZone/TimeZone";

//styles
import "./Availability.css";

//types
type UserName = string;
type AvailabilityArray = any[];
type Timezone = string;



type FormData = {
  userName: UserName;
  availability: AvailabilityArray;
  timezone: Timezone;
}



const Availability = (props: any) => {
  //Params passsed throught naviagtion
  // on page load, get meeting info from data
  const availabilityNavigation: any = useLocation();
  const meetingNumID = availabilityNavigation.state['meetingNumID'];
  const eventName = availabilityNavigation.state['eventName'];
  const eventDate = availabilityNavigation.state['eventDate'];

  // initialize useForm
  const { register, handleSubmit, setValue, formState: { errors}, reset } = useForm<FormData>();

  // initialize state
  // all availabilites selected by user
  const [ eventArray, setEventArray ] = useState<AvailabilityArray>([]);
  // timezone
  const [ timezone, setTimezone ] = useState<string>();


  // get timezone of user
  useEffect(() => {
    const eventTimeZone = TimeZone();
    setTimezone(eventTimeZone);
  }, [])

  // function to put time in hours/minutes in am/pm format
  const timeFormatCalc = (time:any) => {
    const hours = time.getHours();
    const hour = (hours % 12) || 12;
    let pm = false;
    if(hours > 11){
      pm = true;
    }
    const minutes = time.getMinutes() <= 9 ? "0" + time.getMinutes() : time.getMinutes();

    return `${hour}:${minutes} ${pm ?"pm" :"am"}`
  }

  // creates an event when the user clicks on a time block
  const handleTimeSelected = (args:any) => {

    console.log(args);
    // the two parameters of the event time block in string format
    // eg. "2022-04-05T09:00:00"
    const start = args.start;
    const end = args.end;
    
    // get day of week number
    const dayOfWeek = start.getDayOfWeek();

    // create text with start and end time of selection
    const startText = timeFormatCalc(start);
    const endText = timeFormatCalc(end);
       

    const dp = args.control;
    dp.clearSelection();

    dp.events.add(
      new DayPilot.Event({
        start: start,
        end: end,
        id: dayOfWeek,
        text: `Avail: ${startText} - ${endText}`,
      })
    );
    // dp.events.list contains all of the events that have been created
    setEventArray(dp.events.list);
  };


  // deletes the event when the user clicks on it
  const handleEventClicked = (args: any) => {
    console.log(args.e, args.e.start, args.e.end, args.e.text);

    const dp = args.control;
   
    dp.events.remove(args.e);
    console.log(dp.events);
    setEventArray(dp.events.list);
  }





  // when user submits availability form
  const onSubmit = handleSubmit<FormData>(data => {
    console.log(data);

    // axios POST
    axios.post(`http://localhost:4000/dates/availability/${meetingNumID}`, data)
    .then(res => console.log('post successful'))
    .catch(error => console.log(error));

    //reset form fields
    reset();
  })

  return(
    <div className="availability wrapper">
      <div className="availabilityIntro">
        {/* get meeting name from database */}
        <h1>{eventName}</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam tempora similique corporis nesciunt quo numquam!</p>
      </div>
      <form onSubmit={ onSubmit }>
        <section className="availabilityFormName">
          <label htmlFor="userName">Name</label>
          <input 
            type="text" 
            aria-invalid={errors.userName ?"true" :"false"}
            {...register("userName", {required: true })} 
          />
          {errors.userName && (
            <span role="alert">
              Please enter your name
            </span> 
          )}
        </section>

        <section className="availabilityFormCalendar">
          <p>Choose availability</p>
          <p>Time shown in local timezone: {timezone}</p>
          <DayPilotCalendar 
            viewType={"Week"}
            headerDateFormat={"d MMMM yyyy"}
            startDate={eventDate}
            onTimeRangeSelected={handleTimeSelected}
            onEventClick={handleEventClicked}
          />
          <button
            type="submit"
            onClick={() => {
              setValue("availability", eventArray ?eventArray :[])
              setValue("timezone", timezone ?timezone :"")
            }}> 
            Add Availability
          </button>
        </section>
      </form>

    
    </div>
  )
}

export default Availability;