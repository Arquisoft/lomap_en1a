import { Link, useMatch, useResolvedPath,To } from "react-router-dom";
import React from 'react';
import logo from '../../images/logo.png';

interface Props {
    to:To;
    children:any;
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