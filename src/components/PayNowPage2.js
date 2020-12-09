import { Container, Jumbotron, Button, Image, Col, Form, Modal, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState, useMemo } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
import useResponsiveFontSize from "./UseResponsiveFontSize";

import Field from "./Field";
import { render } from "react-dom";
import Maesh from "maesh-test";
const axios = require("axios");

//credit card element specific styling
const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};


//submit button sub component
const SubmitButton = ({ processing, error, children, disabled }) => (
    <button
      className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
      type="submit"
      disabled={processing || disabled}
    >
        {processing ? "Processing..." : children}
    </button>
);

//component declaration
function PayNowForm(props) {

    let history = useHistory();

    const options = useOptions();

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false)
    const [processing, setProcessing] = useState(false);
    const [price, setPrice] = useState(0);
    const [refname, setRefname] = useState(0);
    const [formComplete, setFormComplete] = useState(false);

    //resets state on completion
    const reset = () => {
        setError(null);
        setProcessing(false);
        setPrice(0);
        setSuccess(false);
        setFormComplete(false);
    };

    const data = {
      api_key: props.maesh_API_KEY,
      amount: 0,
      currency: "SGD",
      referenceCode: "ABCDEFGH",
      gotoUrl: "http://localhost" + "/",
    };
    const handleSubmit = async (event) => {
        //prevent default form values
        event.preventDefault();

        if(price == 0) {
            return;
        }

        //start processing animation on submit button
        if (formComplete) {
            setProcessing(true);
        } else {
            return;
        }

        data.amount = price;
    }

    // const redirect_with_props = (ref_name) => {
    //   history.push({
    //     pathname: "/paynow/"+ ref_name,
    //     state: {
    //       ...props,
    //       price: price
    //     }
    //   });
    // }

    

    //render
    return (
        // the credit card form
        <Form className="Form" onSubmit={handleSubmit}>

            {/* Error modal */}
            <Modal show={error!=null}>
                <Modal.Header>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>{error}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={(event)=>{setError(null)}}>Close</Button>    
                </Modal.Footer>
            </Modal>

            <Modal show={processing}>
                <Modal.Header>
                    <Modal.Title>PayNow page</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your QR Code has been generated!
                    {console.log(data)}
                  <Maesh data={data} />
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="success" onClick={ (event) =>{setSuccess(true)}}>Close</Button>
                    
                </Modal.Footer>
            </Modal>


            {/* success banner, only shows after confirmation */}
            <Modal show={success}>
                <Modal.Header>
                    <Modal.Title>Payment Succeeded</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Payment received with Maesh!
                </Modal.Body>
                <Modal.Footer>
                        <Button variant="success" onClick={ () =>{history.push('/')}}>Close</Button>
                    
                </Modal.Footer>
            </Modal>

            {/* Bet amount field */}
            <Field
                label="Price"
                id="price"
                type="number"
                placeholder="10"
                required
                autoComplete="tel"
                min="1"
                value={price}
                onChange={(event) => {
                    if (event.target.value >= 0){
                        setPrice(event.target.value);
                        setFormComplete(true);
                    }
                }}
            />


            <SubmitButton
                    processing={processing}
                    error={error}
                >
                    Make Payment
            </SubmitButton>
        </Form>
    );
    
}

export default function PayNowPage(props) {
  const data = {
    api_key: props.maesh_API_KEY,
    amount: 15000  ,
    currency: "SGD",
    referenceCode: "ABCD1231H",
    gotoUrl: "https://www.proccoli.com"
  };
  console.log(data);
  return (
    <Maesh data="{data}" />
    /* Payments renders a blank screen containing our payments component */
    // <Container>
      // {/* <PayNowForm
      //   maesh_API_KEY={ props.maesh_API_KEY }
      // /> */}
      
    // </Container>
  );
}
