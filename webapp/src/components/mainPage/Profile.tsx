import React, {useState, useEffect, useRef, Ref, Component} from "react";
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
    
    let menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let handler = (e : Event) => {
            if ((menuRef) != null && menuRef.current != null) {
                if (!menuRef.current.contains(e.target as Node)) {
                    setOpen(false);
                }
            }
        };
        document.addEventListener("mousedown", handler);

        return() => {
            document.removeEventListener("mousedown", handler);
        }
    })

    //TODO: Add user data.
    return (
        <>
            <div className="profile-menu" ref={menuRef}>
                <div onClick={() => {setOpen(!open)}}>
                    <img id="user-icon" src={placeholderImage} alt="User icon"></img> 
                </div>
                <div className={`profile-dropdown ${open? 'profile-active' : 'profile-inactive'} noHover`}>
                    <h3>Username<br/><span>User information</span></h3>
                    <ul className="dropdown-items">
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
        <ul>
            <li className="dropdown-item">
                <img src={props.img} alt="icon"></img>
                <div className="dropdown-links">
                    <CustomLink to={props.linkTo}>{props.text}</CustomLink>
                </div>
            </li>
        </ul>
    )
}

function DropdownItemLogout() {
    return (
        <ul>
            <li className="dropdown-item">
                <img src={log_out} alt="icon"></img>
                <div className="dropdown-links">
                    <LogoutButton>
                        <CustomLink to={"/logout"}>Log out</CustomLink>
                    </LogoutButton>
                </div>
            </li>
        </ul>
    )
}