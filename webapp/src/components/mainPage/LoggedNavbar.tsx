
import { Link, useMatch, useResolvedPath,To } from "react-router-dom";
import React from 'react';
import logo from '../../images/logo.png';
import { CustomLink } from "../CustomLink";


export default function LoggedNavbar() {
  return (
    <nav className="menu">
      <Link to="/" className="site-title">
        <img src={logo} alt="Logo"></img>
      </Link>
      <ul>
        <CustomLink to="/map">TESTING PURPOSES</CustomLink>
      </ul>
    </nav>
  )
}




