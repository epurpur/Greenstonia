import React, { useState, useContext, useEffect } from "react";

/* Components */ 
import { Navbar, Container, Nav, Alert, Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* CSS styles */
import "./styles.css";

/* Context */
import { UserContext } from "../../utils/UserContext";
import { PageContext } from "../../utils/PageContext";

const Header = () => {

    //global page context variable of page state
    const { pageName, setPageName } = useContext(PageContext);

    //global user context variable of login state
    const { login, setLogin } = useContext(UserContext);
    //seconds count used for various login timers
    const [seconds, setSeconds] = useState(3) // 3 seconds
    //sets alert message when logging in or out
    const [loginAlert, setLoginAlert] = useState(false);
    const [logoutAlert, setLogoutAlert] = useState(false);

    //sets state of Modal for login button
    const [showModal, setShowModal] = useState(false);
    const [loginError, setLoginError] = useState(false);
    // opens and closes modal
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    //handles input in Login modal
    const [ formState, setFormState ] = useState({ username: '', password: ''})
    const handleChange = (event) => {
      const {name, value} = event.target;
      setFormState({
        ...formState,
        [name]: value
      })
    }

    const handleUserLogin = (event) => {
      //login of true = user is logged in, else user is not logged in.
      if (login === false) {
        // first check for valid login credentials
        // username should be 'admin' and password 'greenstonia' (all lower case)
        if (formState.username === 'admin' && formState.password === 'greenstonia') {
          setFormState({username: '', password: ''}) // set formState of user back to empty quotes
          setLogin(true)  // user is logged in
          makeAlert() // make login alert
          handleCloseModal() // remove modal
        } else {
          // make error message to notify user of incorrect credentials
          makeLoginError()
        }

      } else {
        setLogin(false)
        makeAlert()
      }
    }

    const makeAlert = () => {
      // makes either login or logout alert on screen just below header bar

      if (login === false) {
        // user has just logged in
        setLogoutAlert(false)  // get rid of logout alert if it exists
        setLoginAlert(true)
        

        //timer function. I only want the alert to show for a few seconds
        const interval = setInterval(() => {
          setSeconds((seconds) => {
            if (seconds === 0) {
              //reset login alerts back to original state
              setSeconds(3)
              setLoginAlert(false)
              return clearInterval(interval)
            }
            return (seconds - 1)
          })
        }, 1000)

      } else {
        // user has just logged out
        setLoginAlert(false)  // get rid of login alert if it exists
        setLogoutAlert(true)

        //timer function. I only want the alert to show for a few seconds
        const interval = setInterval(() => {
          setSeconds((seconds) => {
            if (seconds === 0) {
              //reset logout alerts back to original state
              setSeconds(3)
              setLogoutAlert(false)
              return clearInterval(interval)
            }
            return (seconds - 1)
          })
        }, 1000)
      }
    }

    const makeLoginError = () => {
      // flash error across modal screen for incorrect login credentials
      // set loginError to true
      setLoginError(true)

      // flash login alert for 3 seconds
      const interval = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds === 0) {
            //reset login alerts back to original state
            setSeconds(3)
            setLoginError(false)
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
              {login === false ? 
                <Nav.Link onClick={handleShowModal}>Login</Nav.Link> 
                : 
                <>
                  <Nav.Link onClick={handleUserLogin}>Logout</Nav.Link>
                  <Nav.Link><Link to='/editorPage' id="editorBtn"> Add {pageName}</Link> </Nav.Link>
                  <Nav.Link id="editorBtn"> Delete {pageName} </Nav.Link>
                </>
              }
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar> 
        <Modal id='loginModalForm' show={showModal} onHide={handleCloseModal}>
          {!loginError ? <Modal.Header id='loginModalHeader'>
            <Modal.Title id="loginHeaderText">Login</Modal.Title>
          </Modal.Header> 
          : 
          <div id="loginError">Incorrect Username or Password</div>
          }
            <Form>
              <Form.Group className="m-3 loginModalText">
                <Form.Label>Username:</Form.Label>
                <Form.Control 
                    name="username"
                    value={formState.username || ''}  //sets initial state to empty string
                    onChange={handleChange}
                    required
                />
              </Form.Group>
              <Form.Group className="m-3 loginModalText">
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                    name="password"
                    value={formState.password || ''} //sets initial state to empty string
                    onChange={handleChange}
                    type="password"
                    required
                />
              </Form.Group>
            </Form>
          <Modal.Footer id='loginModalFooter'>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            {/* <Button variant="primary" onClick={handleUserLogin}>Login</Button> */}
            <Button className="btnFormSend" id="loginBtnText" onClick={handleUserLogin}>Login</Button>
          </Modal.Footer>
        </Modal>
        {/* render login/logout alert */}
        {loginAlert === true ?
          <Alert className='alertText' variant='info'>You are now logged in</Alert> : null
        }
        {logoutAlert === true ?
          <Alert className='alertText' variant='success'>You are now logged out</Alert> : null
        }
      </>
    );
  };
  
export default Header;