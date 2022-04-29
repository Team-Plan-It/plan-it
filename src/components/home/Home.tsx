import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import mailer from "../../utils/mailer";
import axios from "axios";
import { ReactMultiEmail, isEmail } from 'react-multi-email';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DayPilot, DayPilotNavigator } from "@daypilot/daypilot-lite-react";

//components
import Sidebar from "../Sidebar/Sidebar";

//assets
import AirplaneIcon from "../../assets/paperAirplane.js";
import AvailabilityIcon from "../../assets/availability.js";
import MeetingIcon from "../../assets/meetingDetails.js";
import OverlapIcon from "../../assets/overlap.js";

// styles
import 'react-multi-email/style.css';
import "../../dayPilotNavigator.css";
import "./Home.css";


// types
type EventName = string;
type TimeSelect = string;
type DateSelected = string | null;
type UserTimeZone = string;
type Email = string;
type meetingNumber = string;

type FormValues = {
  NameOfEvent: string; 
}



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
  const { register, handleSubmit, setValue, formState: { errors}, reset, control } = useForm<FormData>();


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
  // welcome modal
  const [ welcomeModalIsOpen, setWelcomeModalIsOpen ] = useState<boolean>(false);
  // schedule meeting modal open or closed
  const [ schedModalIsOpen, setSchedModalIsOpen ] = useState<boolean>(false);
  // success modal open or closed
  const [ successModalIsOpen, setSuccessModalIsOpen ] = useState<boolean>(false);
  // the meeting number
  const [ meetingNumID, setMeetingNumID ] = useState<string>();
  



  // get timezone of user
  useEffect(() => {
    const eventTimeZone = new Date().toLocaleTimeString(undefined, {timeZoneName: "short"}).split(" ")[2];
    // console.log(eventTimeZone)
    setTimezone(eventTimeZone);
  
  }, [])

  // open welocme modal
  useEffect(() => {
    setWelcomeModalIsOpen(true)
  }, [])


  //  open scheduling modal to schedule meeting
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
    // use event id as params for navigate/:id
      if(meetingNumID){
        //do axios get call here to get meeting info also with the meeting number
        axios.get(`http://localhost:4000/dates/availability/${meetingNumID}`)
        .then(data => {
          console.log(data['data'][0]['date'])
        //  Passing the meeting number through the URL to the Availability page
          navigate(`/availability/${meetingNumID}`, { 
           state: {
             meetingNumID: meetingNumID,
             eventName: data['data'][0]['eventName'],
             date: data['data'][0]['date'],
             coordTimeZone: timezone           }
          });
        })
      }
  }
  // function that gets ranodm number for meeting
  // Might change this to be more on the backend
  const getRndInteger = (min = 1000, max = 9999) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  

  // when user clicks generate link button to submit form
  const onSubmit = handleSubmit(data => {
    
    
    // user needs to have selected a date and entered an email addresss in order to run the axios POST call
    if (chosenDay && !noEmails){
      // generate meeting number
      let rndNum = getRndInteger(1000,9999);
      let rndNumString = rndNum.toString();
      data.meetingNumber = rndNumString;
      setMeetingNumID(rndNumString);
      let firstEmail = data.emails[0];
      console.log(firstEmail);
     //  mailer.sendMail(firstEmail)

      // axios POST request that adds the meeting to the database
      axios.post("http://localhost:4000/dates/add", data)
      .then(res => {
        // console.log(data)
        console.log('Successfully added meeting to database')
      })
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
    <div className="home">
      <Sidebar />
      <div className="homeIntro">
        <Modal
          className={"welcomeModal"}
          overlayClassName={"welcomeOverlay"}
          isOpen={welcomeModalIsOpen}
          shouldCloseOnOverlayClick={false}
          onRequestClose={openSchedulingModal}
          contentLabel="Welcome page"
          style={{content: {WebkitOverflowScrolling: 'touch',}}}
        >
          <h1>Welcome to Plan-it, ......</h1>
          <h2>How it works</h2>
          <ul>
            <li>
              <h3>Meeting <span>Details</span></h3>
              <div className="imageContainer">
                <MeetingIcon />
               
              </div>
              <p>Set the calendar parameters to your liking.</p>
            </li>
            <li>
              <h3>Add <span>Availability</span></h3>
              <div className="imageContainer">
                <AvailabilityIcon />
               
              </div>
              <p>Everyone is emailed a link to add their availability.</p>
            </li>
            <li>
              <h3>View <span>Overlapped Times</span></h3>
              <div className="imageContainer">
                <OverlapIcon />

              </div>
              <p>View overlapping times amongst your team.</p>
            </li>
          </ul>
  
          <button className="scheduleModalOpen" onClick={openSchedulingModal}>Get Started!</button>
        </Modal>
      </div>

      {/* schedule modal */}
      <div className="homeScheduling">
        <Modal 
          isOpen={schedModalIsOpen}
          onRequestClose={closeSchedulingModal}
          shouldCloseOnOverlayClick={false}
          contentLabel="Meeting Scheduling"
          className={"scheduleModal"}
          overlayClassName={"scheduleOverlay"}
        >
          <h1>Meeting <span>Details</span></h1>
          <div className="homeInput">
            <form onSubmit={ onSubmit }>
              <section className="formEventDetails">
                {/* input for name of meeting */}
                <label htmlFor="eventName"> Name of event </label>
                <input 
                  placeholder= {"Enter name here..." }
                  className={errors.eventName ?"error" :"success"}
                  aria-label="Enter name here"
                  aria-invalid={errors.eventName ?"true" :"false"}
                  {...register("eventName", { required: "Name is required"})}
                  />
                  {/* error message if no name entered */}
                  <ErrorMessage errors={errors} name="eventName" as="p" className="errorMessage"/>
            
                
                
                {/* input for length of meeting */}
                <label htmlFor="length">How long will your event be?</label>
                <select 
                  className={errors.length ?"error" :"success"}
                  aria-invalid={errors.length ?"true" :"false"}
                  {...register("length", {required: "Length is required" })}
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
                <ErrorMessage errors={errors} name="length" as="p" className="errorMessage"/>


                {/* input for email addressess */}
                <label htmlFor="users">Invite participants</label>
                <ReactMultiEmail 
                  placeholder="Add an Email"
                  className={noEmails ?"error" :"success"}
                  emails={inputtedEmails}
                  onChange={(_emails:string[]) => {setInputtedEmails(_emails);
                  setNoEmails(false)}}
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
                  ?<p className="errorMessage">Please enter an email address</p>
                  :null
                }   


                {/* displays current time zone of user */}
                <p className="timezoneMessage">Your time shows as <span>{timezone}</span>. This means everyone's times will be converted to {timezone} for you.</p>
            </section>

            <section className="formEventCalendar">
              <p>Choose up to 7 days</p>
      
              <DayPilotNavigator 
                selectMode={"week"}
                startDate={new DayPilot.Date().value}
                onTimeRangeSelected={(args:any) => {
                  console.log(
                    `You selected ${args.day}`
                    );
                    setChosenDay(args.day.value);
                }}
              />

              {/* error message if no date selected */}
              {
                noDate 
                ?<p className="errorMessage">Please select a date</p>
                :null
              }

              {/*  button to submit form */}
              <button
                type="submit"
                className="meetingSubmitBtn"
                onClick={() => {
                  console.log(inputtedEmails.length)
                  if(inputtedEmails.length > 0 && chosenDay){
                    setNoEmails(false);
                    setNoDate(false);
                    setValue("date", chosenDay ?chosenDay :null);
                    setValue("timezone", timezone ?timezone :"");
                    setValue("emails", inputtedEmails ?inputtedEmails :[])
                  }else if (inputtedEmails.length === 0 && !chosenDay){
                    setNoEmails(true);
                    setNoDate(true);
                  }else if (!chosenDay){
                    setNoDate(true);
                  }else if (inputtedEmails.length === 0 && chosenDay){
                     setNoEmails(true);
                  }
          
                }}>
                Generate Link
              </button>
              </section>       
            </form>
          </div>

        </Modal>

      </div>
      <div className="homeSuccess">
        {/* success modal */}
        <Modal
          isOpen={successModalIsOpen}
          onRequestClose={closeSuccessModal}
          shouldCloseOnOverlayClick={false}
          contentLabel="Link was sent successfully"
          className={"successModal"}
          overlayClassName={"successOverlay"}
        >
          <div className="successMessages">
            <h2>Link was <span>Successfully Sent</span></h2>
            <div className="imageContainer">
                <AirplaneIcon />
            </div>
            <button onClick={closeSuccessModal}>Add availability</button>
          </div>
        </Modal>

      </div>
    </div>
  )
};

export default Home;