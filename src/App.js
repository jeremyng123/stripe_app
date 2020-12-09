import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Jumbotron, Button, Image, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PaymentPage from "./components/PaymentComponent";
import PayNowPage from "./components/PayNowPage.js";
import LandingPage from './components/LandingPage';
import RegisterPage from './components/RegistrationPage';

require('dotenv').config({path:__dirname+'/../.env'})
const public_key = process.env.REACT_APP_STRIPE_TEST_PUBLIC_KEY;

export default function App() {
  console.log(public_key);
  return (
      <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />  
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href='/login'>Login</Nav.Link>
                <Nav.Link href='/register'>Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
        </Navbar>
        {/* Define two routes, payments and then a home page */}
        <Switch>
          {/* <Route path="/payments" >
            <PaymentPage public_key={public_key}/> 
          </Route> */}
          <Route path="/paynow">
            <PayNowPage maesh_API_KEY={process.env.REACT_APP_MAESH_TEST_API_KEY}/>
          </Route> 
          <Route path="/register" component={RegisterPage} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Router>
  );
}