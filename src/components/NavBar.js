import React from "react";
import './NavBar.css';
import { Link } from "react-router-dom";

const NavBar = () => (
  <nav className="navbar-flex-container">
    <main className="flex-item one-quarter">
      <Link className='text-link' to="/">Home</Link>
    </main>
    <main className="flex-item one-quarter">
      <Link className='text-link' to="/view">View Recipes</Link>
    </main>
    <main className="flex-item one-quarter">
      <Link className='text-link' to="/create">Create Recipes</Link>
    </main>
    <main className="flex-item one-quarter">
      <Link className='text-link' to="/about">What is Sourdough?</Link>
    </main>
  </nav>
);

export default NavBar;
