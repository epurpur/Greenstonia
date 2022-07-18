import React, { useState, useContext, } from "react";

/* Components */ 
import { Navbar, Container, Nav, Alert, Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginModal from "../LoginModal";

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
    //sets state of Modal for login button
    const [showModal, setShowModal] = useState(false);
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
      console.log('name:', name, 'value:', value)
    }



    const handleUserLogin = (event) => {
      //login of 1 = user is logged in, else user is not logged in.
      if (login === 0) {
        setLogin(1)
        makeAlert()
        handleCloseModal() // remove modal
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
                <Nav.Link onClick={handleShowModal}>Login</Nav.Link> 
                : 
                <Nav.Link onClick={handleUserLogin}>Logout</Nav.Link>
              }
                           
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar> 
        <Modal id='loginModalForm' show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
            <Form>
              <Form.Group className="m-3">
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                    name="email"
                    value={formState.email || ''}
                    onChange={handleChange}
                    required
                />
              </Form.Group>
              <Form.Group className="m-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                    name="password"
                    value={formState.password || ''}
                    onChange={handleChange}
                    required
                />
              </Form.Group>
            </Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            {/* <Button variant="primary" onClick={handleUserLogin}>Login</Button> */}
            <Button className="btnFormSend" variat="outline-success" onClick={handleUserLogin}>Login</Button>
          </Modal.Footer>
        </Modal>
        {/* render login/logout alert */}
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