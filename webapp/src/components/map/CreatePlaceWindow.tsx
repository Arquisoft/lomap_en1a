import Grid from '@mui/material/Grid';
import "../../App.css";
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import { NotificationType } from './CommentForm';
import Alert from '@mui/material/Alert';



export const CreatePlaceWindow=() =>{
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({severity:'success',message:''});
  

  
 /* const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    let result:boolean = await addPlace({name,text});
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
  }*/
  
      return (
  
  
        <>
        <form name="register" /*onSubmit={handleSubmit}*/ >
          <Grid container spacing={2} justifyContent="space-around">
            
            <TextField
              required
              name="text"
              label="Write the name of your new place" 
              variant="filled"
              value={name}
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