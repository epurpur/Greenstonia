import React, { useState, useContext } from "react";

/* Components */ 
import { Navbar, Container, Nav } from 'react-bootstrap';

/* CSS styles */
import "./styles.css";

/* Context */
import { UserContext } from "../../utils/UserContext";

const Header = () => {
  
    const {login, setLogin} = useContext(UserContext);

    const loginUser = (event) => {
      //using ternary operator
      login === 0 ? setLogin(1) : setLogin(0);
    }

    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/home" id='logo'>Greenstonia</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/history">History</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>Login</Nav.Link>
              <button onClick={loginUser}>{login}</button>
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>      
      </>
    );
  };
  
  export default Header;