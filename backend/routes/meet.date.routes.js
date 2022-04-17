const meetDateRoute = require('express').Router()
const MeetDateModel = require('../models/MeetDateModel');
const UserModel = require('../models/UserModel');

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

meetDateRoute.route("/availability/:id").get(function (req, res) {
    const id = req.params.id
    const mainmeeting = MeetDateModel.findById(id).then((meeting) => {
        res.status(200).json({'mainmeeting': meeting});
    })
})

meetDateRoute.route("/availability/:id").post(function (req, res) {
    const id = req.params.id
    let user = new UserModel(req.body);
    user.save()
      .then(userSaved => {
          res.status(200).json({'userSaved': 'User in added successfully'});
      })
      .catch(err => {
          res.status(400).send("unable to save to database");
      })
    let mainmeeting = await MeetDateModel.findById(id).then((mainmeeting) => {
        mainmeeting.users.unshift(user);
        mainmeeting.save()
            .then(meetingSaved => {
                res.status(200).json({'meetingSaved': 'User in added successfully'});
            })
            .catch(err => {
                res.status(400).send("unable to save to database");
            });
    })
})

module.exports = meetDateRoute;
