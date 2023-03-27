import React, {useState} from "react";
import { User } from "../../domain/User";
import placeholderImage from '../../images/user_icon.png';
import log_out from '../../icons/log-out.png';
import userIcon from '../../icons/user.png';


export interface UserProps {
    user: User;
}

export default function Profile(props: UserProps): JSX.Element {
    
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="menu-container">
                <div className="menu-trigger" onClick={() => {setOpen(!open)}}>
                    <img id="user-icon" src={placeholderImage} alt="User icon"></img>
                </div>
                <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
                    <h3>Username<br/><span>User information</span></h3>
                    <ul>
                        <DropdownItem img={userIcon} text={"My profile"}/>
                        <DropdownItem img={log_out} text={"Log out"}/>
                    </ul>
                </div>
            </div>
        </>
    )
}

function DropdownItem(props: { img: string, text: string }) {
    return (
        <>
            <li className="dropdownItem">
                <img src={props.img}></img>
                <a className="dropdown-links">{props.text}</a>
            </li>
        </>
    )
}