const meetDateRoute = require('express').Router()
const { useResolvedPath } = require('react-router-dom');
const { formatWithOptions } = require('util');
const MeetDateModel = require('../models/MeetDateModel');
const UserModel = require('../models/UserModel');
const AvailbilityModel = require('../models/AvailabilityObjectModel');
const mailer = require('../utils/mailer');

// POST route that creates a meeting date
meetDateRoute.route('/add').post(function (req, res) {
  let meetDateModel = new MeetDateModel(req.body);
  meetDateModel.save()
    .then(dateSaved => {
        // for (let i=0; i<req.body.emails.length; i++) {
        //     console.log(req.body.emails[i]);
        //     mailer.sendMail();
        // }
        
        return res.status(200).json({'dateSaved': 'Date in added successfully'});
    })
    .catch(err => {
        return res.status(400).send("unable to save to database");
    });
});

// GET route that gets the meeting object which is found through the :meetingNum parameter
meetDateRoute.route("/availability/:meetingNumber").get(async function (req, res) {
    const meetingNumber = req.params.meetingNumber;
    const data = await MeetDateModel.find({ meetingNumber: meetingNumber }).lean()
    // console.log(data)
    return res.send(data)
})

// POST route that creates a user object when they add their name and availability & updates the meeting object with the user object
meetDateRoute.route("/availability/:meetingNumber").post(async function (req, res){
    const meetingNumber = req.params.meetingNumber
    let user = new UserModel(req.body)
    let userName = user["userName"]
    
    
    for (let i = 0; i < user.availability.length ; i++) {
        
        let availability = user["availability"][i]
        let availID = user["availability"][i]["id"]
        let availabilityObject = new AvailbilityModel({userName: userName, availability: availability})

        if (availID == 0  ) {
            let meeting = await MeetDateModel.updateOne({ meetingNumber: meetingNumber }, {$push: {"availabilityArray.sunday": availabilityObject}})
        } else if (availID == 1) {
            let meeting = await MeetDateModel.updateOne({ meetingNumber: meetingNumber }, {$push: {"availabilityArray.monday": availabilityObject}})
        } else if (availID == 2) {
            let meeting = await MeetDateModel.updateOne({ meetingNumber: meetingNumber }, {$push: {"availabilityArray.tuesday": availabilityObject}})
        } else if (availID == 3) {
            let meeting = await MeetDateModel.updateOne({ meetingNumber: meetingNumber }, {$push: {"availabilityArray.wednesday": availabilityObject}})
        } else if (availID == 4) {
            let meeting = await MeetDateModel.updateOne({ meetingNumber: meetingNumber }, {$push: {"availabilityArray.thursday": availabilityObject}})
        } else if (availID == 5) {
            let meeting = await MeetDateModel.updateOne({ meetingNumber: meetingNumber }, {$push: {"availabilityArray.friday": availabilityObject}})
        } else if (availID == 6) {
            let meeting = await MeetDateModel.updateOne({ meetingNumber: meetingNumber }, {$push: {"availabilityArray.saturday": availabilityObject}})
        } 
        availabilityObject.save()
    }
    let mainMeeting = await MeetDateModel.updateOne({ meetingNumber: meetingNumber }, { $push: { users: user } })
    user.save()
      .then(userSaved => {
        return res.status(200).json({'userSaved': 'User in added successfully'});
          
      })
      .catch(err => {
          return res.status(400).send("unable to save to database");
      })
})

// GET route that gets the meeting object which is found through the :meetingNum parameter but then returns the users availability inside the users array of the meeting object
meetDateRoute.route("/results/:meetingNumber").get(async function (req, res) {
    const meetingNumber = req.params.meetingNumber;
    const data = await MeetDateModel.find({ meetingNumber: meetingNumber }).lean()

    return res.send(data)

})

meetDateRoute.route("/overlapping/:meetingNumber").get( async function (req, res) {
    const meetingNumber = req.params.meetingNumber;
    const data = await MeetDateModel.find({ meetingNumber: meetingNumber }).lean()
    const importantArray = data[0].availabilityArray


    
    const createTimeSlots = () => {

        let timeArrayAmPm = [];
        let amPmTime = "";

        for(let i = 0; i < 48; i++){
            let counter = 0;
            if ( i === 0 ){
                amPmTime = "12:00 am - 12:30 am"
            } else {
                if (i % 2 !== 0) {
                    counter++;
                }
    
            if(i < 24){
                amPmTime =
                i % 2 === 0 ? `${(i - counter) / 2}:00 am` : `${(i - counter) / 2}:30 am`;
            }else{
                amPmTime =
                i % 2 === 0 ? `${(i - counter) / 2}:00 pm` : `${(i - counter) / 2}:30 pm`;
            }
            }
            timeArrayAmPm.push({ time: amPmTime,  array: [] });
            }
            return timeArrayAmPm;
    }

    let day0array = createTimeSlots();
    let day1array = createTimeSlots();
    let day2array = createTimeSlots();
    let day3array = createTimeSlots();
    let day4array = createTimeSlots();
    let day5array = createTimeSlots();
    let day6array = createTimeSlots();

    const addUserToDayArray = (dayArray, event) => {
       
        // get start and end for each event as Date object
        // need to be turned into a date object
        let startObj = new Date(event.availability[0].start);
        let endObj = new Date(event.availability[0].end);
        let start = 
           startObj.getHours() * 2 + 
           (startObj.getMinutes() === 0 ?0 :1);
         let end =
           endObj.getHours() * 2 +
           (endObj.getMinutes() === 0 ? 0 : 1);
         // add user to day1results for the timeblock start and end
         for(let i=start; i < end; i++){
           dayArray[i].array.push({user: event.userName, start: start, end: end})
         }
         console.log(startObj)
         console.log(endObj)
         return dayArray;
      }

    if (importantArray.sunday.length > 0){
    importantArray.sunday.forEach(timeblock => {
        let sundayResults = addUserToDayArray(day0array, timeblock)
        console.log(sundayResults)
    })
    }
    

        // create day arrays and push the time array into the day array
    return res.send(data);
        
})

module.exports = meetDateRoute;

