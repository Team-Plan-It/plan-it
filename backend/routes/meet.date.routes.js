const meetDateRoute = require('express').Router()
const { useResolvedPath } = require('react-router-dom');
const MeetDateModel = require('../models/MeetDateModel');
const UserModel = require('../models/UserModel');
const mailer = require('../utils/mailer');

// POST route that creates a meeting date
meetDateRoute.route('/add').post(function (req, res) {
  let meetDateModel = new MeetDateModel(req.body);
  let weekArray = [[],[],[],[],[],[],[]];
  meetDateModel.dateArray = weekArray;
  meetDateModel.save()

    .then(dateSaved => {
        // mailer.sendMail();
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
    let meeting = await MeetDateModel.findOne({ meetingNumber: meetingNumber })
    let user = new UserModel(req.body)
    for (let i = 0; i < meeting.dateArray.length; i++) {
        meeting.dateArray[i].push(user.availability[i])
        // meeting.updateOne({ meetingNumber: meetingNumber }, { $push: {dateArray: user.availability[i]} })

        
    }
    meeting.save()
    console.log("meeting.dataArray", meeting.dateArray)
    // meeting.save()
    
    // let mainMeeting = await MeetDateModel.updateOne({ meetingNumber: meetingNumber }, { $push: { users: user } })
    // for each object in the user availability array depening on the id add it to dateArray[id]
    // but insert the data in this format {usernaame:xxxxx, availability:{}}
    
    // const data = await MeetDateModel.find({ meetingNumber: meetingNumber }).lean()
    // const usersArray = data[0]['users']
    // const mainUser = data[0]['users'][0]
    // const foundUser = await UserModel.findById(mainUser)
    // // const userAvailabilityArray = foundUser['availability']
    // // for each object[id] check if it its in datArray[?] and if it is insert the object there and if not create that array and insert the object there
    // const userAvailabilityArray = {
    //     'userName': foundUser['userName'],
    //     'availability': req.body.availability
    // }

    
    // get all user objects and check ids and then push into specififc array spot based on the id
 
    // user.save()
    //   .then(userSaved => {
    //     //   console.log(foundUser)
    //       meeting.save()
    //       return res.status(200).json({'userSaved': 'User in added successfully'});
          
    //   })
    //   .catch(err => {
    //       return res.status(400).send("unable to save to database");
    //   })
})

// GET route that gets the meeting object which is found through the :meetingNum parameter but then returns the users availability inside the users array of the meeting object
meetDateRoute.route("/results/:meetingNumber").get(async function (req, res) {
    const meetingNumber = req.params.meetingNumber;
    const data = await MeetDateModel.find({ meetingNumber: meetingNumber }).lean()

    //for loop going through each user and returning the availability
    // for (let i = 0; i < data[0]['users'].length; i++) {
    //     const usersArray = data[0]['users'][i]
    //     // return console.log(usersArray)
    // }
    const usersArray = data[0]['users']
    const mainUser = data[0]['users'][0]
    const foundUser = await UserModel.findById(mainUser)
    const userAvailabilityArray = foundUser['availability']
    return res.send(foundUser)

})

module.exports = meetDateRoute;
