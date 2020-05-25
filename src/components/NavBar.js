import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/view">View Recipes</Link>
    </li>
    <li>
      <Link to="/create">Create Recipes</Link>
    </li>
    <li>
      <Link to="/about">What is Sourdough?</Link>
    </li>
  </ul>
);

export default NavBar;
