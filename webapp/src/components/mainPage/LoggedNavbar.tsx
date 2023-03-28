
import { Link} from "react-router-dom";
import React from 'react';
import logo from '../../images/logo.png';
import Profile from "./Profile";
import { User } from "../../domain/User";


export default function LoggedNavbar() {
  return (
    <nav className="menu">
      <Link to="/" className="site-title">
        <img src={logo} alt="Logo" id="logo_img"></img>
      </Link>
      <ul>
        <li><Profile></Profile></li>
      </ul>
    </nav>
  )
}




