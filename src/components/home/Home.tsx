import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DayPilot, DayPilotNavigator } from "@daypilot/daypilot-lite-react";

//components
import TimeZone from "../TimeZone/TimeZone";

// styles
import "./Home.css";




// types
type EventName = string;
type TimeSelect = string;
type DateSelected = string | null;
type Email = string[];
type UserTimeZone = string;



type FormData = {
  eventName: EventName;
  length: TimeSelect;
  date: DateSelected;
  timezone: UserTimeZone;
  emails: Email;
}


const Home = () => {
  // initialize useForm
  const { register, handleSubmit, setValue, formState: { errors}, reset } = useForm<FormData>();

  // initialize state 
  // date selected by user 
  const [ chosenDay, setChosenDay ] = useState<DateSelected>();
  // timezone
  const [ timezone, setTimezone ] = useState<string>();
  // if not date selected
  const [ noDate, setNoDate ] = useState<Boolean>(false);


  // get timezone of user
  useEffect(() => {
    const eventTimeZone = TimeZone();
    setTimezone(eventTimeZone);
    
  }, [])
  

  // when user clicks generate link button to submit form
  const onSubmit = handleSubmit(data => {
    console.log(data);
    if (chosenDay){
      // axios POST
      axios.post("http://localhost:4000/dates/add", data)
      .then(res => console.log(res.data))
      .catch(error => console.log(error));
      // reset form fields
      reset();
      setChosenDay(new DayPilot.Date().value);
      setNoDate(false);
    }else {
      setNoDate(true);
    }
  });

  return(
    <div className="home wrapper">
      <div className="homeIntro">
        <h1>Schedule a New Event</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam deserunt enim sint architecto! Aliquid iste accusantium possimus quod.</p>
      </div>


      <div className="homeInput">
       <form onSubmit={ onSubmit }>
         <section className="formEventDetails">

        
          <label htmlFor="eventName"> Name of Event </label>
          <input 
            type="text" 
            aria-invalid={errors.eventName ?"true" :"false"}
            {...register("eventName", {required: true })} />
          {errors.eventName && (
            <span role="alert">
              Event name is required
            </span> 
          )}

          <label htmlFor="length">How long will your event be?</label>
          <select 
            {...register("length", {required: true })}
            id="timeSelect">
              <option value="">Select</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1 hour 30 minutes</option>
              <option value="120">2 hours</option>
          </select>
          {errors.length && (
            <span role="alert">
              Length is required
            </span> 
          )}

           <p>Your time zone is: {timezone}</p>

          <label htmlFor="users">Invite participants</label>
          <input 
            type="email" 
            multiple
            {...register("emails", {required: true })}/>
          {errors.emails && (
            <span role="alert">
              Email address is required
            </span> 
          )}
       </section>
      <section className="formEventCalendar">
        <p>Choose Date(s)</p>
       
        <DayPilotNavigator 
          selectMode={"day"}
          startDate={new DayPilot.Date().value}
          onTimeRangeSelected={(args:any) => {
            console.log(
              `You clicked ${args.day}; start=${args.start}; end=${args.end}`
              );
              setChosenDay(args.day.value);
          }}
        />
        {
          noDate 
          ?<p>Please select a date</p>
          :null
        }

        <button
          type="submit"
          onClick={() => {
            setValue("date", chosenDay ?chosenDay :null);
            setValue("timezone", timezone ?timezone :"");
          }}>
          Generate Link
        </button>
        </section>
        
       </form>
       
       
      </div>
    </div>
  )
};

export default Home;