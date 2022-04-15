const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const meetDateRoute = require('./routes/meet.date.routes')

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('../backend/config/db.config')
app.use('/dates', meetDateRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
console.log('Listening on port ' + PORT);
});