import React from "react";

/* Components */ 
import { Navbar, Container, Nav } from 'react-bootstrap';

/* CSS styles */
import "./styles.css";

const Header = () => {
  
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="#home" id='logo'>Greenstonia</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#features">Weather</Nav.Link>
              <Nav.Link href="#pricing">Areas</Nav.Link>
              <Nav.Link href="#history">History</Nav.Link>
              <Nav.Link href="#Contact">Contact</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>      
      </>
    );
  };
  
  export default Header;