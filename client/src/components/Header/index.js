import React, { useState, useContext, useRef } from "react";

/* Components */ 
import { Navbar, Container, Nav } from 'react-bootstrap';

/* CSS styles */
import "./styles.css";

/* Context */
import { UserContext } from "../../utils/UserContext";

const Header = () => {
  
    const { login, setLogin } = useContext(UserContext);
    const [ seconds, setSeconds ] = useState(5);
    
  

    const loginUser = (event) => {
      //using ternary operator
      //login of 1 = user is logged in, else user is not logged in.
      login === 0 ? setLogin(1) : setLogin(0);

      //timer function
      const interval = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds === 0) {
            setSeconds(0)
            setLogin(0)  // resets login back to 0 meaning 'not logged in'
            return clearInterval(interval)
          }
          return (seconds -= 1)
        })
      }, 1000)
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
              {login === 0 ? 
                <Nav.Link onClick={loginUser}>Login</Nav.Link> 
                : 
                <Nav.Link onClick={()=>setLogin(0)}>Logout</Nav.Link>
              }
                           
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>      
      </>
    );
  };
  
export default Header;