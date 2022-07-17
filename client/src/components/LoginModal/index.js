import React from 'react';
import { Link } from 'react-router-dom';

/* CSS styles */
import "./styles.css";

const LoginModal = () => {
  return (
    <>
     <div className="modalBackground">
        <div className="modalContainer"> 
            <div className="modalTitle">
                <h2>Type username and password</h2>
            </div>
            <div className="modalBody">
                <textArea>username here</textArea>
                <textArea>password here</textArea>
            </div>
            <div className="modalFooter">
                <button>Cancel</button>
                <button>Continue</button>
            </div>
        </div>     
    </div>   

    </>
  )
}

export default LoginModal;