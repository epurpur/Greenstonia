import React, {useContext} from 'react';
import { UserContext } from '../../utils/UserContext';

import './styles.css';

import ContractorRegistrationForm from '../../components/ContractorRegistrationForm';
import WorkerRegistrationForm from '../../components/WorkerRegistrationForm';

const Register = () => {

    const { userRole, setUserRole } = useContext(UserContext);

    return (
        <div>
            {/* Either show contractor or worker registration form depending on value of userType */}
            {userRole === '1' ? <ContractorRegistrationForm /> : <WorkerRegistrationForm />}
        </div>
    )
}

export default Register;
