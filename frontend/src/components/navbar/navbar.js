/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import React, {useState} from "react";
import './navbar.css';

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src="../assets/logo.png" alt="" />
        </Link>      
      </div>
      <div className="right">

        <button className="link-button">
          <Link to= { "/aboutUs" }>
            <span>About Us</span>
          </Link>
        </button>
        <button className="link-button">
          <Link to= { "/community" }>
            <span>Community</span>
          </Link>
        </button>
        <button className="link-button">
          <Link to= { "/contactUs" }>
            <span>Contact Us</span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
