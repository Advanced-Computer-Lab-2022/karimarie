import { useState } from 'react'
import React from 'react'
import { useEffect } from "react";
import axios from "axios";
import AllCourses2 from './AllCourses2';
const SearchCourse = ({search,show}) => {
    const [courses, setCourses] = useState([]);
        const sendRequest = async () => {
            const res = await axios
            .get(`http://localhost:2000/search/${search}`)
            .catch((err) => console.log(err));
            const data = await res.data;
            return data;
          };
        useEffect(() => {
            sendRequest().then((data) => setCourses(data));
          }, []);
      
   
   
  return (
    <React.Fragment>
       { show!=='CorpTrainee' && courses &&
      courses.map((courses) => (
        <AllCourses2
          title={courses.title}
          price={courses.price}
          totalHours={courses.totalHours}
          rating={courses.rating}
          currency={courses.currency}
        />
      ))}

      { show==='CorpTrainee' && courses &&
            courses.map((courses) => (
              <AllCourses2
                title={courses.title}
                totalHours={courses.totalHours}
                rating={courses.rating}
              />
            ))}
      
    </React.Fragment>
   
  )


      }
export default SearchCourse