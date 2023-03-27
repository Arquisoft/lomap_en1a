
import { Link, useMatch, useResolvedPath, To } from "react-router-dom";
import React from 'react';
import logo from '../../images/logo.png';
import { CustomLink } from "../CustomLink";
import { Button } from "@material-ui/core";
import { LogoutButton } from "@inrupt/solid-ui-react";


export default function LoggedNavbar() {
  return (
    <nav className="menu">
      <Link to="/" className="site-title">
        <img src={logo} alt="Logo" id="logo_img"></img>
      </Link>
      <ul>
        <li>
          <LogoutButton>
            <CustomLink to="/logout">Logout</CustomLink>
          </LogoutButton>
        </li>
      </ul>
    </nav>
  )
}




