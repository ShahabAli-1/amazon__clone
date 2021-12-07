const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51JbCCAABKElmdiCjFeOMLDwXQaqQMIWCDhMUzcNG6HBMoReya8Oum0n9YLR5T5k8c96ymsKmypcw9xh5IwulP8IC00jkhrYscK"
);

//API

//APP CONFIG
const app = express();

//MIDDLEWARES
app.use(cors({ origin: true }));
app.use(express.json());
//API ROUTES
app.get("/", (request, response) => response.status(200).send("Hello World"));
app.post("/payments/create", async (request, response) => {
  const total = request.body.total;
  console.log("Payment request recieved", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //subunits of the currency
    currency: "usd",
  });
  //201 => ok, and created something
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
//LISTEN COMMANDS

exports.api = functions.https.onRequest(app);

//example endpoint
//http://localhost:5000/clone1-b3ca7/us-central1/api
