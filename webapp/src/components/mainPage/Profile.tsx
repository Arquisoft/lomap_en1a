import React, {useState} from "react";
import { User } from "../../domain/User";
import placeholderImage from '../../images/user_icon.png';
import log_out from '../../icons/log-out.png';
import userIcon from '../../icons/user.png';
import { CustomLink } from "../CustomLink";
import { To } from "react-router-dom";
import { LogoutButton } from "@inrupt/solid-ui-react";


export interface UserProps {
    user?: User;
}

export default function Profile(props: UserProps): JSX.Element {
    
    const [open, setOpen] = useState(false);
    
    //TODO: Add user data.
    return (
        <>
            <div className="menu-container">
                <div className="menu-trigger" onClick={() => {setOpen(!open)}}>
                    <img id="user-icon" src={placeholderImage} alt="User icon"></img> 
                </div>
                <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                    <h3>Username<br/><span>User information</span></h3>
                    <ul onClick={() => {setOpen(!open)}}>
                        <li><DropdownItem img={userIcon} text={"My profile"} linkTo={"/"}/></li> 
                        <li><DropdownItemLogout/></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

function DropdownItem(props: { img: string, text: string, linkTo: To }) {
    return (
        <>
            <li className="dropdownItem">
                <img src={props.img} alt="icon"></img>
                <div className="dropdown-links">
                    <CustomLink to={props.linkTo}>{props.text}</CustomLink>
                </div>
            </li>
        </>
    )
}

function DropdownItemLogout() {
    return (
        <>
            <li className="dropdownItem">
                <img src={log_out} alt="icon"></img>
                <div className="dropdown-links">
                    <LogoutButton>
                        <CustomLink to={"/logout"}>Log out</CustomLink>
                    </LogoutButton>
                </div>
            </li>
        </>
    )
}