import { Container, Jumbotron, Button, Image, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
const ColoredLine = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 5
      }}
  />
);
function LandingPage(props) {
  return (
    /* The Homepage just displays some text and a button that links to payments */
    <Container style={{ padding: "10px" }}>
      <Jumbotron>
        <h1>STRIPE API Demo</h1>
        <h3>
          Look at the different methods to 
          payment using STRIPE API
        </h3>
        <p>
          Make a payment intent for a non-Stripe 
          user to make a payment using Stripe
        </p>
        <Link to="/payments" type="Button">
          <Button variant="success">
            Make a payment
          </Button>
        </Link>
        <ColoredLine color='red'/>
        <p>
          Make a payment using Maesh API. Basically PayNow
        </p>
        <Link to="/paynow" type="Button">
          <Button variant="success">
            PayNow
          </Button>
        </Link>
      </Jumbotron>
    </Container>
  );
}

export default LandingPage;