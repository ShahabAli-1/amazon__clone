import React, { useState, useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "../api/StateProvider.js";
import CheckoutProduct from "../Checkout/CheckoutProduct.js";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../api/reducer";
import axios from "axios";

const Payment = () => {
  const history = useHistory();
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState("");
  const [processing, setProcessing] = useState("");
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    getClientSecret();
  }, [basket]);
  //special stripe secret which allows us to charge a customer
  //get new secret whenever basket changes

  // const getClientSecret = async () => {
  //   const response = await fetch(
  //     "http://localhost:5000/clone1-b3ca7/us-central1/api",
  //     {
  //       method: "post",
  //       url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
  //     }
  //   );
  //   const responsedata = await response.json();
  //   setClientSecret(responsedata.data.clientSecret);
  //   console.log("The secret is ", responsedata);
  // };

  const getClientSecret = async () => {
    const response = await axios.post(
      "http://localhost:5000/clone1-b3ca7/us-central1/api",
      {
        method: "post",
        //stripe expects the total in a currencies subunits
        headers: { "content-type": "application/x-www-form-urlencoded" },
        url: `/payment/create?total=${getBasketTotal(basket) * 100}`,
      }
    );
    setClientSecret(response.data.clientSecret);
    console.log("The secret is >>", clientSecret);
  };

  const handleChange = (e) => {
    //e.preventDefault();
    //listen for changes in the CardElement and
    //display any error as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (e) => {
    //prevents refreshing
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentIntent = payment confirmation
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        //using replace instead of push bcz we dont want them to
        //come back to a certain page so we switch a page using'
        //replace
        history.replace("/orders");
      });
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Payment Section => delivery Address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        {/* Payment Section => Review Item */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                price={item.price}
                rating={item.rating}
                image={item.image}
              />
            ))}
          </div>
        </div>
        {/* Payment Section => Payment Method */}
        <div className="payment__section">
          <h3>Payment Method</h3>
          <div className="payment__details">
            {/* Stripe Stuff here */}
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <p>
                        Subtotal ({basket.length} items):{" "}
                        <strong>{`${value}`}</strong>
                      </p>
                    </>
                  )}
                  decimalState={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* error */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
