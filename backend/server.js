const cors = require('cors')
const express = require('express')
const meetDateRoute = require('./routes/meet.date.routes')
require('dotenv').config();

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/dates', meetDateRoute);

require('../backend/config/db.config')
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, "../build")));
}

const PORT = process.env.PORT 
app.listen(PORT, '0.0.0.0', () => {
console.log('Listening on port ' + PORT);
});