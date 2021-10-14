import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../utils/UserContext";
import Auth from "../../utils/auth";

/* CSS styles */
import "./styles.css";

const Header = () => {
  const { userRole, setUserRole } = useContext(UserContext);
  // TO DO: ADD SOME LOGIC TO CHECK IF USER IS LOGGED IN, RENDER DIFFERENT BUTTONS IF YES

  const logoutUser = (event) => {
    // logs user out. destroys login token and userId in local storage
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>
      <h1 id="logo">
        Contra<span className="text-emphasis">List</span>
      </h1>
      {userRole.roleId === "" ? (
        <section id="navButtons">
          <Link to="/" className="navButton" style={{ textDecoration: "none" }}>Home</Link>
          <Link to="/Login" className="navButton" style={{ textDecoration: "none" }}>Login</Link>
        </section>
      ) : (
        <section id="navButtons">
          <Link to="/" className="navButton" style={{ textDecoration: "none" }}>Home</Link>
          <Link to="/Logout" className="navButton" onClick={logoutUser} style={{ textDecoration: "none" }}>Logout</Link>
        </section>
      )}
    </header>
  );
};

export default Header;
