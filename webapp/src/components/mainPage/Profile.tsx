import React, {useState, useEffect, useRef} from "react";
import { User } from "../../domain/User";
import placeholderImage from '../../images/user_icon.png';
import log_out from '../../icons/log-out.png';
import userIcon from '../../icons/user.png';
import { CustomLink } from "../CustomLink";
import { To } from "react-router-dom";
import { getProfile } from "../../api/api";


export interface UserProps {
    user?: User;
}

export default function Profile(props: UserProps): JSX.Element {
    
    const [open, setOpen] = useState(false);
    
    let menuRef = useRef<HTMLDivElement>(null);

     //Get the list of places for the current user
   const [profile, setProfile] = useState<User>();
   const refreshProfile = async () => {
    getProfile().then((user) => setProfile(user));

  }

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

    useEffect(()=>{
        refreshProfile();
    },[])

    //TODO: Add user data.
    return (
        <>
            <div className="profile-menu" ref={menuRef}>
                <div onClick={() => {setOpen(!open)}}>
                    <img id="user-icon" src={placeholderImage} alt="User icon"></img> 
                </div>
                <div className={`profile-dropdown ${open? 'profile-active' : 'profile-inactive'} noHover`}>
                    <h3>{profile?.username}<br/><span>{profile?.webId}</span></h3>
                    <ul className="dropdown-items" onClick={() => {setOpen(!open)}}>
                        <li><DropdownItem img={userIcon} text={"My profile"} linkTo={"/profile"}/></li> 
                        <li><DropdownItem img={log_out} text={"Log out"} linkTo={"/"}/></li>
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