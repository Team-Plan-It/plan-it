const mongoose = require("mongoose");
require('dotenv').config();

const uri = process.env.MONGODB_URI
mongoose.Promise = global.Promise;
mongoose.connect(
    uri, 
    { 
      useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(
        () => {console.log('Database is connected') },
        err => { console.log('Can not connect to the database'+ err)}
    );

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.set('debug', true);

module.exports = mongoose.connection;