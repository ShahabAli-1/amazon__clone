import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Components/Header/Header.js";
import Home from "./Components/Home/Home.js";
import Checkout from "./Components/Checkout/Checkout.js";
import Login from "./Components/Login/Login.js";
import Payment from "./Components/Payment/Payment.js";

import { useStateValue } from "./Components/api/StateProvider.js";
import { auth } from "./Components/config/firebase.js";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe(
  "pk_test_51JbCCAABKElmdiCjJQm8fpeAal8BULpMOhmn4RTadVgDrrmpzc11qYTLWokUicNo5vrYt0xfiZPiArmnnZ9STdXG00NT2foHiE"
);

const App = () => {
  const [{ basket }, dispatch] = useStateValue();

  //useEffect
  //piece of code that runs on a condition
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          payload: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          payload: null,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [basket]);
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};
export default App;
