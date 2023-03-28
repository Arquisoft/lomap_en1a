import React, {useState} from "react";
import { User } from "../../domain/User";
import placeholderImage from '../../images/user_icon.png';
import log_out from '../../icons/log-out.png';
import userIcon from '../../icons/user.png';
import { CustomLink } from "../CustomLink";


export interface UserProps {
    user: User;
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
                    <h3>{props.user.getUsername}Username<br/><span>User information</span></h3>
                    <ul>
                        <li><DropdownItem img={userIcon} text={"My profile"} linkTo={"/"}/></li> 
                        <li><DropdownItem img={log_out} text={"Log out"} linkTo={"/logout"}/></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

function DropdownItem(props: { img: string, text: string, linkTo: string }) {
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