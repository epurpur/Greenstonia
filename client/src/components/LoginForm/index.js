import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { UserContext } from '../../utils/UserContext';

// Queries and Mutations
import { LOGIN_USER } from '../../utils/mutations';


const LoginForm = () => {

    const { userRole, setUserRole } = useContext(UserContext);
    const [ formState, setFormState ] = useState({ email: '', password: '' });
    const [ login, { error, data } ] = useMutation(LOGIN_USER);  

    // update state based on form input changes
    const handleChange = (event) => {
      const { name, value } = event.target;
      
      setFormState({
        ...formState,
        [name]: value,
      });
    };


    // submit form
    const handleFormSubmit = async (event) => {

      // logs current value of formState
      console.log('formState upon submission ::', formState);
      
      //locally validate credentials before try block
      //check if email is a valid format
      //check for empty values

      // takes data and executes login mutation
      try {
        const { data } = await login({
          variables: { ...formState },
        });

        // takes login token as well as userId (which is decoded) and stores it in local storage
        Auth.login(data.login.token);
      } catch (e) {
        console.error(e);
      }

      // clear form values
      setFormState({
        email: '',
        password: '',
      });      

      //get roleId value of user from localstorage
      const roleId = localStorage.getItem('roleId');

      //setUserRole context to value of roleId
      setUserRole(roleId);
    };
  

    //upon page load, log if user is logged in or not
    console.log("Logged In?", Auth.loggedIn())


    return (
        <section className="loginForm">
            <h1 className="formTitle">Login</h1>
            <form>
                <label>Email:</label>
                <input 
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                />
                <label>Password:</label>
                <input 
                    type="password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    required
                />
                <Link to='/LandingPage' onClick={handleFormSubmit}>
                  {/* use the useHistory hook to redirect to LandingPage if login is successful */}
                  <button>Submit</button>
                </Link>
            </form>
        </section> 
    )
}

export default LoginForm;
