import React, { useState } from "react";
import { useAuth } from "../../context/userAuth";
import "../../styles/Navbar.css";
import logo from "../../assets/Netflix-Logo.png";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faUser,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { logout } = useAuth();

  const handleSignOut = () => {
    logout();
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Netflix" />
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>TV shows</li>
          <li>Movies</li>
          <li>Games</li>
          <li>New & Popular</li>
          <li>
            <Link to="/wishlist">My List</Link>
          </li>
          <li>Browse by Languages</li>
        </ul>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      <div className="navbar-right">
        <FontAwesomeIcon icon={faSearch} className="icons" />
        <p className="children">Children</p>
        <FontAwesomeIcon icon={faBell} className="icons" />
        <div className="navbar-profile">
          <FontAwesomeIcon icon={faUser} className="profile" />
          <FontAwesomeIcon icon={faCaretDown} />
          <div className="dropdown">
            <button className="signout-button" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
