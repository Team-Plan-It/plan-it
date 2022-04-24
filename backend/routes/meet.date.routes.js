const meetDateRoute = require('express').Router()
const MeetDateModel = require('../models/MeetDateModel');
const UserModel = require('../models/UserModel');

// POST route that creates a meeting date
meetDateRoute.route('/add').post(function (req, res) {
  let meetDateModel = new MeetDateModel(req.body);
  meetDateModel.save()
    .then(dateSaved => {
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
    let mainMeeting = await MeetDateModel.updateOne({ meetingNumber: meetingNumber }, { $push: { users: user } })
    user.save()
      .then(userSaved => {
          return res.status(200).json({'userSaved': 'User in added successfully'});
      })
      .catch(err => {
          return res.status(400).send("unable to save to database");
      })
})

module.exports = meetDateRoute;
