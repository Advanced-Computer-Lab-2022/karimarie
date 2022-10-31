import React, { useState,useEffect } from 'react'
import { Avatar,Box,Card,CardContent,CardHeader,CardMedia,IconButton,Typography, Button,CardActions } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
const AllCourses2 = ({id,title,price,totalHours,rating,currency}) => {
  const [showText, setShowText] = useState(true);
  const [showTitleOnly,setShowTitleOnly]=useState(false);//ana mesh instructor 3ayz yeshoof 7agto bas
  const [currencyP,setCurrencyP]=useState('')
  const country=localStorage.getItem("country");
  const [newPrice,setNewPrice]= useState('')
  useEffect(() => {
    if(!price){
      setShowText(false); 
     }
     if(!price&&!totalHours&&!rating&&!currency){
      setShowTitleOnly(true); //ana instructor 3ayz yeshoof only his titles
    }
  }, []);
  const navigate = useNavigate();
  const [idF,setCourseId]=useState()
  const Price = () => <div>price : {newPrice} {currencyP}</div>;
  const Title=()=> <div> Title:{title}</div>
  const TotalHours=()=> <div> Total Hours:{totalHours}</div>
  const Rating=()=> <div>Rating:{rating}</div>
        useEffect(()=>{
          if (country==="Egypt"){
            if(currency==="EGP"){
            //const x= price
            setNewPrice(price)
          }
          if(currency==="EUR"){
            const x= price*23
            setNewPrice(x)
          }
          if(currency==="USD"){
            const x= price*23
            setNewPrice(x)
          }
          setCurrencyP('EGP')
        }

        else if (country==="Europe"){
          if(currency==="EGP"){
          const x= price*0.043
          setNewPrice(x)
        }
        if(currency==="EUR"){
          const x= price
          setNewPrice(x)
        }
        if(currency==="USD"){
          const x= price
          setNewPrice(x)
        }
        setCurrencyP('EUR')
      }
      else if (country==="USA"){
        if(currency==="EGP"){
        const x= price*0.043
        setNewPrice(x)
      }
      if(currency==="EUR"){
        const x= price
        setNewPrice(x)
      }
      if(currency==="USD"){
        const x= price
        setNewPrice(x)
      }
      setCurrencyP('USD')
      }

      },[newPrice])
  return (
    <div>
       
        <Card sx={{  width: "450px",
          marginLeft: "20px",
          mt: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
          boxShadow: "10px 10px 20px #ccc"}}}>
           <a href={`/course/${id}/${newPrice}/${currencyP}`} >
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