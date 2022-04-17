const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MeetDateModel = new Schema({
    eventName: { type: String },
    length: { type: String },
    date: { type: String },
    timezone: { type: String },
    emails: [{ type: String }],
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
},{
    collection: 'meetdates'
});

module.exports = mongoose.model('MeetDateModel', MeetDateModel);