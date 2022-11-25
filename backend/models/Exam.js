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
        questions:String,
        options:[
            {
                choice: String,
                isCorrect: false
            },
            {
            choice: String,
            isCorrect: false
            },
            {
                choice: String,
                isCorrect: false
            },
            {
                choice: String,
                isCorrect: false
            }
        ],
    }

    ]
});
const Exam = mongoose.model('Exam', ExamSchema);
module.exports = Exam;