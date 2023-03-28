
import { Link} from "react-router-dom";
import React from 'react';
import logo from '../../images/logo.png';
import { CustomLink } from "../CustomLink";


export default function NotLoggedNavbar() {
  return (
    <nav className="menu">
      <Link to="/" className="site-title">
        <img src={logo} alt="Logo" id="logo_img"></img>
      </Link>
      <ul>
        <CustomLink to="/login" >Log in</CustomLink>
        <CustomLink to="/signup" >Sign up</CustomLink>
        <CustomLink to="/map">TESTING PURPOSES</CustomLink>
      </ul>
    </nav>
  )
}




