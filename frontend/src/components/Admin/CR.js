import { array } from 'prop-types'
import x from "./CRR.module.css"
import React, { useState } from 'react'

const CR = () => {
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
   <React.Fragment>
 <div className={x.faq}>
  <h1>FAQ</h1>
  <ul>
  { y&&
    y.map((req,i) => (
    <li>
      <input type="checkbox" />
      <i></i>
      <h2>Eliane Fares</h2>

      <p className={x.accordionanswer}>
      <div className={x.table}>
    
    <div className={[x.row, x.header].join(' ')}>
      <div className={x.cell}>
        Course Name
      </div>
      <div className={x.cell}>
       Instructor
      </div>
      <div className={x.cell}>
       Subject
      </div>
      <div className={x.cell}>
      </div>
    </div>
    
   {req.courses.map((c) => (

<div className={x.row}>
<div className={x.cell} >
  Luke Peters
</div>
<div className={x.cell} >
  Financial
</div>
<div className={x.cell} >
h</div>

</div>
   ))} 
    </div>



      </p>

    </li>
    ))}
    <li>
      <input type="checkbox" />
      <i></i>
      <h2>Hvorfor..?</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente quasi, quia provident facere recusandae itaque assumenda fuga veniam dicta earum dolorem architecto facilis nisi pariatur.</p>
    </li>
    <li>
      <input type="checkbox" />
      <i></i>
      <h2>Hvad..?</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam quas placeat assumenda mollitia magni consequatur dolorum, quod nihil distinctio aperiam officia alias! Voluptate dolore ex officiis sit, magnam non a, eligendi pariatur aut, earum dolores tenetur ipsam id illo deleniti. Laudantium deserunt eaque ipsam voluptatum consequuntur voluptatibus sed minima ad accusamus debitis eos similique laboriosam, molestiae? Consequatur neque tempore quis. Eligendi, in ut aspernatur esse nesciunt libero.</p>
    </li>
  </ul>
</div>
   </React.Fragment>
  )
}

export default CR