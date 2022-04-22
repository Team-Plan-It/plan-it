import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import mailer from "../../utils/mailer";
import axios from "axios";
import { ReactMultiEmail, isEmail } from 'react-multi-email';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DayPilot, DayPilotNavigator } from "@daypilot/daypilot-lite-react";

//components
import TimeZone from "../TimeZone/TimeZone";

// styles
import 'react-multi-email/style.css';
import "./Home.css";


// types
type EventName = string;
type TimeSelect = string;
type DateSelected = string | null;
type UserTimeZone = string;
type Email = string;
type meetingNumber = string;



type FormData = {
  eventName: EventName;
  length: TimeSelect;
  date: DateSelected;
  timezone: UserTimeZone;
  emails: Email[];
  meetingNumber: meetingNumber;
}


const Home:React.FC = () => {
  // initialize useForm
  const { register, handleSubmit, setValue, formState: { errors}, reset } = useForm<FormData>();

  let navigate = useNavigate();

  Modal.setAppElement('#root');

  // initialize state 
  // date selected by user 
  const [ chosenDay, setChosenDay ] = useState<DateSelected>();
  // timezone
  const [ timezone, setTimezone ] = useState<string>();
  // if not date selected
  const [ noDate, setNoDate ] = useState<boolean>(false);
  // emails
  const [ inputtedEmails, setInputtedEmails ] = useState<string[]>([]);
  // if no emails entered
  const [ noEmails, setNoEmails ] = useState<boolean>(false);
  // schedule meeting modal open or closed
  const [ schedModalIsOpen, setSchedModalIsOpen ] = useState<boolean>(false);
  // success modal open or closed
  const [ successModalIsOpen, setSuccessModalIsOpen ] = useState<boolean>(false);
  // the meeting number
  const [ meetingNumID, setMeetingNumID ] = useState<string>();
  

  // get timezone of user
  useEffect(() => {
    const eventTimeZone = TimeZone();
    setTimezone(eventTimeZone);
    
  }, [])


  // open modal to schedule meeting
  const openSchedulingModal = () => {
    setSchedModalIsOpen(true);
  }

  // when scheduling modal is closed
  const closeSchedulingModal = () => {
    setSchedModalIsOpen(false);
  }


  // close success module and navigate to availability page
  const closeSuccessModal = () => {
    setSuccessModalIsOpen(false);
    
    // get meeting id from state
    //   // use event id as params for navigate/:id
    //   // make changes to Route in App.tsx to match
      if(meetingNumID){
        //do axios get call here to get meeting info also with that meeting number
        axios.get(`http://localhost:4000/dates/availability/${meetingNumID}`)
        .then(data => {
          console.log(data['data'][0]['eventName'])
        //  Passing the meeting number through the URL to the Availability page
          navigate(`/availability/${meetingNumID}`, { 
           state: {
             meetingNumID: meetingNumID,
             eventName: data['data'][0]['eventName'],
             date: data['data'][0]['date'],
           }
          });
        })
      }
  }
  // function that gets ranodm number for meeting
  // Might change this to be more on the backend
  function getRndInteger(min = 1000, max = 9999) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  

  // when user clicks generate link button to submit form
  const onSubmit = handleSubmit(data => {
     let rndNum = getRndInteger(1000,9999);
     let rndNumString = rndNum.toString();
     data.meetingNumber = rndNumString;
     setMeetingNumID(rndNumString);
     let firstEmail = data.emails[0];
     console.log(firstEmail);
    //  mailer.sendMail(firstEmail)
     
    
    // user needs to have selected a date and entered an email addresss in order to run the axios call
    if (chosenDay && !noEmails){
      // axios POST request that adds the meeting to the database
      axios.post("http://localhost:4000/dates/add", data)
      .then(res => 
        console.log(data)
        )
      .catch(error => console.log(error));
      // reset form fields
      reset();
      setChosenDay(new DayPilot.Date().value);
      setNoDate(false);
      setSchedModalIsOpen(false); // closes scheduling modal
      setSuccessModalIsOpen(true); // opens success modal
    }else if(!chosenDay){
      setNoDate(true);
    }else if (noEmails){
      setNoEmails(true);
    }
  });
  

  return(
    <div className="home wrapper">
      <div className="homeIntro">
        <h1>Schedule a New Event</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam deserunt enim sint architecto! Aliquid iste accusantium possimus quod.</p>
      </div>

      <button className="scheduleModalOpen" onClick={openSchedulingModal}>Schedule a meeting</button>

      <Modal 
        isOpen={schedModalIsOpen}
        onRequestClose={closeSchedulingModal}
        contentLabel="Meeting Scheduling"
      >
        <div className="homeInput">
        <form onSubmit={ onSubmit }>
          <section className="formEventDetails">
            {/* input for name of meeting */}
            <label htmlFor="eventName"> Name of Event </label>
            <input 
              type="text" 
              aria-invalid={errors.eventName ?"true" :"false"}
              {...register("eventName", {required: true })} />
              {/* error message if no name entered */}
            {errors.eventName && (
              <span role="alert">
                Event name is required
              </span> 
            )}
            
            {/* input for length of meeting */}
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
            {/* error message if no time selected */}
            {errors.length && (
              <span role="alert">
                Length is required
              </span> 
            )}

            {/* displays current time zone of user */}
            <p>Your time zone is: {timezone}</p>

            {/* input for email addressess */}
            <label htmlFor="users">Invite participants</label>
            <ReactMultiEmail 
              placeholder="Email address"
              emails={inputtedEmails}
              onChange={(_emails:string[]) => {setInputtedEmails(_emails)}}
              validateEmail={ email => { return isEmail(email)}} //return Boolean
              getLabel={(
                email: string,
                index: number,
                removeEmail: (index: number) => void, 
              ) => {
                return(
                  <div data-tag key={index}>
                    {email}
                    <span data-tag-handle onClick={() => removeEmail(index)}>
                      x
                    </span>
                  </div>
                )
              }}
            />
            {/* error message if no emails entered */}
            {
              noEmails
              ?<p>Please enter an email address</p>
              :null
            }   
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

          {/* error message if no date selected */}
          {
            noDate 
            ?<p>Please select a date</p>
            :null
          }

          {/*  button to submit form */}
          <button
            type="submit"
            onClick={() => {
              if(inputtedEmails.length > 0){
                setNoEmails(false)
                setValue("date", chosenDay ?chosenDay :null);
                setValue("timezone", timezone ?timezone :"");
                setValue("emails", inputtedEmails ?inputtedEmails :[])
              }else {
                setNoEmails(true);
              }
      
            }}>
            Generate Link
          </button>
          </section>       
        </form>
        </div>

      </Modal>

      {/* success modal */}
      <Modal
        isOpen={successModalIsOpen}
        onRequestClose={closeSuccessModal}
        contentLabel="Link was sent successfully"
      >
        <h2>Success!</h2>
        <p>Your link was sent.</p>
        <button onClick={closeSuccessModal}>Add your availability</button>
      </Modal>
    </div>
  )
};

export default Home;