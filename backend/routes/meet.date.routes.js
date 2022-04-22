const meetDateRoute = require('express').Router()
const MeetDateModel = require('../models/MeetDateModel');
const UserModel = require('../models/UserModel');

// POST route that creates a meeting date
meetDateRoute.route('/add').post(function (req, res) {
  let meetdatemodel = new MeetDateModel(req.body);
  meetdatemodel.save()
    .then(dateSaved => {
        res.status(200).json({'dateSaved': 'Date in added successfully'});
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    });
});

// GET route that gets the meeting object which is found through the :meetingNum parameter
meetDateRoute.route("/availability/:meetingnum").get(async function (req, res) {
    const meetingnum = req.params.meetingnum;
    const data = await MeetDateModel.find({ meetingNumber: meetingnum }).lean()
    console.log(data)

    return res.send(data)
})

meetDateRoute.route("/availability/:id").post(async function (req, res){
    const id = req.params.id
    let user = new UserModel(req.body);
    user.save()
      .then(userSaved => {
          res.status(200).json({'userSaved': 'User in added successfully'});
      })
      .catch(err => {
          res.status(400).send("unable to save to database");
      })
    let mainmeeting = await MeetDateModel.find({ meetingNumber: id }).lean()
    
    // mainmeeting.users.push(user)
    // mainmeeting.save()
    // console.log(mainmeeting[0].users)
    
    // .then((mainmeeting) => {
    //     mainmeeting.users.push(user);
    //     mainmeeting.save()
    //         .then(meetingSaved => {
    //             res.status(200).json({'meetingSaved': 'User in added successfully'});
    //         })
    //         .catch(err => {
    //             res.status(400).send("unable to save to database");
    //         });
    // })
})

module.exports = meetDateRoute;
