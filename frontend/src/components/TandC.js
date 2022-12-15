import React from 'react'
import x from "./TandCC.module.css"
const TandC = () => {
  return (
   <React.Fragment>
    <main className={x.wrap}>
  <section className={x.container}>
    <div className={x.containerheading}>
      <h2 className={x.h2}>Terms & Conditions</h2>
    </div>
    <div className={x.containercontent}>
      <h2 className={x.h2}>Payment Policy </h2>
      <div> 
      <p>1-All Debit/Credit cards accepted as a form of payment </p>
        
        </div>
        <h2 className={x.h2}>Refund Policy </h2>
      <p>1- Refund applicable only if less than 50% of the course has been attended </p>
        <p>2-Course price is refunded to users website wallet   </p>
  
    
    </div>
    <div className={x.containernav}>
      <small className={x.small}>By clicking 'Accept' you are agreeing to our terms and conditions.</small>
      <a className={x.button} href="#">Accept</a>
    </div>
  </section>
</main>
   </React.Fragment>
  )
}

export default TandC