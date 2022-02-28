import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

export default function NavLinks() {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/login">LOGIN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.uid}/account`}>MY ACCOUNT</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOG OUT</button>
        </li>
      )}
    </ul>
  );
}
