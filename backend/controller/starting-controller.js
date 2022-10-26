const instTable=require("../models/Instructor");
const traineeTable=require("../models/Trainee");
var loggedIn;
const login=async (req,res,next)=>{
    // console.log(req.body.userName);
    // instTable.findOne({ userName: req.body.userName, password: req.body.password },function(err,existingUser){
    //     if (existingUser){
    //       //session=req.session;
    //      // req.session.userid = req.body.username
    //      // req.session.authenticated=true;
    //      // session.userid=req.body.username;
    //       //session.save();
    //       loggedIn=req.body.userName
    //       //req.session.save();
    //       // console.log(session);
    //       // console.log(session.userid);
    //      // nameOfUser=req.body.username;
    //       //res.render('home');
    //       console.log('okkkk');
    //     }
    //     else {
    //       //const alert = '';
    //       //res.render('login',{alert});
    //       console.log('hiiii')
    //      // return res.status(404).json({error:error.message})
    //     }
    //   })
    console.log("a")
    const {userName,password}=req.body;
    let user;
    try{
        user=instTable.findOne({'userName':userName,'password':password})
        return res.status(200).json({user})
    }
    catch(error){console.log("error")}
};
module.exports={login,loggedIn};
