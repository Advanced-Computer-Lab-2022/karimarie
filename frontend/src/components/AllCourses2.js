import React, { useState,useEffect } from 'react'
import { Avatar,Box,Card,CardContent,CardHeader,CardMedia,IconButton,Typography, Button,CardActions } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CurrencyInput from './CurrencyInput';
import RateCourse from './Trainee/RateCourse';
import axios from 'axios';
const AllCourses2 = ({id,title,price,totalHours,rating,currency,type}) => {
  const [showText, setShowText] = useState(true);
  const [showTitleOnly,setShowTitleOnly]=useState(false);//ana mesh instructor 3ayz yeshoof 7agto bas
  const [currencyP,setCurrencyP]=useState('')
  const country=localStorage.getItem("country");
  const currencySelected=localStorage.getItem("currency");
  const [newPrice,setNewPrice]= useState('')
  const [Expired,isExpired]=useState('');
  console.log(type)
  useEffect(() => {
     if(type=='Instructor'){
      setShowTitleOnly(true); //ana instructor 3ayz yeshoof only his titles
    }
    if(type=="CorpTrainee"){
      setShowText(false); 
    }
  }, []);

  const sendRequestgetCourse = async () => {
    const res = await axios
      .get(`http://localhost:2000/getByidCoursedic/${id}`)
      .catch((err) => console.log(err));
      const data = await res.data;
      console.log(data)
      return data;
  };
  useEffect(() => {
    sendRequestgetCourse().then((data) => isExpired(data.expirationTime));
  }, []);


  const navigate = useNavigate();
  const [idF,setCourseId]=useState()
  const Price = () => <div>price : {newPrice} {currencyP}</div>;
  const Title=()=> <div> Title:{title}</div>
  const TotalHours=()=> <div> Total Hours:{totalHours}</div>
  const Rating=()=> <div>Rating:{rating}</div>
  console.log(currency);
  console.log(currencySelected);


  const base_URL='https://api.exchangerate.host/latest'
  const [currencyOptions,setCurrencyOptions]=useState('');
  const [fromCurrency,setFromCurrency]=useState('');
  const [toCurrency,setToCurrency]=useState('')
  const [amount,setAmount]=useState(1);
  const [exchangeRate,setExchanheRate]=useState('')
  console.log(exchangeRate);
  const sendRequest = async () => {
      const res = await axios
        .get(base_URL)
        .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
  
  useEffect(()=>{
      sendRequest().then(data =>{setCurrencyOptions([data.base,...Object.keys(data.rates)])
      setFromCurrency(currency)
      setToCurrency(currencySelected)
      setExchanheRate(data.rates[toCurrency])}
      )
      
 },[])
 useEffect(()=>{
  if(fromCurrency!=null && toCurrency!=null){
 const res= axios.get(`${base_URL}?base=${fromCurrency}&symbols=${toCurrency}`).then(
      res=>res.data).then(data => setExchanheRate(data.rates[toCurrency]))}}
  ,[fromCurrency,toCurrency])
  
 

          console.log(price*exchangeRate+"jjjj");
          useEffect(()=>{
          setNewPrice(price*exchangeRate);
          setCurrencyP(currencySelected);
    
      },[exchangeRate])
     
      
  return (
    <div>
        <Card sx={{  width: "450px",
          marginLeft: "20px",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
          boxShadow: "10px 10px 20px #ccc"}}}>
           <a href={`/course/${id}/${newPrice}/${currencyP}/${type}`} >
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
       // image="/static/images/cards/contemplative-reptile.jpg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {showTitleOnly ? null:  <Rating />}  
        </Typography>
        <Typography variant="body2" color="text.secondary">
         <Title/>
        </Typography>
        <Typography variant="body2" color="text.secondary">  
        {showText&&!showTitleOnly ? <Price /> : null} 
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {showTitleOnly ? null:  <TotalHours />}  
        </Typography>

       
      </CardContent>
      </a>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>

    </Card>
    
    </div>
    
  )
  
}

export default AllCourses2