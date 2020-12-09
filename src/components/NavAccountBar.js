import {  Navbar, Nav, NavDropdown } from "react-bootstrap";
import { render } from "react-dom";

export default function NavbarAccount (req, res) {
  if (req.user) {
    return (
      <Nav className="ml-auto">
        <Nav.Link>Hi req.user</Nav.Link> 
      </Nav>
    );
  }
  else {
    return (
      <Nav className="mr-auto">
        <Nav.Link href='/login'>Login</Nav.Link>
        <Nav.Link href='/register'>Register</Nav.Link>
      </Nav>
    );
  }
}