import { Link} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import logo from '../../images/logo.png';
import Profile from "./Profile";
import { CustomLink } from "../CustomLink";
import { isLoggedIn } from "../../api/api";


export interface LogoutProps{
  handleLogout: (value: boolean) => Promise<void>;
}


export default function NavBar(): JSX.Element {

  const handleShow = async () => {
    isLoggedIn().then(b => {
      setShow(b);
    });
  }

  const handleLogout = async (value:boolean) => {
    setLogout(value);
  }
  const [show, setShow] = useState(false);

  const [logout, setLogout] = useState(false);

  useEffect(()=>{  
    handleShow();  
  },[]);

  useEffect(()=>{  
      handleShow();
    },[logout]);

    return (
        <nav className="menu">
            <Link to="/" className="site-title">
                <img src={logo} alt="Logo" id="logo_img"></img>
            </Link>
            {show?<LoggedNavbar handleLogout={handleLogout}/> : <NotLoggedNavbar/>}
        </nav>
       
    )
    

}

function LoggedNavbar(props:LogoutProps) {
 let host = process.env.host || "localhost";
  const reload = ()=>{
    window.location.href="http://"+host+":3000/map";
  }
  
  return (
      <ul>
        <CustomLink to="/map" onClick={reload}>Map</CustomLink>
        <Profile handleLogout={props.handleLogout}/>
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





