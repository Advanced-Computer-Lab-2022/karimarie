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

git clone "https://github.com/Advanced-Computer-Lab-2022/karimarie.git"


2-Install needed dependencies for the server side and run

cd backend
npm install --force
#run
npm start

2-Install needed dependencies for the client side and run

cd frontend
npm install --force
#run
npm start

<br /><br />

## API Reference
1. rest API ('https://api.exchangerate.host/latest')---> for currency exchange
2. Send Grid ---> for sending emails
3. google api ()
4. stripe api("https://js.stripe.com/v2/")---> for course payments

![Screenshot](https://github.com/Advanced-Computer-Lab-2022/karimarie/blob/main/Screenshot%20(9).png)

## Credits

|Name    |GitHub  |
|---------|-------|
|Angela Emil| https://github.com/AngelaEmil|
|Kariman Kamal| https://github.com/karimankamaal|
|Eliane Fares| https://github.com/ElianeFares|
|Nada Nazeer| https://github.com/nadanazeer11|
|Mariam Tarek| https://github.com/Mariamtkh|

<br /><br />
