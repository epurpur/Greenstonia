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
    const [ seconds, setSeconds ] = useState(5);  //timer set to 45 minutes (45mins x 60sec)

    //sets alert message when logging in or out
    const [loginAlert, setLoginAlert] = useState(0);
    const [loginAlertSeconds, setLoginAlertSeconds] = useState(3);
    const [logoutAlert, setLogoutAlert] = useState(0);
    const [logoutAlertSeconds, setLogoutAlertSeconds] = useState(3);

    const loginUser = (event) => {
      //using ternary operator
      //login of 1 = user is logged in, else user is not logged in.
      login === 0 ? setLogin(1) : setLogin(0);

      // //timer function
      const interval = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds === 0) {
            setSeconds(5)
            setLogin(0)  // resets login back to 0 meaning 'not logged in'
            return clearInterval(interval)
          }
          return (seconds -= 1)
        })
      }, 1000)

      // set CSS message flash across the screen
      makeLoginAlert()
    }

    const makeLoginAlert = () => {
      // if the alert is set to 0, it is toggled off
      loginAlert === 0 ? setLoginAlert(1) : setLoginAlert(0);

      //timer function. I only want the alert to show for a few seconds
      const interval = setInterval(() => {
        setLoginAlertSeconds((seconds) => {
          if (seconds === 0) {
            //reset login alerts back to original state
            setLoginAlertSeconds(3)
            setLoginAlert(0)
            // logoutUser()    START HERE. FIGURE OUT THE LOGIN/LOGOUT
            return clearInterval(interval)
          }
          return (seconds - 1)
        })
      }, 1000)
    }

    const logoutUser = () => {
      //set login back to 0 (logged out)
      setLogin(0)

      // if the alert is set to 0, it is toggled off
      logoutAlert === 0 ? setLoginAlert(1) : setLoginAlert(0);

      //timer function. I only want the alert to show for a few seconds
      const interval = setInterval(() => {
        setLoginAlertSeconds((seconds) => {
          if (seconds === 0) {
            //reset logout alerts back to original state
            setLogoutAlertSeconds(3)
            setLogoutAlert(0)
            return clearInterval(interval)
          }
          return (seconds - 1)
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
              <Nav.Link><Link className="navLink" to='/home'>Home</Link></Nav.Link>
              <Nav.Link><Link className="navLink" to='/history'>History</Link></Nav.Link>
              <Nav.Link><Link className="navLink" to='/contact'>Contact</Link></Nav.Link>
              <Nav.Link>{login}</Nav.Link>
            </Nav>
            <Nav>
              {login === 0 ? 
                <Nav.Link onClick={loginUser}>Login</Nav.Link> 
                : 
                <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
              }
                           
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar> 
        {loginAlert === 1 ?
          <Alert className='alertText' variant='info'>You are now logged in</Alert> : null
        }
        {logoutAlert === 1 ?
          <Alert className='alertText' variant='error'>You are now logged out</Alert> : null
        }
      </>
    );
  };
  
export default Header;