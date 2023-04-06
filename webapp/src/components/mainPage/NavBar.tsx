import { Link} from "react-router-dom";
import React from 'react';
import logo from '../../images/logo.png';
import Profile from "./Profile";
import { CustomLink } from "../CustomLink";


interface NavBarProps{
    isLoggedIn: boolean
}

export default function NavBar(props: NavBarProps): JSX.Element {
    return (
        <nav className="menu">
            <Link to="/" className="site-title">
                <img src={logo} alt="Logo" id="logo_img"></img>
            </Link>
            {props.isLoggedIn?<LoggedNavbar/> : <NotLoggedNavbar/>}
        </nav>
       
    )
    

}

function LoggedNavbar() {
  return (
      <ul>
        <CustomLink to="/map" >Map</CustomLink>
        <li><Profile></Profile></li>
      </ul>
    
  )
}


function NotLoggedNavbar() {
  return (
      <ul>
        <CustomLink to="/login" >Log in</CustomLink>
        <CustomLink to="/signup" >Sign up</CustomLink>
      </ul>
  )
}





