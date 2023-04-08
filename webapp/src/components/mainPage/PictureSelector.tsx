import React, {useState} from "react";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import type { AlertColor } from '@mui/material/Alert';
import { addPicture } from '../../api/api';
import { Picture } from "../../domain/Picture";
import Grid from '@mui/material/Grid';
import btnImage from "../../images/Add_image.png";
import Snackbar from '@mui/material/Snackbar';
import { Visibility } from "../../domain/Visibility";


type PictureSelectorProps = {
  OnPictureListChange: () => void;
  place:string;
  user:string;
}

export type NotificationType = {
  severity: AlertColor,
  message: string;
}



export default function PictureSelector(props: PictureSelectorProps): JSX.Element {

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
  
    const [notificationStatus, setNotificationStatus] = useState(false);
    const [notification, setNotification] = useState<NotificationType>({ severity: 'success', message: '' });

    const handleAddPicture = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let result: boolean = await addPicture(new Picture("", url, props.place, props.user, new Date(), Visibility.PUBLIC));
      if (result) {
        setNotificationStatus(true);
        setNotification({
          severity: 'success',
          message: 'Your picture has been posted!'
        });
        //Notify the change to the parent component
        props.OnPictureListChange();
      }
      else {
        setNotificationStatus(true);
        setNotification({
          severity: 'error',
          message: 'There\'s been an error posting your picture.'
        });
      }
    }
  

  return (
    <>
      <form name="register" onSubmit={handleAddPicture}>
        <Grid container spacing={2} justifyContent="space-around">
          
            <TextField
                required
                name="text"
                label="Write the URL of your new picture" 
                variant="filled"
                value={url}
                onChange={e => {
                    setUrl(e.target.value);
                    setName(props.user);
                }}
                
            />
            <Button id="btn-Add-Image" variant="contained" type="submit">
                  <img id="img-Add-Image" src={btnImage} alt="Add image"/>
            </Button>
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


