import { Container, Jumbotron, Button, Image, Card, Row, Col } from "react-bootstrap";
import React, { useMemo } from "react";
import { useHistory, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./css/widgetContainer.css";
import "./css/elements.css";
import useResponsiveFontSize from "./UseResponsiveFontSize";

//component
function LoginComponent(props) {
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
            Login Page
          </Col>
        </Row>
      </Card.Header>

      {/* body */}
      <Card.Body>
        <LoginForm />
      </Card.Body>
    </Card>
  );
}

function LoginPage(props) {
  return (
    /* Payments renders a blank screen containing our payments component */
    <Container>
      <LoginComponent />
    </Container>
  );
}

export default LoginPage;