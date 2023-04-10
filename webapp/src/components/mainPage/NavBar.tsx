import { Link, useLocation} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import logo from '../../images/logo.png';
import Profile from "./Profile";
import { CustomLink } from "../CustomLink";
import { isLoggedIn } from "../../api/api";


export default function NavBar(): JSX.Element {




  const [show, setShow] = useState(false);

  useEffect(()=>{
  
    isLoggedIn().then(b => {
      setShow(b);
    });
    

  }
  ,[])

    return (
        <nav className="menu">
            <Link to="/" className="site-title">
                <img src={logo} alt="Logo" id="logo_img"></img>
            </Link>
            {show?<LoggedNavbar/> : <NotLoggedNavbar/>}
        </nav>
       
    )
    

}

function LoggedNavbar() {
  return (
      <ul>
        <CustomLink to="/map" >Map</CustomLink>
        <Profile></Profile>
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





