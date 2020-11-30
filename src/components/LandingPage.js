import { Container, Jumbotron, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

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
        <Link to="/payments" type="Button">
          <Button variant="success">
            Make a payment
          </Button>
        </Link>
      </Jumbotron>
    </Container>
  );
}

export default LandingPage;