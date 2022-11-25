const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const coursesreviewsSchema=new Schema({
    rating: {
        type: Number
    },
    description: {
        type: String
    },
    course:{
        type:mongoose.Schema.ObjectId,
        ref:"Course"
    }
});
const coursesReviews = mongoose.model('coursesReviews', coursesreviewsSchema);
module.exports = coursesReviews;