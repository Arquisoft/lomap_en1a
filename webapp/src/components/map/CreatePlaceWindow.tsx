import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import image from "../../images/new_Place.png";
import "../../App.css";
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import { NotificationType } from './CommentForm';
import Alert from '@mui/material/Alert';
import { User } from '../../domain/User';
import { addPlace } from '../../api/api';
import { PlaceVisibility } from '../../domain/Visibility';
import { Place } from '../../domain/Place';
import { useSession} from "@inrupt/solid-ui-react";

export interface ICreatePlaceWindowData{
  latitude:number,
  longitude:number
}


export const CreatePlaceWindow:React.FC<ICreatePlaceWindowData>=({latitude,longitude}) =>{

  const { session } = useSession();
  var webId = session.info.webId as string;
  var user = new User("","PLACEHOLDER",webId); //TEMPORAL


  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({severity:'success',message:''});
  


  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var place = new Place("",name,user,PlaceVisibility.USER,latitude,longitude);
    let result:boolean = await addPlace(place);
    if (result){
      setNotificationStatus(true);
      setNotification({ 
        severity:'success',
        message:'You new place has been added!'
      });
      //Notify the change to the parent component
      //props.OnCommentListChange();
    }
    else{
      setNotificationStatus(true);
      setNotification({ 
        severity:'error',
        message:'There\'s been an error adding your place.'
      });
    }
  }
  
      return (
  
  
        <>
        <form name="register" onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="space-around">
            
            <Grid item xs={12}>
                <Box component="img" src={image} sx={{maxWidth: '100%', maxHeight: 350, width: 'auto', height: 'auto',}}></Box>
            </Grid>
            <TextField
              required
              name="text"
              label="Write the name of your new place" 
              variant="filled"
              value={text}
              onChange={e => {
                setText(e.target.value);
                
              }}
              
            />
            <Button variant="contained" type="submit">Add place</Button>
          </Grid>
  
  
        </form>
        <Snackbar open={notificationStatus} autoHideDuration={3000} onClose={()=>{setNotificationStatus(false)}}>
          <Alert severity={notification.severity} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </>


  
          );
        
  
  }