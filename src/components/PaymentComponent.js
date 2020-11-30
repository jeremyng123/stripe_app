import { Container, Jumbotron, Button, Image, Card, Row, Col } from "react-bootstrap";
import React, { useMemo } from "react";
import { useHistory, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/PaymentComponent.css";
import "./css/elements.css";
import useResponsiveFontSize from "./UseResponsiveFontSize";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CreditCardForm from "./CreditCardForm";

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

//config of fonts for the stripe prebuilt elements
const ELEMENTS_OPTIONS = {
  fonts: [
      {
          cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
      },
  ],
};

//component
function PaymentComponent(props) {
  //history object for redirects
  let history = useHistory();
  const options = useOptions();

  //render
  return (
      
    //bootstrap card container
    <Card border="primary" id="paymentWidgetContainerCard">
      {/* header and back button */}
      <Card.Header>
        <Row>
          <Col md="auto">
            <Button
              variant="danger"
              onClick={() => {
                history.push("/");
              }}
            >
              Back
            </Button>
          </Col>
        </Row>
      </Card.Header>

      {/* body */}
      <Card.Body>
        {/* Elements Wrapper and checkout form component */}
        <Elements
          stripe={loadStripe(props.public_key)}
          options={options}
        >
          <CreditCardForm />
        </Elements>
      </Card.Body>
    </Card>
  );
}

function PaymentPage(props) {
  return (
    /* Payments renders a blank screen containing our payments component */
    <Container>
      <PaymentComponent
        public_key={ props.public_key }
      />
    </Container>
  );
}

export default PaymentPage;