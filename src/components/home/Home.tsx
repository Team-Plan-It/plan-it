import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DayPilot, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
//components

// styles
import "./Home.css";



// types
type EventName = string;
type TimeSelect = string;
type DateSelected = string;
type Email = string;
type TimeZone = string;


type FormData = {
  eventName: EventName;
  length: TimeSelect;
  date: DateSelected;
  timezone: TimeZone;
  users: Email;
}


const Home = () => {
  // initialize useForm
  const { register, handleSubmit, setValue, formState: { errors}, reset } = useForm<FormData>();

  // initialize state - date selected by user 
  const [ chosenDay, setChosenDay ] = useState<DateSelected>(new DayPilot.Date().value)


  const getTimezone:string = (new DayPilot.Date().toDateLocal().toString());
  const extractTimezone:RegExpExecArray | null = /(GMT).*$/.exec(getTimezone);
  const timezone:string = extractTimezone![0];
  console.log(getTimezone, timezone)

  // when user clicks generate link button to submit form
  const onSubmit = handleSubmit(data => {
    console.log(data);
    // axios POST
    axios.post("", data)
    .then(res => console.log(res.data))
    .catch(error => console.log(error));
    // reset form fields
    reset();
    setChosenDay(new DayPilot.Date().value);
  });

  return(
    <div className="home">
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
            {...register("users", {required: true })}/>
          {errors.users && (
            <span role="alert">
              Email address is required
            </span> 
          )}
       </section>
      <section className="formEventCalendar">
        <p>Choose Date(s)</p>
       
        <DayPilotNavigator 
          selectMode={"day"}
          startDate={chosenDay}
          onTimeRangeSelected={(args:any) => {
            console.log(
              `You clicked ${args.day}; start=${args.start}; end=${args.end}`
              );
              setChosenDay(args.day.value);
            }}
            />
        <button
          type="submit"
          onClick={() => {
            setValue("date", chosenDay);
            setValue("timezone", timezone);
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