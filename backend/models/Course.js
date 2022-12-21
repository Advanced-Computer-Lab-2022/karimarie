const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursesSchema = new Schema({
  title: {
    type: String,
    required: isMyFieldRequired,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  currency: {
    type: String,
    required: isMyFieldRequired,
  },
  rating: {
    type: Number,
  },
  instructor: {
    type: mongoose.Schema.ObjectId,
    ref: "Instructor",
    required: isMyFieldRequired,
  },
  totalHours: {
    type: Number,
    required: isMyFieldRequired,
  },
  subject: {
    type: String,
    required: isMyFieldRequired,
  },
  description: {
    type: String,
    required: isMyFieldRequired,
  },
  subtitles: [
    {
      title: {
        type: String,
        required: true,
      },
      Video: [{
        type: String,
      }],
      totalHours: {
        type: Number,
        required: true,
      },
      shortDescrip: {
        type: String
      },
    },
  ],
  numStudents: {
    type: Number,
    default: 0,
    min: 0,
  },
  rating:{
    type: Number
  },
  numReviews:{
    type:Number
  },
  discount: {
    type: Number,
  },
  originalPrice: {
    type: Number,
  },

  expirationTime: {
    type: String,
  },
  preview:{
    type:String
  },
  startTime:{
    type:String
  },
  discountapplied:{
    type:Boolean,default:false
  }
});

function isMyFieldRequired() {
  return typeof this.myField === "string" ? false : true;
}
const Course = mongoose.model("Course", coursesSchema);
module.exports = Course;