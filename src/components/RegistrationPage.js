import { Container, Jumbotron, Button, Image, Card, Row, Col } from "react-bootstrap";
import React, { useMemo } from "react";
import { useHistory, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/widgetContainer.css";
import "./css/elements.css";
import useResponsiveFontSize from "./UseResponsiveFontSize";

import RegisterAccount from "./forms/RegisterAccount";

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

//component
function RegisterAccountComponent(props) {
  //history object for redirects
  let history = useHistory();
  const options = useOptions();

  //render
  return (
      
    //bootstrap card container
    <Card border="primary" id="widgetContainerCard">
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
        <RegisterAccount />
      </Card.Body>
    </Card>
  );
}

export default function RegistrationPage(props) {
  return (
    /* Payments renders a blank screen containing our payments component */
    <Container>
      <RegisterAccountComponent />
    </Container>
  );
}
