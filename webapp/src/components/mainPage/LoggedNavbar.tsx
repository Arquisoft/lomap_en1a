
import { Link, useMatch, useResolvedPath,To } from "react-router-dom";
import React from 'react';
import logo from '../../images/logo.png';
import { CustomLink } from "../CustomLink";
import { Button} from "@material-ui/core";
import { LogoutButton } from "@inrupt/solid-ui-react";
import Profile from "./Profile";
import { User } from "../../domain/User";


export default function LoggedNavbar() {
  return (
    <nav className="menu">
      <Link to="/" className="site-title">
        <img src={logo} alt="Logo" id="logo_img"></img>
      </Link>
      <ul>
        <LogoutButton>
          <Button style={{ marginTop: 20 }} variant="contained" color="primary">
            Logout
          </Button>
        </LogoutButton>
        <Profile user={new User("1", "hello", "pod")}></Profile>
      </ul>
    </nav>
  )
}




