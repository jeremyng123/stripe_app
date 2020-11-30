import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Jumbotron, Button, Image } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import PaymentPage from "./components/PaymentComponent";
import LandingPage from './components/LandingPage';

require('dotenv').config({path:__dirname+'/../.env'})
const public_key = process.env.REACT_APP_STRIPE_TEST_PUBLIC_KEY;

export default function App() {
  console.log(public_key);
  return (
      <Router>
          {/* Define two routes, payments and then a home page */}

          <Switch>
              <Route path="/payments" >
                <PaymentPage public_key={public_key}/> 
              </Route>

              <Route path="/" component={LandingPage} />
          </Switch>
      </Router>
  );
}