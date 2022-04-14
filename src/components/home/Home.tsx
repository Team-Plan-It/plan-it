import React, { useState } from "react";
import { useForm } from "react-hook-form";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";

// styles
import "./Home.css";

//components


type EventName = string;
type TimeSelect = number;
type DateSelected = string;
type Email = string;

type FormData = {
  eventName: EventName;
  length: TimeSelect;
  date: DateSelected;
  users: Email;
}
const Home = () => {
  
  const { register, handleSubmit, setValue, watch, formState: { errors}, reset } = useForm<FormData>();

  const [ chosenDay, setChosenDay ] = useState<DateSelected>(new DayPilot.Date())

  const onSubmit = handleSubmit(data => {
    console.log(data);
    reset();
  });

  return(
    <div className="home">
      <div className="homeIntro">
        <h1>Schedule a New Event</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam deserunt enim sint architecto! Aliquid iste accusantium possimus quod.</p>
      </div>
      <div className="homeInput">
       <form onSubmit={ onSubmit }>
        <label htmlFor="eventName"> Name of Event </label>
        <input 
          type="text" 
          {...register("eventName", {required: true })} />
        {errors.eventName && "Event name is required"}

        <label htmlFor="length">How long will your event be?</label>
          <select 
            {...register("length")}
            id="timeSelect">
              <option value="">Select</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1 hour 30 minutes</option>
              <option value="120">2 hours</option>
          </select>




        <button
          type="submit"
          onClick={() => {
            // setValue("eventName")
            setValue("date", chosenDay)
          }}>
          Generate Link
        </button>
       </form>
       
      <div className="homeCalendar">
        <p>Choose Date(s)</p>
        <DayPilotNavigator 
          selectMode={"day"}
          onTimeRangeSelected={(args:any) => {
            console.log(
              `You clicked ${args.day}; start=${args.start}; end=${args.end}`
              );
              setChosenDay(args.day.value);
            }}
            />
        </div>
       
      </div>


    </div>
  )
};

export default Home;