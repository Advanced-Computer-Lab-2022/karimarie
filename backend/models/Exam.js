const mongoose=require('mongoose');
const {ObjectId} = mongoose.Schema;
const Schema=mongoose.Schema;

const ExamSchema=new Schema({
    CourseId:{
        type:String,
        required:true
    },
    QuizNumber:{
        type:String
    },
    Content:[{
                question: {
                  type: String,
                  required: true,
                },
                choice1: {
                  type: String,
                  required: true
                },
                choice2: {
                  type: String,
                  required: true,
                },
                choice3: {
                  type: String,
                  required : true
                },
                choice4: {
                    type: String,
                    required : true
                },
                correctAns: {
                    type: Number,
                    required : true
                  }  
    }

    ]
});
const Exam = mongoose.model('Exam', ExamSchema);
module.exports = Exam;