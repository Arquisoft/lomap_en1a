
import { Link, useMatch, useResolvedPath,To } from "react-router-dom";
import React from 'react';
import logo from '../../images/logo.png';


export default function Navbar() {
  return (
    <nav className="menu">
      <Link to="/" className="site-title">
        <img src={logo} alt="Logo"></img>
      </Link>
      <ul>
        <CustomLink to="/login">Log in</CustomLink>
        <CustomLink to="/signup">Sign up</CustomLink>
      </ul>
    </nav>
  )
}


interface Props {
  to:To;
  // any other props that come into the component, you don't have to explicitly define children.
  }
export const CustomLink:React.FC<Props>=( {to, children, ...props }) =>{
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

