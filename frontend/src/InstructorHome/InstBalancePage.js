import React from 'react'
import b from "./InstBalancePage.module.css"
import addIcon from "./icons8-plus-math-24.png"
import axios from "axios";
import { useEffect, useState } from "react";

const InstBalancePage = ({instbalance}) => {
const [bala,setBala]=useState('')
    const curr=localStorage.getItem("currency");
    const ba=Math.floor(instbalance)
    const getcurr = async () => {
        const res = await axios
        .post("http://localhost:2000/exchangecurr", {
            balance:ba,
            curr:curr,
          })
          .catch((err) => console.log(err));
          const data = await res.data;
          console.log(data)
          return data;
          
    }
    useEffect(()=>{
       getcurr().then((data) => setBala(data.balance))
        },[]);

    return (
        <div>
           
            <div className={b.maindiv}>
            <p className={b.mycards}>My Cards</p>
            <button className={b.addmore}><img src={addIcon}></img></button>
            <div className={b.card}>
            <h3 className={b.cardnumber}>** ** ** 5136</h3>
            <p className={b.expirydate}>Expiry Date</p>
            <p className={b.expirydatetext}>09/27</p>
            <p className={b.cvv}>CVV</p>
            <p className={b.cvvtext}>*</p>
            <div className={b.line}></div>
           <p className={b.balance}>Balance</p>
    <p className={b.balancenumber}>{curr} {bala}</p>

            </div>
            <div className={b.graph}>
               <ul className={b.numberslist}>
                   <li className={b.list}> 23</li>
                   <li className={b.list}> 24</li>
                   <li className={b.list}> 25</li>
                   <li className={b.list}> 26</li>
                   <li className={b.list}> 27</li>
                   <li className={b.list}> 28</li>
                   <li className={b.list}> 29</li>
               </ul>
               <ul>
                   <div className={b.b1}></div>
                   <div className={b.b2}></div>
                   <div className={b.b3}></div>
                   <div className={b.b4}></div>
                   <div className={b.b5}></div>
                   <div className={b.b6}></div>
                   <div className={b.b7}></div>
               </ul>
               <p className={b.date}>23 - 29 Dec 2022</p>
            </div>
            {/* <div className={b.card}>
		    <h3 className={b.cardnumber}>** ** ** 5136</h3>
            <p className={b.expirydate}>Expiry Date</p>
            <p className={b.expirydatetext}>09/27</p>
            <p className={b.cvv}>CVV</p>
            <p className={b.cvvtext}>*</p>
            <img src={mastercardIcon}></img>

		    </div> */}
       
	</div>
        </div>
    )
}

export default InstBalancePage