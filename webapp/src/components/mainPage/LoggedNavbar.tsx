
import { Link} from "react-router-dom";
import React from 'react';
import logo from '../../images/logo.png';
import { CustomLink } from "../CustomLink";
import { Button} from "@material-ui/core";
import { LogoutButton } from "@inrupt/solid-ui-react";


export default function LoggedNavbar() {
  return (
    <nav className="menu">
      <Link to="/" className="site-title">
        <img src={logo} alt="Logo" id="logo_img"></img>
      </Link>
      <ul>
        <CustomLink to="/map">TESTING PURPOSES</CustomLink>
        <LogoutButton>
          <Button style={{ marginTop: 20 }} variant="contained" color="primary">
            Logout
          </Button>
        </LogoutButton>
      </ul>
    </nav>
  )
}




