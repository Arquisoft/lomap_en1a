import { Link} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import logo from '../../images/logo.png';
import Profile from "./Profile";
import { CustomLink } from "../CustomLink";
import { useCookies } from "react-cookie";



export default function NavBar(): JSX.Element {
  const [cookies,setCookie] = useCookies(["user"]);

  const handleShow = async () => {
    /*isLoggedIn().then(b => {
      setShow(b);
    });*/
    if(cookies.user==="true"){
      setShow(true);
    }else{
      setShow(false);
    }
  }


  const [show, setShow] = useState(false);

  const [logout, setLogout] = useState(false);

  useEffect(()=>{  
    handleShow();  
  },[]);

  useEffect(()=>{  
      handleShow();
    },[cookies]);

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
 let host = process.env.host || "localhost";
  const reload = ()=>{
    window.location.href="http://"+host+":3000/map";
  }
  
  return (
      <ul>
        <CustomLink to="/map" onClick={reload}>Map</CustomLink>
        <Profile/>
      </ul>
    
  )
}


function NotLoggedNavbar() {
  return (
      <ul>
        <CustomLink to="/login" >Log in</CustomLink>
      </ul>
  )
}





