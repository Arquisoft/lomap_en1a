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
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

export interface CreatePlaceWindowProps{
  latitude:number,
  longitude:number,
  setNewPlace:React.Dispatch<React.SetStateAction<number>>,
  newPlace:number,
  setAddedPlace:React.Dispatch<React.SetStateAction<boolean>>,
  setIsOpen:React.Dispatch<React.SetStateAction<boolean>>

  
}


export default function CreatePlaceWindow(props: CreatePlaceWindowProps): JSX.Element {

  const { session } = useSession();
  var webId = session.info.webId as string;


  const [name, setName] = useState('');
  const [visibility, setVisibility] = useState<PlaceVisibility>(PlaceVisibility.GROUP);
  const [showError, setShowError] = useState(false);

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({severity:'success',message:''});
  

  const handleChange = (value: string) => {
    var newVisibility = (PlaceVisibility as any)[value]

    setVisibility(newVisibility);
  }

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(validateText()){
        var place = new Place("",name,webId,visibility,props.latitude,props.longitude);
        let result:boolean = await addPlace(place);
        if (result){
          props.setNewPlace(props.newPlace+1); //New place is increased when a place is added
          setNotificationStatus(true);
          setNotification({ 
            severity:'success',
            message:'You new place has been added!'
          });
          props.setAddedPlace(true); //A place was added
          props.setIsOpen(false); //Close the create place window automatically
        }
        else{
          setNotificationStatus(true);
          setNotification({ 
            severity:'error',
            message:'There\'s been an error adding your place.'
          });
          props.setAddedPlace(false);
        }
    }


    
  }


  const validateText =()=>{
      if(name.trim().length===0){
          setShowError(true);
          return false;
      }else{
          setShowError(false);
          return true;
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
              error ={showError}
              helperText = {"Invalid name"}
              required
              name="text"
              label="Write the name of your new place" 
              variant="filled"
              value={name}
              onChange={e => {
                setName(e.target.value);
                
              }}
              
            />

          <FormControl>
            <InputLabel id="visibility-select-label">Visibility</InputLabel>
            <Select
              labelId="visibility-select-label"
              id="visibility-select"
              value={visibility}
              label="Visibility"
              onChange={e => {
                handleChange(e.target.value as string);
              }}
            >
              <MenuItem value={'USER'}>User</MenuItem>
              <MenuItem value={'FRIENDS'}>Friends</MenuItem>
              <MenuItem value={'GROUP'}>Group</MenuItem>
              <MenuItem value={'FULL'}>Full</MenuItem>
            </Select>
          </FormControl>

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