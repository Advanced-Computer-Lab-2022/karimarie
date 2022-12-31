import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ViewMyCourses from "./ViewMyCoursesAdmin";
// import NavbarHomePage from "../pages/Admin/S3_components/NavbarAdminPage";
// import Start from "../components/pages/Admin/Start";

import DefinePromotioncss from "../../S3_components/DefinePromotion.module.css";

import axios from "axios";
import DefinePromotioncss2 from "./DefinePromotionAdmin.module.css";
import { TextField } from "@mui/material";
import closeIcon from "../../S3_components/closeButton.png";

const DPromotion = () => {
  const [courses, setcourses] = useState("");
  const [freecourse, isfree] = useState(false);
  const [ready, isready] = useState(false);
  const [existDiscount, isexistDiscount] = useState(false);
  var c = new Date();
  const currentTime = c.toJSON().split("T")[0];
  const [prpr, setprpr] = useState("");

  const getCourses = async () => {
    const res = await axios
      .get("http://localhost:2000/home")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const [addPromo, isaddPromo] = useState(false);
  const addPromotion = () => {
    isaddPromo(true);
  };
  const hideAddDiscount = (e) => {
    isaddPromo(false);
  };

  const [addDiscount, setAddDiscount] = useState("");
  const [addStartDAte, setStartDate] = useState("");
  const [addExpirationDate, setExpirationDate] = useState("");
  const [showError,setShowError]=useState(false);
  const [message,setMessage]=useState('');
  const [x,setX]=useState(0);
  const addMyDiscount = async () => {
    const res = await axios
      .post("http://localhost:2000/admin/adddiscount2", {
        c:isCheck,
        discount: addDiscount,
        expirationTime: addExpirationDate,
        startTime: addStartDAte,
      })
      .catch((err) => console.log(err));
      setX(x+1);
  };
  const addedDiscount = (e) => {
    // console.log(addDiscount);
    // console.log(addExpirationDate);
    // console.log(addStartDAte);
    e.preventDefault();
    if (addStartDAte < currentTime) {
        setShowError(true);
        setMessage(`Start date should be greater than ${currentTime}`);
    }
    else if(addExpirationDate<currentTime){
        setShowError(true);
        setMessage(`End date should be greater than ${currentTime}`);
    }
    else{

    
    addMyDiscount();
    setAddDiscount("");
    setStartDate("");
    setExpirationDate("");
    isaddPromo(false);
    setShowError(false);
    setIsCheckAll(false)
    setIsCheck([])
    //window.location.reload();
    setX(x+1);
    }
  };

  useEffect(() => {
    console.log("hi")
    getCourses().then((data) =>{ setcourses(data.priceList)

    });
  }, [x]);



console.log(x);
const [isCheckAll, setIsCheckAll] = useState(false);
const [isCheck, setIsCheck] = useState([]);
const [list, setList] = useState([]);

const handleSelectAll =( e) => {
    console.log("f")
    setIsCheckAll(!isCheckAll);
    setIsCheck(courses.map(li => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };
  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };
  console.log(isCheck);
  return (
    <React.Fragment>
    

      <div className={DefinePromotioncss2.mainDiv}>
        <h2 className={DefinePromotioncss2.title}>All Courses</h2>
        <div className={DefinePromotioncss2.firstDiv}>
        
          <label> Select All</label> <span> <input
            type="checkbox"
            
            onChange={(e)=>{console.log("ffsff");handleSelectAll(e)}}
            checked={isCheckAll}
          /></span>
          <button class={DefinePromotioncss2.buttonAe} onClick={addPromotion}>
            Add Promotion
          </button>
        </div>
        <div className={DefinePromotioncss2.main2Div}>
          <div className={DefinePromotioncss2.secondDiv}>
            {courses &&
              courses.map((data) => (
                <ViewMyCourses
                  id={data._id}
                  title={data.title}
                  //   totalHours={data.totalHours}
                  rating={data.rating}
                  price={data.originalPrice}
                  priceafter={data.price}
                  currency={data.currency}
                  subject={data.subject}
                  type="Guest"
                  type2="Admin"
                />
              ))}
          </div>
          <div className={DefinePromotioncss2.second2Div}>
            {courses &&
              courses.map((data) => (
                <div className={DefinePromotioncss2.checkboxx}>
                   <input
                    type="checkbox"
                    name={data._id}
                    id={data._id}
                    onChange={(e) => handleClick(e)}
                    checked={isCheck.includes(data._id)}
                  />
                
                </div>
              ))}
          </div>
        </div>
      </div>
      
     
      {addPromo && (
        <div className={DefinePromotioncss.shadearea}>
          <div className={DefinePromotioncss.modalcontainer}>
          
            <p className={DefinePromotioncss.AddDiscounttext}>
              Add Your Discount
            </p>
            {showError&&<h5 style={{color:"red"}}>{message}</h5>}
            <form className={DefinePromotioncss.DiscountForm} onSubmit={addedDiscount}>
              <div className={DefinePromotioncss.textFields}>
                <TextField
                  required
                  type="number"
                  min={0} 
                  max={100}
                  className={DefinePromotioncss.addDiscountField}
                  value={addDiscount}
                  placeholder={"Discount Percentage"}
                  onChange={(e) => setAddDiscount(e.target.value)}
                ></TextField>
                <TextField
                  required
                  type="text"
                  className={DefinePromotioncss.addStartDateField}
                  value={addStartDAte}
                  placeholder={" Start Date in YYYY-MM-DD"}
                  onChange={(e) => setStartDate(e.target.value)}
                ></TextField>
                <TextField
                  required
                  type="text"
                  className={DefinePromotioncss.addExpiryDateField}
                  value={addExpirationDate}
                  placeholder={"End Date in YYY-MM-DD"}
                  onChange={(e) => setExpirationDate(e.target.value)}
                ></TextField>
              </div>
              
              <button
                className={DefinePromotioncss.submitadddiscountbutton}
                //onClick={addedDiscount}
              >
                Add
              </button>
            </form>
            <button
              onClick={hideAddDiscount}
              className={DefinePromotioncss.closepopup}
            >
              <img src={closeIcon}></img>
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default DPromotion;