const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
const instructorSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  biography: {
    type: String,
  },
  email: {
    type: String,
  },
  education: {
    type: String,
  },
  projects: {
    type: String,
  },
  // reviews:[ {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "instructorReviews",
  //   required: true
  // }],
  rating:{
    type: Number
  },
  numReviews:{
    type:Number
  },
  firstTime:{
    type:Boolean,default:true,}
});
const Instructor = mongoose.model("Instructor", instructorSchema);
module.exports = Instructor;