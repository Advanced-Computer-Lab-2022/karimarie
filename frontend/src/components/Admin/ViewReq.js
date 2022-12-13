import React, { useState } from 'react'
import x from "./CReq.module.css" 
import t from "./t.png";
const ViewReq = () => {
    const [ff,setff]=useState([{
        "req": [
            {
                "_id": "63949a315c6d0a0c07d8363f",
                "corpId": "639498eb27964b9ef949830b",
                "corpName": "Eliane Fares",
                "courses": [
                    {
                        "courseId": "639382e892ec0e4587946ae6",
                        "courseName": "Dynamic Programming",
                        "courseInstructor": "Dr.Ramy Younis",
                        "status": false,
                        "_id": "63949a315c6d0a0c07d83640"
                    },
                    {
                        "courseId": "639382e892ec0e4587946ae6",
                        "courseName": "Introduction To Physics",
                        "courseInstructor": "Dr. Ahmed Ezzat",
                        "status": false,
                        "_id": "63949a535c6d0a0c07d8364e"
                    },
                    {
                        "courseId": "639382e892ec0e4587946ae6",
                        "courseName": "Introduction To Physics",
                        "courseInstructor": "Dr. Ahmed Ezzat",
                        "status": false,
                        "_id": "63949a535c6d0a0c07d8364e"
                    }
                ],
                "__v": 0
            },
            {
                "_id": "63949a405c6d0a0c07d83646",
                "corpId": "639498c827964b9ef9498305",
                "corpName": "kariman Zeineldein",
                "courses": [
                    {
                        "courseId": "639382e892ec0e4587946ae6",
                        "courseName": "titlewer",
                        "courseInstructor": "efeffwr hbdjhb",
                        "status": false,
                        "_id": "63949a405c6d0a0c07d83647"
                    },
                    {
                        "courseId": "639382e892ec0e4587946ae6",
                        "courseName": "titlePhywer",
                        "courseInstructor": "efeffwr hbdjhb",
                        "status": false,
                        "_id": "63949a535c6d0a0c07d8364e"
                    }
                ],
                "__v": 0
            },
            {
                "_id": "63949a535c6d0a0c07d8364d",
                "corpId": "639498d627964b9ef9498307",
                "corpName": "kidiobhoifb skjdbs",
                "courses": [
                    {
                        "courseId": "639382e892ec0e4587946ae6",
                        "courseName": "titlewer",
                        "courseInstructor": "efeffwr hbdjhb",
                        "status": false,
                        "_id": "63949a535c6d0a0c07d8364e"
                    },
                    {
                        "courseId": "639382e892ec0e4587946ae6",
                        "courseName": "titlePhywer",
                        "courseInstructor": "efeffwr hbdjhb",
                        "status": false,
                        "_id": "63949a535c6d0a0c07d8364e"
                    },
                    {
                        "courseId": "639382e892ec0e4587946ae6",
                        "courseName": "titlePhywer",
                        "courseInstructor": "efeffwr hbdjhb",
                        "status": false,
                        "_id": "63949a535c6d0a0c07d8364e"
                    }

                ],
                "__v": 0
            }
        ]
    }])
    console.log(ff[0].req[0])
    const [y,setY]=useState(ff[0].req);
    console.log(y[0].courses[0].courseName);
    const [nada,setn]=useState([1,2,3,4,5,6,7])
  return (
 
<html lang="en">
    <head>
    {/* <meta charset="UTF-8" /> */}
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>01</title>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
        <link rel="stylesheet" href="./style.css" />
    </head>

    <body>
    <section className={x.container}>
            <div className={x.accordion}>
                <h2 className={x.title}>Frequently Asked Questions</h2>
           
        { y&&
    y.map((req,i) => (
        <article className={x.accordionpanel}>
        <input id={i} name="accordion" type="radio"   />
            <label for={i}>
            {req.corpName}
                <i className={x.open}></i>
                <i className={x.close}></i> 
            </label>
            <div className={x.accordionbody}>
            <p className={x.accordionanswer}>
                {req.courses.map((c)=>(
            <div className={x.success}> 
                <div className={[x.boxx, x.b1].join(' ')}>
                <p className={[x.cname, x.t,x.hh].join(' ')}>Course Name</p>
                <p className={[x.cname, x.t].join(' ')}>{c.courseName}</p>
                </div>
                <div className={[x.boxx].join(' ')}>
                <p className={[x.cname, x.t,x.hh].join(' ')}>Instructor</p>
                <p className={[x.cinst, x.t].join(' ')}>{c.courseInstructor}</p>
                </div>
                <div className={x.boxx}>
                <p className={[x.cname, x.t,x.hh]}>Subject</p>
                <p className={[x.csubj, x.t]}>Object Oriented programmingnnnnnnnnnnnnnnnnhhhhhhhhhhhhhhh</p>
                </div>
                <div className={x.boxx}>
                <p className={[x.cname, x.t,x.hh]}>Price</p>
                <p className={[x.cprice, x.t]}>49Egp</p>
                </div>
                {/* <button class="button-36" role="button">Button 36</button> */}
                <div className={x.butt}>
                <button className={x.button10} role="button" style={{display:'block'}}>ACCEPT!</button>
                <button className={x.button11} role="button">Decline!</button>
                </div>
            </div>

                ))}
            </p>
        </div>

        </article>
))}
       
    </div>
    </section>
    </body>
</html>

  )
}

export default ViewReq