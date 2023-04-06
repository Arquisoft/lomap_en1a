import { User } from "../../domain/User";
import placeholderImage from '../../images/user_icon.png';

export interface UserProps {
    user?: User;
}

export default function UserProfile(props: UserProps): JSX.Element {
    return (
      <>
        <div className="centered-block text-area profile-view">
          <div id="profile-pic-div"><img id="profile-pic" src={placeholderImage}></img></div>
          <ProfileAttribute label="Username" text="Username"></ProfileAttribute>
        </div>
      </>
    )
}

function ProfileAttribute(props: { label: string, text: string }) {
    return (
        <div className="profile-attribute">
            <label>{props.label}</label><br/>
            <div>{props.text}</div>
        </div>
    )
}
  