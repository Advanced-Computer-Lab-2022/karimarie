# Bla Bla

## Motivation
<p>This is a collaborative project for of 5 Media Engineering major in the German University in Cairo in an attempt to secure an internship at the Canadian Chamber of Commerce by designing and employing their new website of online education aiming at offering reliable courses from various categories.</p>


<br /><br />

## Live Demo:
https://drive.google.com/file/d/1VwryeQX14DvDACn3xs7YJh231oIbvcgK/view?usp=share_link
<br /><br />

## Design Approach: 
Before the frontend web design phase, we have conducted user interviews in  order to utilise the given user requiremts. Through the interviewing process, we got to understand more about not only what functionalities our users expect but also about what experience are they looking for. Our interviewees were a selection of potential students that have tried or would consider trying online learning. It is also important to mention that we also considered existing competitive platforms,such as, Udemy,Coursera, and Udacity as a reference and to what will be our own imprint on our online learing platform.
<br />
After the interview process was over the following were considered in our low-fidelity design:
1. We aimed at designing simple yet efficient UI elements in order to make the learning process easier.
2. In case the user has made any mistake  throughout any process required, a clear message stating what the error was and how to overcome this error were required

<br /><br />


## Tests:

*Individual Trainee*
1. login
2. signup
3. view all courses with its corresponding info: rates,reviews, price,etc.
4. search and filter the courses
5. view a preview of any course 
6. pay for a course
7. report problems for a course they are registered for
8. request a refund for a course if only 50% or less of  the course has been watched
9. rate and review a course
10. download the certificate after completing the course

*Corporate Trainee*
<p>Same as <strong>Individual  Trainee </strong> but instead of paying for  a course the corporate trainee requests a course for which an admin can accept or reject based on the contract between the corporate and our website ,  and therefore they can't request a refund. Also, corporate trainees have no option of signing up,instead, they are added by the admins to the system.</p>

*Admin*
1. add another admin
2. add intructors
3. add  corporate trainees
4. view reported problems by trainees and instructors
5. handle refund requests by trainees
6. accept/decline course requests of corporate trainees
7. add a discount on any course(s) or all courses for a chosen period of time

*Instructor*
1. login
2. create a course with its coresspnding quizzes and  exam
3. view all courses with its corresponding info: rates,reviews, price,etc.
4. add a discount for a chosen period of time on  any of his courses

*Notes*
1. Instructors and trainees can change their passowrd and email at any times
2. Instructors and corporate trainees are required  to change their password the first time ever they login.
3. In case an instructor or trainee forgot their password upon logging in, an email is sent to them in order to follow the procedure of changing it.
<br/><br/>

## Features
This app features some technologies and functionalities that makes it a unique website for courses.
- Currency exchange with very high accuracy
- Search and filter functionalities 
- Clear and instructive error messages

<br/><br/>

## Technologies Used
* nodejs
* express
* nodemon
* axios
* mongoose(MongoDB)
* react
* @sendgrid
* bcrypt
* crypto
* bootstrap
* HTML/CSS

## Installation

1-clone the project to visual studio code 
```
git clone "https://github.com/Advanced-Computer-Lab-2022/karimarie.git"
```

2-Install needed dependencies for the server side and run
```
cd backend
npm install --force
#run
npm start
```
2-Install needed dependencies for the client side and run
```
cd frontend
npm install --force
#run
npm start
```
<br /><br />

