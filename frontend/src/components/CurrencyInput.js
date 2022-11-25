import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import AllCourses2 from './AllCourses2';
const base_URL='https://api.exchangerate.host/latest'

const CurrencyInput = ({from,to}) => {
   
    
    console.log(from);
    console.log(to);
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
        setFromCurrency(from)
        setToCurrency(to)
        setExchanheRate(data.rates[toCurrency])}
        )
        
   },[])
   useEffect(()=>{
    if(fromCurrency!=null && toCurrency!=null){
   const res= axios.get(`${base_URL}?base=${fromCurrency}&symbols=${toCurrency}`).then(
        res=>res.data).then(data => setExchanheRate(data.rates[toCurrency]))}}
    ,[fromCurrency,toCurrency])

   
}
export default CurrencyInput;