import { useEffect, useState } from "react";
import { User } from "../../domain/User";
import placeholderImage from '../../images/user_icon.png';
import { getProfile } from "../../api/api";

export interface UserProps {
    user?: User;
}

export default function UserProfile(props: UserProps): JSX.Element {

    //Get the list of places for the current user
    const [profile, setProfile] = useState<User>();
    const refreshProfile = async () => {
        getProfile().then((user) => setProfile(user));
    
      }

      useEffect(()=>{
        refreshProfile();
    },[])

    return (
      <>
        <div className="centered-block text-area profile-view">
          <div id="profile-pic-div"><img id="profile-pic" src={placeholderImage}></img></div>
          <ProfileAttribute label="Username" text={profile?.username}></ProfileAttribute>
        </div>
      </>
    )
}

function ProfileAttribute(props: { label: string, text?: string }) {
    return (
        <div className="profile-attribute">
            <label>{props.label}</label><br/>
            <div>{props.text}</div>
        </div>
    )
}
  