import React, { useState, useContext, } from "react";

/* Components */ 
import { Navbar, Container, Nav, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* CSS styles */
import "./styles.css";

/* Context */
import { UserContext } from "../../utils/UserContext";

const Header = () => {
  
    const { login, setLogin } = useContext(UserContext);
    const [seconds, setSeconds] = useState(3)
    //sets alert message when logging in or out
    const [loginAlert, setLoginAlert] = useState(0);
    const [logoutAlert, setLogoutAlert] = useState(0);

    const handleUserLogin = (event) => {
      //login of 1 = user is logged in, else user is not logged in.
      if (login === 0) {
        setLogin(1)
        makeAlert()
      } else {
        setLogin(0)
        makeAlert()
      }

    }

    const makeAlert = () => {
      // makes either login or logout alert on screen just below header bar

      if (login === 0) {
        // user has just logged in
        setLogoutAlert(0)  // get rid of logout alert if it exists
        setLoginAlert(1)
        

        //timer function. I only want the alert to show for a few seconds
        const interval = setInterval(() => {
          setSeconds((seconds) => {
            if (seconds === 0) {
              //reset login alerts back to original state
              setSeconds(3)
              setLoginAlert(0)
              return clearInterval(interval)
            }
            return (seconds - 1)
          })
        }, 1000)

      } else {
        // user has just logged out
        setLoginAlert(0)  // get rid of login alert if it exists
        setLogoutAlert(1)

        //timer function. I only want the alert to show for a few seconds
        const interval = setInterval(() => {
          setSeconds((seconds) => {
            if (seconds === 0) {
              //reset logout alerts back to original state
              setSeconds(3)
              setLogoutAlert(0)
              return clearInterval(interval)
            }
            return (seconds - 1)
          })
        }, 1000)
      }
    }


    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
          <Navbar.Brand href="/home" id='logo'>Greenstonia</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link><Link className="navLink" to='/home'>Home</Link></Nav.Link>
              <Nav.Link><Link className="navLink" to='/history'>History</Link></Nav.Link>
              <Nav.Link><Link className="navLink" to='/contact'>Contact</Link></Nav.Link>
              <Nav.Link>{login}</Nav.Link>
            </Nav>
            <Nav>
              {login === 0 ? 
                <Nav.Link onClick={handleUserLogin}>Login</Nav.Link> 
                : 
                <Nav.Link onClick={handleUserLogin}>Logout</Nav.Link>
              }
                           
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar> 
        {loginAlert === 1 ?
          <Alert className='alertText' variant='info'>You are now logged in</Alert> : null
        }
        {logoutAlert === 1 ?
          <Alert className='alertText' variant='success'>You are now logged out</Alert> : null
        }
      </>
    );
  };
  
export default Header;