## API Reference(using axios)
GET (all courses)
```
http://localhost:2000/home
```
POST (login)
```
http://localhost:2000/login
```
POST (Signup)
```
http://localhost:2000/signup"
```
POST (edit password for trainee)
```
http://localhost:2000/corpTrainee/editpassword/${decodeID}
```
POST (edit password for instructor)
```
http://localhost:2000/instructor/editpassword/${decodeID}
```
GET (all countries)
```
https://restcountries.com/v2/all
```
POST (filter courses)
```
http://localhost:2000/postFilterAll
```
GET (search for courses)
```
http://localhost:2000/search/${search}
```
GET (exam solution)
```
http://localhost:2000/getExamSol/${id}
```
GET (instructor's details)
```
http://localhost:2000/instructor/getByid2/${Course.instructor}
```
POST (pay for a course)
```
http://localhost:2000/payCourse/${id}/${currencyPrice}
```
GET (get admin reports)
```
http://localhost:2000/seeMyReports/${id}
```
POST (a report follow up)
```
http://localhost:2000/followUp
```
POST (instructor review)
```
http://localhost:2000/addInstructorReview/${instid}
```
POST (send certificate)
```
http://localhost:2000/sendCertificate
```
## Contribute
Contributions are always welcome.
To get Started
 1. Fork the repository
 2. Clone the repository
 3. Install dependencies
 4. Create a new branch
 5. Make your changes
 6. Commit and push your changes
 7. Create a pull request
 8. Wait for your pull request to be reviewed and merged
 
## Code Examples
 Sign up(client side)
 ```
    const sendUser = async () => {
    const res = await axios
      .post(
        "http://localhost:2000/signup",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          userName: userName,
          password: password,
          gender: gender,
        },
        { withCredentials: true, credentials: "include" }
      )

      .catch((err) => console.log(err));
    console.log(res.data.msg);
    return res.data;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (document.getElementById("male").checked) {
      setGender("male");
    } else if (document.getElementById("female").checked) {
      setGender("female");
    } else {
      setGender("");
    }
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      userName === "" ||
      password === "" ||
      gender === ""
    ) {
      isShowText3(true);
      isShowText(false);
      isShowText1(false);
      isShowText2(false);
    } else {
      sendUser().then((data) => {
        if (data.msg.localeCompare("Email entered is already taken") === 0) {
          isShowText(true);
          isShowText1(false);
          isShowText2(false);
          isShowText3(false);
        } else if (
          data.msg.localeCompare(
            "Password must be greater than 5 characters and less than 25 characters"
          ) === 0
        ) {
          isShowText1(true);
          isShowText(false);
          isShowText2(false);
          isShowText3(false);
        } else if (data.msg.localeCompare("Username already taken!") === 0) {
          isShowText2(true);
          isShowText(false);
          isShowText1(false);
          isShowText3(false);
        } else if (data.msg.localeCompare("Individual Trainee") === 0) {
          isShowText(false);
          isShowText1(false);
          isShowText2(false);
          isShowText3(false);

          localStorage.setItem("token", data.token);
          localStorage.setItem("userType","Trainee")
          window.location.href = "/Terms&Conditions";
        }
      });
    }
  };
  const [passwordType, setPasswordType] = useState("password");
  const togglePassword =()=>{
    if(passwordType==="password")
    {
     setPasswordType("text")
     return;
    }
    setPasswordType("password")
  };
```
getting a token(client side)
```
const VMyCourses = () => {
  const [access,hasaccess]=useState(false)
  const [datas,setdata]=useState("")
  const grantAccess = async () => {
      console.log(localStorage.getItem("token"))
      if(localStorage.getItem("token")===""){
          console.log("hi")
          hasaccess(false)
      }else {
      const res = await axios
        .get("http://localhost:2000/requireAuth/${localStorage.getItem("token")}")
        .catch((err) => console.log(err));
        const data = await res.data;
        return data;}
    };
    useEffect(() => {
      if(localStorage.getItem("token")!==""){
          grantAccess().then((data)=>{setdata(data.message)
          if(data.message==="Trainee"){
              hasaccess(true)
          }
          else {
              hasaccess(false)
          }
      });
    }}, []);
  ```  
   
  admin adding a new admin (server side)
  ```
  const addAdmin=async (req,res,next)=>{
    
     const{userName,password}=req.body
     let adm;
     let x= await instTable.findOne({userName:req.body.userName})
     let y= await traineeTable.findOne({userName:req.body.userName}) 
     if(x){
        return res.json({success: false, message: 'Username already taken!'});
    }
    else  if(y){
        return res.json({success: false, message: 'Username already taken!'});
    }else {
     try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const adm = await adminTable.create({ password: hashedPassword ,userName:userName});
         await adm.save();
         return res.json({success: true, message: 'Successfully Added!'});
        }
     catch(err){
         adminTable.find({userName:req.body.userName},function(err,person){
        if(err){
            return res.json({success: false, message: 'DataBase Error,Please Wait!'});

        }
        else{
            return res.json({success: false, message: 'Username already taken!'});

        }
    })}
}
    
}
```
getting all courses (server side)
```
const getAllCourses = async (req, res) => {
  
 
    let priceList;
    try{
     priceList = await courseTable.find({});
     return res.status(200).json({priceList})
    }
    catch(error){res.status(404).json({error:error.message}) }
  }
  const getSubjects=async(req,res)=>{
    let subjects;
    try{
        subjects=await subjectTable.find();
        subjects.save
        return res.status(200).json({subjects})
    }
    catch(error){res.status(404).json({error:error.message}) }
  }
  ```
  instructor editing his password
  ```
  const editPassword = async (req, res) => {
  
  var decodeID="";
  var finalres=""
  if (req.params.token) {
    jwt.verify(req.params.token, 'supersecret', (err, decodedToken) => {
      if (err) {
        res.status(401).json({message:"You are not logged in."})
      } else {
        decodeID=decodedToken.name;
      }
    });
  }
  ```
  Using Stripe to pay for a course
  ```
  const { id, currencyPrice } = useParams();
  console.log(id)
  const [cid,setcid]=useState(id)
  console.log(cid)
  const [green,setGreen]=useState(true)
  useEffect(() => {
    if (!window.document.getElementById("stripe-script")) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://js.stripe.com/v2/";
      s.onload = () => {
        window["Stripe"].setPublishableKey(
          "pk_test_51MEI8aGdZfaXR0mrrTdQCdrYn34vXH4ZzxSPDBPHy9rvej06lBu5LIb5jQeNmsX3X3Gpbmh8dJwXDQtgRthqHag900qEpQhRKa"
        );
      };
      window.document.body.appendChild(s);
    }
  }, []);
  ```
  
## Screenshots from the website

### SignUp
![SignUp](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.08.26%20PM.png)
### Login
![Login](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.08.43%20PM.png)
### Admin Home Page
![Admin Home](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.06.59%20PM.png)
### Create User (Admin)
![Create User](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.07.05%20PM.png)
![Create Inst](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.07.12%20PM.png)
### Add Discount (Admin)
![Add Promo](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.07.17%20PM.png)
### View Reports (Admin)
![view](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.07.22%20PM.png)
### View Refund Requests (Admin)
![refund](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.07.29%20PM.png)
### HomePage
![HomePage](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.07.59%20PM.png)
![Home](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.08.04%20PM.png)
![H](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.08.09%20PM.png)
### Payment Page
![Payment](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.10.26%20PM.png)
### Wallet of Trainee
![wallet](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.10.53%20PM.png)
### Tainee's Courses Page
![Trainee](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.11.29%20PM.png)
### Course Details Page
![Course Details](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.09.59%20PM.png)
![course details2](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.12.43%20PM.png)
### Watching Subtitles
![Watching](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.11.46%20PM.png)
### Solving Exam
![solve](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.11.53%20PM.png)
![solve2](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.12.01%20PM.png)
![solve3](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.12.09%20PM.png)
### Instructor Profile
![Instructor Profile](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.13.43%20PM.png)
![Inst](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.13.49%20PM.png)
### Create Course
![Instructor Balance](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/frontend/public/Screenshot%202023-01-04%20at%2010.14.02%20PM.png)





## Credits

|Name    |GitHub  |
|---------|-------|
|Angela Emil| https://github.com/AngelaEmil|
|Kariman Kamal| https://github.com/karimankamaal|
|Eliane Fares| https://github.com/ElianeFares|
|Nada Nazeer| https://github.com/nadanazeer11|
|Mariam Tarek| https://github.com/Mariamtkh|

<br /><br />
