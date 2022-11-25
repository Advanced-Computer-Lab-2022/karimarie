import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function CourseDetails() {
  const id = useParams().id;
  const [showText, setShowText] = useState(false);
  const newPrice = useParams().newPrice;
  const currencyP = useParams().currencyP;
  const type=useParams().type;
  const [Course, setCourses] = useState([""]);
  const [discount, setDiscounts] = useState("");
  const [error, setError] = useState(null);
  const [newPriceDiscount, setNewPriceDiscount] = useState("");
  const [expirationTime, setExpirationTime] = useState("");
  const [newPriceAfter, setNewPriceAfter] = useState(0);
  const [newExpAfter, setExpAfter] = useState("");
  // const [expirationTime1, setExpirationTime1] = useState("");

  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:2000/getByid/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const sendReq = async () => {

    const res = await axios
      .post(`http://localhost:2000/instructor/adddiscount/${id}`, {
        discount: discount,
        expirationTime: expirationTime,
      })
      .catch((err) => console.log(err));
    // console.log("ana khalast el method");
    const data2 = await res.data;
    console.log(data2);

    return data2;
  };
  useEffect(() => {
    sendRequest().then((data) => setCourses(data.course));
  }, []);
  // useEffect(() => {
  //   sendReq().then((data) => setDiscounts(data));
  // }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    sendReq().then((data2) => {
      setNewPriceDiscount(data2.price);
      setExpirationTime(data2.expirationTime);
      console.log(expirationTime)
      if (data2.price !== data2.originalPrice) {
        setShowText(true);
      } else {
        setShowText(false);
      }
    });
    
    if(discount!=""){
      setNewPriceAfter((newPrice*(1-((discount)/100))))
    }
    if(expirationTime!=""){
      setExpAfter(expirationTime)
    }

    // setError(null);
    // setExpirationTime("");
    // setDiscounts("");
  };
 
  const PriceAfterDiscount = () => (
    <div> Course Price after discount :{newPriceAfter} {currencyP}</div>
  );

  const ExpirationdateafterDiscount = () => (
    <div> Course Expiration Date : {newExpAfter}</div>
  );

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Course Instructor ID : {Course.instructor}
        </Typography>
        <Typography variant="h5" component="div">
          Course Title : {Course.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Course Subject : {Course.subject}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Course Price : {newPrice} {currencyP}
        </Typography>
        {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {Course.subtitles}
            </Typography> */}
        <Typography variant="body2">
          Course Rating : {Course.rating}
          <br />
          Course Description : {Course.description}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {showText ? <PriceAfterDiscount /> : null}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {showText ? <ExpirationdateafterDiscount /> : null}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
      {type==='Instructor' &&
      <form className="create" onSubmit={handleSubmit}>
        <label>Discount:</label>
        <input
          type="number"
          onChange={(e) => setDiscounts(e.target.value)}
          value={discount}
        />
        <label>Expiration Date:</label>
        <input
          type="text"
          onChange={(e) => setExpirationTime(e.target.value)}
          value={expirationTime}
          placeholder="YYYY-MM-DD"
        />
        <button>Add Discount</button>
        {error && <div className="error">{error}</div>}
      </form>}

      {type==='CorpTrainee' && <div class="ratio ratio-16x9">
      <iframe src={Course.preview} title="YouTube video" allowfullscreen></iframe>
    </div>}

      {type==='CorpTrainee' &&
      <a href={`/myExam/${Course._id}/2`} > Solve Exam</a>}
    </Card>
  );
}

export default CourseDetails;