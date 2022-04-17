const meetDateRoute = require('express').Router()
const MeetDateModel = require('../models/MeetDateModel');

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
    
})

module.exports = meetDateRoute;