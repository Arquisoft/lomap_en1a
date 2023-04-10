import { Link, useLocation} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import logo from '../../images/logo.png';
import Profile from "./Profile";
import { CustomLink } from "../CustomLink";


/*export interface NavBarProps {
  isLoggedIn: boolean;
}*/

export default function NavBar(/*props: NavBarProps*/): JSX.Element {

  //FIXME: temporal
  var url = useLocation();
  const [show,setShow] = useState(false);

  //FIXME:temporal
  useEffect(() => {
    if(url.pathname!=="/" && url.pathname!=="/login"){
      setShow(true)
    }else{
      setShow(false)
    }
  }, [url]);

    return (
        <nav className="menu">
            <Link to="/" className="site-title">
                <img src={logo} alt="Logo" id="logo_img"></img>
            </Link>
            {/*props.isLoggedIn*/ show?<LoggedNavbar/> : <NotLoggedNavbar/>}
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





