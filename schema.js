const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
  id: String, // String is shorthand for {type: String}
  date: String,
  client_name: String,
  client_email: String,
  client_phone: String,
  meeting_time: { type: Date, default: Date.now },
  comments : String
});


module.exports = blogSchema;