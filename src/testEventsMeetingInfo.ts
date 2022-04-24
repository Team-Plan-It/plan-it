// each user object in the events array has a user name and an array of dates
// the array of dates contains arrays with a start time and end time for each time block


 

type UserInfo = {
  userName: string;
  timeZone: string;
  dateArray: string[];
  availability: {
    start: string;
    end:string;
    id: number;
    text: string;
  }[]
} 

type MeetingData = {
  eventName: string;
  length: string;
  date: string;
  timeZone: string;
  emails: string[];
  meetingNumber: string;
  users: UserInfo[];
}


  const meetingData:MeetingData = {
    eventName: "Team meeting",
    length: "30",
    date: "2022-05-09T00:00:00",
    timeZone: "GMT-0400 (Eastern Daylight Saving Time)",
    emails: ["me@email.com", "you@email.com"],
    meetingNumber: "5336",
    users:[
      {
      userName: "Thor",
      timeZone: "GMT-0400 (Eastern Daylight Saving Time)",
      dateArray: ["2022-05-09", "2022-05-10", "2022-05-11", "2022-05-12", "2022-05-13"],
      availability:[
        {
          start:"2022-05-09T09:00:00",
          end:"2022-05-09T14:00:00",
          id: 1,
          text: "Available 9:00 - 2:00"
        },
        {
          start: "2022-05-10T11:00:00",
          end: "2022-05-10T16:00:00",
          id: 2,
          text: "Available 11:00 - 4:00"
        },
        {
          start: "2022-05-11T09:00:00",
          end: "2022-05-11T12:00:00",
          id: 3,
          text: "Available 9:00 - 12:00"
        },
        {
          start: "2022-05-12T12:00:00",
          end: "2022-05-12T14:00:00",
          id: 4,
          text: "Available 12:00 - 2:00"
        },
        {
          start: "2022-05-13T09:00:00",
          end: "2022-05-13T14:00:00",
          id: 5,
          text: "Available 9:00 - 2:00"
        },
      ]
    },
     {
      userName: "Loki",
      timeZone: "GMT-0400 (Eastern Daylight Saving Time)",
      dateArray: ["2022-05-09", "2022-05-10", "2022-05-11", "2022-05-12", "2022-05-13"],
      availability:[
        {
          start:"2022-05-09T12:00:00",
          end:"2022-05-09T13:00:00",
          id: 1,
          text: "Available 12:00 - 1:00"
        },
        {
          start: "2022-05-10T10:00:00",
          end: "2022-05-10T17:00:00",
          id: 2,
          text: "Available 10:00 - 5:00"
        },
        {
          start: "2022-05-11T12:00:00",
          end: "2022-05-11T14:00:00",
          id: 3,
          text: "Available 12:00 - 2:00"
        },
        {
          start: "2022-05-12T11:00:00",
          end: "2022-05-12T17:00:00",
          id: 4,
          text: "Available 11:00 - 5:00"
        },
        {
          start: "2022-05-13T12:00:00",
          end: "2022-05-13T17:00:00",
          id: 5,
          text: "Available 12:00 - 5:00"
        },
      ]
    },
    {
      userName: "Gamora",
      timeZone: "GMT-0400 (Eastern Daylight Saving Time)",
      dateArray: ["2022-05-09", "2022-05-10", "2022-05-11", "2022-05-12", "2022-05-13"],
      availability:[
        {
          start:"2022-05-09T10:00:00",
          end:"2022-05-09T12:00:00",
          id: 1,
          text: "Available 10:00 - 12:00"
        },
        {
          start: "2022-05-10T13:00:00",
          end: "2022-05-10T17:00:00",
          id: 2,
          text: "Available 1:00 - 5:00"
        },
        {
          start: "2022-05-11T12:00:00",
          end: "2022-05-11T14:00:00",
          id: 3,
          text: "Available 12:00 - 2:00"
        },
        {
          start: "2022-05-12T11:00:00",
          end: "2022-05-12T15:00:00",
          id: 4,
          text: "Available 11:00 - 3:00"
        },
        {
          start: "2022-05-13T10:00:00",
          end: "2022-05-13T12:00:00",
          id: 5,
          text: "Available 10:00 - 12:00"
        },
      ]
    },
    {
      userName: "Natasha",
      timeZone: "GMT-0400 (Eastern Daylight Saving Time)",
      dateArray: ["2022-05-09", "2022-05-10", "2022-05-11", "2022-05-12", "2022-05-13"],
      availability:[
        {
          start: "2022-05-09T09:00:00",
          end:"2022-05-09T12:00:00",
          id: 1,
          text: "Available 10:00 - 12:00"
        },
        {
          start:"2022-05-09T14:00:00",
          end:"2022-05-09T17:00:00",
          id: 1,
          text: "Available 2:00 - 5:00"
        },
        {
          start: "2022-05-10T10:00:00",
          end: "2022-05-10T13:00:00",
          id: 2,
          text: "Available 10:00 - 1:00"
        },
        {
          start: "2022-05-11T09:00:00",
          end: "2022-05-11T11:00:00",
          id: 3,
          text: "Available 9:00 - 11:00"
        },
        {
          start: "2022-05-12T11:00:00",
          end: "2022-05-12T17:00:00",
          id: 4,
          text: "Available 11:00 - 5:00"
        },
        {
          start: "2022-05-13T09:00:00",
          end: "2022-05-13T12:00:00",
          id: 5,
          text: "Available 10:00 - 12:00"
        },
      ]
    }],   
  }


    // availability: [
     

    //   {
    //     user: "TChalla",
    //     dates: [
    //       ["2022-05-09T10:00:00", "2022-05-09T13:00:00"],
    //       ["2022-05-10T10:00:00", "2022-05-10T16:00:00"],
    //       ["2022-05-11T11:00:00", "2022-05-11T17:00:00"],
    //       ["2022-05-12T09:00:00", "2022-05-12T16:00:00"],
    //       ["2022-05-13T11:00:00", "2022-05-13T16:00:00"],
    //     ],
    //   },
    //   {
    //     user: "Hawkeye",
    //     dates: [
    //       ["2022-05-09T12:00:00", "2022-05-09T17:00:00"],
    //       ["2022-05-10T09:00:00", "2022-05-10T11:00:00"],
    //       ["2022-05-11T11:00:00", "2022-05-11T17:00:00"],
    //       ["2022-05-12T09:00:00", "2022-05-12T14:00:00"],
    //       ["2022-05-13T11:00:00", "2022-05-13T15:00:00"],
    //     ],
    //   },
    // ];
  // }
    
    
    export default meetingData;