import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import logo from '../../images/logo.png';
import Profile from "./Profile";
import { CustomLink } from "../CustomLink";
import { isLoggedIn } from "../../api/api";


export interface LogoutProps {
  handleLogout: (value: boolean) => Promise<void>;
}


export default function NavBar(): JSX.Element {
  //const [cookies,setCookie] = useCookies();

  //Better to use this here instead of the cookie
  const handleShow = async () => {
    isLoggedIn().then(b => {
      setShow(b);
    });
  }

  const handleLogout = async (value: boolean) => {
    setLogout(value);
  }
  const [show, setShow] = useState(false);

  const [logout, setLogout] = useState(false);

  useEffect(() => {
    handleShow();
  }, []);

  useEffect(() => {
    handleShow();
  }, [logout]);

  return (
    <nav className="menu">
      <Link to="/" className="site-title">
        <img src={logo} alt="Logo" id="logo_img"></img>
      </Link>
      {show ? <LoggedNavbar handleLogout={handleLogout} /> : <NotLoggedNavbar />}
    </nav>

  )


}

function LoggedNavbar(props: LogoutProps) {
  const getUrl = () => {
    let host = process.env.host || "localhost";
    let url = window.location.href;
    if (url.includes("https")) {
      return "https://" + host + ":3443/map"
    } else {
      return "http://" + host + ":3080/map"
    }

  }

  //This is necessary because of a bug with Open layers. The page must be reloaded
  const reload = () => {
    let url = getUrl();
    window.location.href = url;
  }

  return (
    <ul>
      <CustomLink to="/map" onClick={reload}>Map</CustomLink>
      <Profile handleLogout={props.handleLogout} />
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





