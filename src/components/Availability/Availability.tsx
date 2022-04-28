import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Modal from "react-modal";
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
  const coordTimeZone = availabilityNavigation.state['coordTimeZone'];

  // initialize useForm
  const { register, handleSubmit, setValue, formState: { errors}, reset } = useForm<FormData>();

   Modal.setAppElement('#root');

  // initialize state
  // all availabilites selected by user
  const [ eventArray, setEventArray ] = useState<AvailabilityArray>([]);
  // timezone of invitee/person using this page
  const [ timezone, setTimezone ] = useState<string>();
  // availability modal open
  const [ availabilityModalIsOpen, setAvailabilityModalIsOpen ] = useState<boolean>(false);


  // get timezone of user
  useEffect(() => {
    const eventTimeZone = new Date().toLocaleTimeString(undefined, {timeZoneName: "short"}).split(" ")[2];
    setTimezone(eventTimeZone);
  }, [])

  // open modal
  useEffect(() => {
    setAvailabilityModalIsOpen(true);
  })

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
    console.log('event created');
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
    console.log('event deleted');

    const dp = args.control;
   
    dp.events.remove(args.e);
    console.log(dp.events);
    setEventArray(dp.events.list);
  }





  // makes axios call when user submits availability form
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
     
        <Modal 
          className={"availabilityModal"}
          overlayClassName={"availabilityOverlay"}
          isOpen={availabilityModalIsOpen}
          onRequestClose={() => setAvailabilityModalIsOpen(false)}
          contentLabel="Availability page"
          style={{content: {WebkitOverflowScrolling: 'touch',}}}
          >
          
          <h1>Add <span className="text">Availability</span></h1>
          {/* get meeting name from database */}
          <h2>{eventName}</h2>
          
          <form onSubmit={ onSubmit }>
           
              <label htmlFor="userName">Name</label>
              <input 
                type="text" 
                className={errors.userName ?"error" :"success"}
                placeholder={"Input text"}
                aria-label="Enter name here"
                aria-invalid={errors.userName ?"true" :"false"}
                {...register("userName", {required: "Name is required" })} 
              />
              {/* error message if no name entered */}
              <ErrorMessage errors={errors} name="userName" as="p" className="errorMessage"/>
          

           
              <p>Please add your availability</p>
              <p>Click and drag to add your availability. Please note that you are inputting your availability in your local time <span className="text">{timezone}</span> and it will be converted to the coordinator's time zone <span className="text">{coordTimeZone}</span>.</p>

              <DayPilotCalendar 
                viewType={"Week"}
                headerDateFormat={"d MMMM yyyy"}
                startDate={eventDate}
                onTimeRangeSelected={handleTimeSelected}
                onEventClick={handleEventClicked}
                durationBarVisible = {false}
              />
              <button
                type="submit"
                className="availabilitySubmitBtn"
                onClick={() => {
                  setValue("availability", eventArray ?eventArray :[])
                  setValue("timezone", timezone ?timezone :"")
                }}> 
                Add Availability
              </button>
           
          </form>

        </Modal>

    
    </div>
  )
}

export default Availability;