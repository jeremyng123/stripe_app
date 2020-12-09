//Import Maesh from the package
import React, { Component } from "react";
import Maesh from "maesh";

// Prepare an object to pass as props to the component
const data = {
  api_key: "28577491594051d8861b844371f11a0e8a973fe6",
  amount: 21700,
  currency: "SGD",
  referenceCode: "ABCDEFGH",
  gotoUrl: "https://merchant.com/success",
};

export default class CheckoutPage extends Component {
  render() {
    // Send the object as props to the component
    return <Maesh data={data} />;
  }
}