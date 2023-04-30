import { useEffect, useState } from "react";
import { User } from "../../domain/User";
import placeholderImage from '../../images/user_icon.png';
import { getProfile } from "../../api/api";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Divider } from '@material-ui/core';


export default function UserProfile(): JSX.Element {

    const [profile, setProfile] = useState<User>();
    const refreshProfile = async () => {
        getProfile().then((user) => setProfile(user));
    
      }

      useEffect(()=>{
        refreshProfile();
    },[])

    return (
      <>
        <Grid container className="centered-grid grid-text-area" spacing={3} justifyContent="space-around" 
            width={'80%'} height={'80%'} marginLeft={'auto'} marginRight={'auto'} padding={"1.5em 0em"}>
          <Grid item xs={12} textAlign={"center"}>
            <Box component="img" 
              src={profile?.photo ? profile?.photo : placeholderImage} 
              sx={{ 
                  objectFit: "cover", width: '12em', height: '12em', borderRadius: '50%' }}>
            </Box>
          </Grid>
          <Divider/>
          <Grid item xs={12}>
            <ProfileAttribute label="Username" text={profile?.username}></ProfileAttribute>
          </Grid>
          <Grid item xs={12}>
            <ProfileAttribute label="WebID" text={profile?.webId}></ProfileAttribute>
          </Grid>
          
        </Grid>
      </>
    )
}

function ProfileAttribute(props: { label: string, text?: string }) {
    return (
      <Box className="profile-attribute"
          height="100%"
          display="flex"
          justifyContent="center"
          flexDirection="column">
            <label>{props.label}</label>
            <div>{props.text}</div>
      </Box>
        
    )
}
  