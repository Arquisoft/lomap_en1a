import React, {useState, useEffect, useRef} from "react";
import { User } from "../../domain/User";
import placeholderImage from '../../images/user_icon.png';
import log_out from '../../icons/log-out.png';
import userIcon from '../../icons/user.png';
import { CustomLink } from "../CustomLink";
import { To } from "react-router-dom";
import { getProfile,logout } from "../../api/api";
import { LogoutProps } from "./NavBar";
import { useCookies } from "react-cookie";



export default function Profile(props:LogoutProps): JSX.Element {
   const [cookies,setCookie] = useCookies();
   const [open, setOpen] = useState(false);
    
   let menuRef = useRef<HTMLDivElement>(null);

   const [profile, setProfile] = useState<User>();
   const refreshProfile = async () => {
    getProfile().then((user) => setProfile(user));

  }

  const handleLogout = async () => {
    logout().then(()=>{
        setCookie('isLogged','false')
        props.handleLogout(true);
    });
    

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
                        <li><DropdownItem img={log_out} text={"Log out"} linkTo={"/"} onClick={handleLogout}/></li>
                    </ul>
                </div>
            </div>
        </>
    )
}

function DropdownItem(props: { img: string, text: string, linkTo: To, onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined }) {
    return (
        <ul>
            <li className="dropdown-item">
                <img src={props.img} alt="icon"></img>
                <ul className="dropdown-links">
                    <CustomLink to={props.linkTo} onClick={props.onClick}>{props.text}</CustomLink>
                </ul>
            </li>
        </ul>
    )
}