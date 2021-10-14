import React, {useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';

// Mutations
import { ADD_USER, LOGIN_USER } from '../../utils/mutations';

// Context 
import { UserContext } from '../../utils/UserContext';

// Styles
import '../../pages/Register/styles.css'

const ContractorRegistrationForm = () => {

    // define userRole context
    const { userRole, setUserRole } = useContext(UserContext);

    // get user input values from form. Start by setting values in state
    const [ userInfo, setUserInfo ] = useState({
        username: '',
        password: '',
        email: '',
        phoneNumber: '',
        licenseNumber: '',
        roleId: '1',
        description: ''
    });

    // invoke useMutation hook to allow adding new user
    const [addUser, {error, data}] = useMutation(ADD_USER);
    //invoke useMutation hook to allow login
    const [ login, { error:err, data:loginData } ] = useMutation(LOGIN_USER);  


    //update state based on form input changes
    const handleChange = (event) => {
        const {name, value} = event.target;

        // spreads apart userInfo and sets name: value into it
        setUserInfo({
            ...userInfo,
            [name]: value,
        });

    };


    //submit user input to create new user in DB, then log in user
    const handleFormSubmit = async (event) => {

        //logs current value of userInfo
        console.log('User Info upon submission:: ', userInfo);

        
        try {
            // takes data and executes addUser mutation
            const { data } = await addUser({
                variables: {...userInfo}

            });

            // takes data and logs user in
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        };

        // clear form values
        setUserInfo({
            username: '',
            password: '',
            email: '',
            phoneNumber: '',
            licenseNumber: '',
            roleId: '1',
            description: ''
        });

        //get roleId value of user from localstorage
        const roleId = localStorage.getItem('roleId');

        //setUserRole context to value of roleId
        setUserRole(roleId);
    }




    return (
        <section className="registrationForm">
            <h1 className="formTitle">Register as licensed contractor</h1>
            <form>
                <label>Username:</label>
                <input 
                    placeholder="username" 
                    name="username" 
                    value={userInfo.username} 
                    onChange={handleChange} 
                    type="text"
                    required 
                />
                <label required>Password:</label>
                <input 
                    placeholder="password"
                    name="password"
                    value={userInfo.password}
                    onChange={handleChange}
                    type="password"
                    required
                />
                <label required>Email:</label>
                <input 
                    placeholder="youremail@email.com"
                    name="email"
                    value={userInfo.email} 
                    onChange={handleChange}
                    type="email"
                    required
                />
                <label>Phone:</label>
                <input 
                    placeholder="123-456-7890" 
                    name="phoneNumber"
                    value={userInfo.phoneNumber}
                    onChange={handleChange}
                    type="tel"
                    required
                />
                <label>Contractor License Number:</label>
                <input 
                    placeholder="Valid contractor license #"
                    name="licenseNumber"
                    value={userInfo.licenseNumber}
                    onChange={handleChange}
                    type="text"
                    required
                />
                <label required>Description:</label>
                <textarea 
                    placeholder="Write a summary about yourself describing who you are and what you are looking for" 
                    name="description"
                    value={userInfo.description}
                    onChange={handleChange}
                    type="text"
                    required
                />
                <Link to='/LandingPage' onClick={handleFormSubmit}>
                    <button>Submit</button>
                </Link>
            </form>
        </section> 
    )
}

export default ContractorRegistrationForm;
