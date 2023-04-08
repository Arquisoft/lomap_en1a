import { Link, useMatch, useResolvedPath,To } from "react-router-dom";
import React from 'react';

interface Props {
    to:To;
    children:any;
    onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined
    
    }

  export const CustomLink:React.FC<Props>=( {to, children,onClick }) =>{
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  

    return (
      
      <li className={isActive ? "active" : ""}>
        <Link to={to} onClick={onClick}>
          {children}
        </Link>
      </li>
    )
  }