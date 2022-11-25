const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const instructorreviewsSchema=new Schema({
    rating: {
        type: Number
    },
    description: {
        type: String
    },
    instructor:{
        type:mongoose.Schema.ObjectId,
        ref:"Instructor"
    }
});
const instructorReviews = mongoose.model('instructorReviews', instructorreviewsSchema);
module.exports = instructorReviews;