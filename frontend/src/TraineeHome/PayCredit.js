import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Styles from "./Styles";
import { Form, Field } from "react-final-form";
import Card from "./Card";
import x from "./Watchh.module.css";
import { useParams } from "react-router-dom";
import cc from '../InstructorHome/CreateCourse.module.css'
import wallet2 from "../TraineeHome/wallet.png"
import Nav from "./TraineeNavbar.module.css"
import error from '../InstructorHome/error.png'

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "./cardUtils";
import axios from "axios";
axios.defaults.baseURL = "/api";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// const ForgetPasswordAll = () => {
//   const [password, setPassword] = useState("");
//   const [id, setID] = useState("");
//   const [error, setError] = useState(null);

function PayCredit() {



  const [access,hasaccess]=useState(false)
  const [datas,setdata]=useState("")
  const grantAccess = async () => {
      console.log(localStorage.getItem("token"))
      if(localStorage.getItem("token")===""){
          console.log("hi")
          hasaccess(false)
      }else {
      const res = await axios
        .get(`http://localhost:2000/requireAuth/${localStorage.getItem("token")}`)
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




  const { id, currencyPrice } = useParams();
  console.log(id)
  const [cid,setcid]=useState(id)
  console.log(cid)
  // eslint-disable-next-line no-undef
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
  const [sendmessage,setmessage]=useState(false)
  const [sendmessage2,setmessage2]=useState(false)
  const [sendmessage3,setmessage3]=useState(false)
  const [sendmessage4,setmessage4]=useState(false)
  const onSubmit = async (values) => {
    await sleep(300);
    try {
      window.Stripe.card.createToken(
        {
          number: values.number,
          exp_month: values.expiry.split("/")[0],
          exp_year: values.expiry.split("/")[1],
          cvc: values.cvc,
          name: values.name,
        },
        (status, response) => {
          if (status === 200) {
            axios
              .post(
                `http://localhost:2000/corpTrainee/payCourse/${id}/${currencyPrice}`,
                {
                  token: response,
                  email: values.email,
                  studid:localStorage.getItem("token"),
                  amount: values.amount,
                }
              )
              .then((res) =>{
                console.log(res.data.message)
              if(res.data.message==="no"){
                  setmessage(true)
                  setmessage2(false)
                  setmessage3(false)
              }else {
               window.alert(JSON.stringify(res.data, 0, 2))}})
               setmessage3(true)
              .catch((err) => console.log(err));
          } 
          else {
            console.log("hi")
            setmessage2(true)
            setmessage(false)
            setmessage3(false)
            console.log(response.error.message);
          }
        }
      );
    } catch (error) {}
  };
  const [hisAmount,setHisAmount]=useState("");
  const [hisAmount2,setHisAmount2]=useState();
  const base_URL='https://api.exchangerate.host/latest'
  const [fromCurrency,setFromCurrency]=useState('EGP')
  const [toCurrency,setToCurrency]=useState(localStorage.getItem("currency"))
  const [exchangeRate,setExchanheRate]=useState('')
  const [omla,setOmla]=useState();
  
  const getM=async()=>{
    const res = await axios
    
    .post("http://localhost:2000/corpTrainee/viewWallet", {
      id : localStorage.getItem("token")
    })
    .catch((err) => console.log(err)).then((data)=>{
      if(data!="no"){
       setHisAmount(data.data);
      let rate;
      if(fromCurrency!=null && toCurrency!=null){
        const res= axios.get(`${base_URL}?base=${fromCurrency}&symbols=${toCurrency}`).then(
             res=>res.data).then(data2 => {setExchanheRate(data2.rates[toCurrency])
              setHisAmount(Math.ceil(data.data*(data2.rates[toCurrency])))
            })}
     
        
      }
    });
    
  }
  useEffect(() => {
    if(green===false){
      console.log("hi")
    getM();}
   }, [green]);
   const handlePayWallet=()=>{
    console.log(id)
    axios
    .post(
      `http://localhost:2000/corpTrainee/payCourseWallet/${id}/${localStorage.getItem("token")}`
    )
    .then((res) =>{
      console.log(res.data.message)
    if(res.data.message==="not enough money"){
        setmessage3(false)
        setmessage4(true)
    }else {
      console.log("hi")
      setmessage3(true)
      setmessage4(false)
     }})
     
    .catch((err) => console.log(err));
   }
  return (
    <React.Fragment>
      {access&& <React.Fragment>
     <div className={x.topnav2}>
          <div className={x.xx}>
            <div className={x.moveee2}>
        <a className={x.active} style={{"background-color" : green ? "#17cf97" : "#1b2430"}} onClick={()=>{setGreen(true)}} >Credit Card</a>
        <a className={x.active} style={{"background-color" : green ? "#1b2430" :"#17cf97" }} onClick={()=>{setGreen(false)}} >Wallet</a></div>
        </div>
        </div>
    <Styles>
    
      {green && <div>
      <h1> Your Card Details</h1>
      <Form
        onSubmit={onSubmit}
        render={({
          handleSubmit,
          form,
          submitting,
          pristine,
          values,
          active,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Card
                number={values.number || ""}
                name={values.name || ""}
                expiry={values.expiry || ""}
                cvc={values.cvc || ""}
                focused={active}
              />
              <div>
                <Field
                  name="email"
                  component="input"
                  type="text"
                  placeholder="Your email"
                />
              </div>
              <div>
                <Field
                  name="number"
                  component="input"
                  type="text"
                  pattern="[\d| ]{16,22}"
                  placeholder="Card Number"
                  format={formatCreditCardNumber}
                />
              </div>
              <div>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div>
                <Field
                  name="expiry"
                  component="input"
                  type="text"
                  pattern="\d\d/\d\d"
                  placeholder="Valid Thru"
                  format={formatExpirationDate}
                />
                <Field
                  name="cvc"
                  component="input"
                  type="text"
                  pattern="\d{3,4}"
                  placeholder="CVC"
                  format={formatCVC}
                />
              </div>
              {sendmessage && <div style={{"color":"red"}}>The email does not belong to signed up user</div>}
              {sendmessage2 && <div style={{"color":"red"}}>Credentials were not entered correctly</div>}
              {green && sendmessage3 && <div className={cc.movete}>
            <div className={cc.modalcontainerr}>
                <p className={cc.editbiotext2}>You have successfully registered to this course </p>
                <button className={cc.submiteditbutton2} onClick={()=>{window.location.href="/Trainee"}}>Go to Home Page</button>
                
            </div> 
          </div>}
              <div className="buttons">
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
              <h2>Values</h2>
              <pre>{JSON.stringify(values, 0, 2)}</pre>
            </form>
          );
        }}
      /></div>}
      {!green && <div className={Nav.moveW}>
        <img src={wallet2} className={Nav.wallettt}></img>
        <div className={Nav.moveB}>
        <p className={Nav.para}>Your Balance</p>

        <span className={Nav.felooso}>{hisAmount}<span className={Nav.omla}>{toCurrency}</span></span>

        </div>
        <div className={Nav.movePay}>
        <button className={Nav.pressokey} onClick={handlePayWallet}>Pay</button>
        </div>
        {!green && sendmessage3 && <div className={Nav.mm}>
          
            <div className={cc.modalcontainerr}>
                <p className={cc.editbiotext2}>You have successfully registered to this course </p>
                <button className={cc.submiteditbutton2} onClick={()=>{window.location.href="/Trainee"}}>Go to Home Page</button>
                
           </div>
          </div>}
          {!green && sendmessage4 && <div className={Nav.mm}>
          
          <div className={cc.modalcontainerr}>
              <p className={cc.editbiotext2}>There is no enough money in you wallet. </p>
              <button className={cc.submiteditbutton2} onClick={()=>{window.location.href="/Trainee"}}>Go to Home Page</button>
              
         </div>
        </div>}
        </div>}
    </Styles>
    </React.Fragment>}
    {access===false && <div>
            <img src={error} width="64"></img> Access not granted
            </div>}
    </React.Fragment>
  );
}
render(<PayCredit />, document.getElementById("root"));
export default PayCredit;