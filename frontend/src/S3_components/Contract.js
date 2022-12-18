import { Typography } from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useParams } from "react-router-dom";
import contractcss from "./Contract.module.css";
const Contract = () => {
  return (
    <React.Fragment>
      <main className={contractcss.wrap}>
        <section className={contractcss.container}>
          <div className={contractcss.containerheading}>
            <h2 className={contractcss.h2}>Terms & Conditions</h2>
          </div>
          <div className={contractcss.containercontent}>
            <h2 className={contractcss.smallheaders}>
              Please read before loging in{" "}
            </h2>
            <div>
              <p className={contractcss.smallp}>
                The company has the right to 10% of the earnings. If you are
                under the age of 18 you need your parent or guardian to be
                involved in order to make any payments to MMDSmart. All payments
                made by you to MMDSmart are subject to MMDSmart Terms of
                Service. Credit. You can purchase credits (“Credit”) using any
                payment method made available to you by MMDSmart. You agree that
                you are not relying on the future availability of any feature or
                product offered through the Service in agreeing to or making
                payments hereunder. Credit Balance. Credit Balance is the amount
                of money that remains at your MMDSmart account after you used
                the Services at MMDSmart. When you intend to use the Service,
                you must ensure that the Credit Balance of prepayment monies
                received from you by MMDSmart is in credit. The amount of such
                prepayments is at your sole discretion. The Service will be made
                available to you after the payment is received by a bank account
                of MMDSmart. Foreign Currency. If you pay with foreign currency,
                you agree that the amount you are eventually credited may vary
                as a result of foreign currency conversion policies of our
                third-party payment processors, which you can find at the
                relevant website or location where you make the actual purchase.
                Recurring Charges. If you purchase a service from MMDSmart on a
                subscription basis, you agree that this type of Service requires
                a recurring payment and all payments shall be made by the
                payment method and payment intervals selected by you at the time
                you initiate the purchase, until you terminate the subscription.
                Third Party Payment Processors. We use the services of third
                parties to process your payments and we require that these third
                parties take the appropriate organizational and technical
                measures to protect your personal data and traffic data and to
                comply with relevant laws. Please review the terms of use and
                privacy policies of those third parties before providing your
                banking or payment information. Payment Through Third Party
                Services. When you make a purchase within the Application, or
                the MMDSmart Site, or the Messagewhiz Site through third
                parties, your purchase is also subject to the terms of such
                third party (including with respect to payment terms, refunds,
                etc.), and you should read such applicable terms before you
                decide to complete the purchase. You agree to abide by any
                relevant terms of service or other legal agreement that governs
                your use of a given payment processing service and/or method.
                You also acknowledge that a bank or credit card company may
                refuse or cancel a transaction and freeze funds up to 14
                business days as per the bank/credit card company policy. You
                also agree to the sharing of information between us and such
                third-party payment processor for billing related activity.
                Credit Card Payments. We accept credit cards only with 3D Secure
                for payments within the Messagewhiz Site to make your
                transactions more secure. Payments within the Messagewhiz Site
                from credit cards without 3D Secure will be rejected, and
                transactions will not be completed. Fees and Taxes. You are
                solely responsible for all carrier data plans, Internet fees,
                and other fees and taxes associated with your access to and use
                of MMDSmart Services. Using the Service on mobile applications
                will use some of the data allowance available on the data
                package to which you have subscribed with your mobile network
                operator as the case may be. Out-of-country usage may in any
                event lead to significantly higher costs than regular usage, and
                you are solely responsible for keeping yourself informed and
                paying for possible roaming and other applicable charges levied
                by your mobile network operator. MMDSmart may refuse or cancel a
                transaction at any time in our sole discretion, if we believe it
                violates MMDSmart Terms of Service or this Payment & Refund
                Policy or to prevent financial loss. In cases of fraud or
                illegal acts, MMDSmart may cancel or block your Credit Balance.{" "}
              </p>
            </div>
            <h2 className={contractcss.smallheaders}>Payment Policy </h2>
            <div>
              <p className={contractcss.smallp}>
                If you are under the age of 18 you need your parent or guardian
                to be involved in order to make any payments to MMDSmart. All
                payments made by you to MMDSmart are subject to MMDSmart Terms
                of Service. Credit. You can purchase credits (“Credit”) using
                any payment method made available to you by MMDSmart. You agree
                that you are not relying on the future availability of any
                feature or product offered through the Service in agreeing to or
                making payments hereunder. Credit Balance. Credit Balance is the
                amount of money that remains at your MMDSmart account after you
                used the Services at MMDSmart. When you intend to use the
                Service, you must ensure that the Credit Balance of prepayment
                monies received from you by MMDSmart is in credit. The amount of
                such prepayments is at your sole discretion. The Service will be
                made available to you after the payment is received by a bank
                account of MMDSmart. Foreign Currency. If you pay with foreign
                currency, you agree that the amount you are eventually credited
                may vary as a result of foreign currency conversion policies of
                our third-party payment processors, which you can find at the
                relevant website or location where you make the actual purchase.
                Recurring Charges. If you purchase a service from MMDSmart on a
                subscription basis, you agree that this type of Service requires
                a recurring payment and all payments shall be made by the
                payment method and payment intervals selected by you at the time
                you initiate the purchase, until you terminate the subscription.
                Third Party Payment Processors. We use the services of third
                parties to process your payments and we require that these third
                parties take the appropriate organizational and technical
                measures to protect your personal data and traffic data and to
                comply with relevant laws. Please review the terms of use and
                privacy policies of those third parties before providing your
                banking or payment information. Payment Through Third Party
                Services. When you make a purchase within the Application, or
                the MMDSmart Site, or the Messagewhiz Site through third
                parties, your purchase is also subject to the terms of such
                third party (including with respect to payment terms, refunds,
                etc.), and you should read such applicable terms before you
                decide to complete the purchase. You agree to abide by any
                relevant terms of service or other legal agreement that governs
                your use of a given payment processing service and/or method.
                You also acknowledge that a bank or credit card company may
                refuse or cancel a transaction and freeze funds up to 14
                business days as per the bank/credit card company policy. You
                also agree to the sharing of information between us and such
                third-party payment processor for billing related activity.
                Credit Card Payments. We accept credit cards only with 3D Secure
                for payments within the Messagewhiz Site to make your
                transactions more secure. Payments within the Messagewhiz Site
                from credit cards without 3D Secure will be rejected, and
                transactions will not be completed. Fees and Taxes. You are
                solely responsible for all carrier data plans, Internet fees,
                and other fees and taxes associated with your access to and use
                of MMDSmart Services. Using the Service on mobile applications
                will use some of the data allowance available on the data
                package to which you have subscribed with your mobile network
                operator as the case may be. Out-of-country usage may in any
                event lead to significantly higher costs than regular usage, and
                you are solely responsible for keeping yourself informed and
                paying for possible roaming and other applicable charges levied
                by your mobile network operator. MMDSmart may refuse or cancel a
                transaction at any time in our sole discretion, if we believe it
                violates MMDSmart Terms of Service or this Payment & Refund
                Policy or to prevent financial loss. In cases of fraud or
                illegal acts, MMDSmart may cancel or block your Credit Balance.{" "}
              </p>
            </div>
            <h2 className={contractcss.smallheaders}>Refund Policy </h2>
            <p className={contractcss.smallp}>
              Refund is applicable only if less than 50% of the course has been
              attended. All refunds will be refunded to the user's website
              wallet. Except as provided by law, all purchases are final and
              non-refundable. Taxes are non-refundable. If you believe that
              MMDSmart has charged you in error, you must contact MMDSmart
              within 30 days of such charge. No refunds will be given for any
              transaction which is more than 30 days old. When you purchase any
              digital content or services from MMDSmart, any right you may have
              to withdraw from or cancel the purchase will be terminated once
              the digital content is delivered to you upon your request, and you
              will not be entitled to claim any refund, except where you believe
              MMDSmart has charged you in error. If you use third party services
              to purchase any of our Services, such purchase is subject to the
              refund terms of the applicable third party (including with respect
              to payment terms, refunds, etc.). MMDSmart reserves the right to
              refuse a refund request if it reasonably believes or suspects (i)
              that you are trying to unfairly exploit this refund policy, for
              example, by making repetitive refund requests in respect of the
              same product or feature, or by trying to receive a refund for a
              non-refundable credit (such as a reward); (ii) that you are in
              breach of the terms of Policy, MMDSmart Terms of Service, the
              MessageWhiz General Terms & Conditions or the Privacy Policy;
              (iii) that you are using any of our products fraudulently or that
              your user account is being used by a third party fraudulently; or
              (iv) that you purchased your credit through a third party service
              and the terms of such third party do not allow such refund. This
              refund policy does not affect any of your statutory rights to
              pursue a claim. For all refunds due to an error in your payment
              amount please email disputes@mmdsmart.com quoting your company
              address, full name, contact number, and reason for requesting a
              refund. The accounts department will deal with your query at the
              earliest possible opportunity and may ask for some additional
              details to process your refund. Billing Disputes. Any billing
              disputes raised by you to MMDSmart will be settled in accordance
              with the MMDSmart Terms of Service. A pending billing dispute does
              not exempt you from timely paying any undisputed amounts that you
              owe.
            </p>
          </div>

          <div className={contractcss.containernav}>
            <small className={contractcss.small}>
              By clicking 'Accept' you are agreeing to our terms and policy
              policy.
            </small>
            <a className={contractcss.button} href="/InstructorHomePage">
              Accept
            </a>
          </div>
        </section>
      </main>
      ;
    </React.Fragment>
  );
};

export default Contract;