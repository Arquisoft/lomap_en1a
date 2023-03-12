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

  const fullUrl = "../../images-places/";
  const [name, setName] = useState('');
  const [fileName, setFileName] = useState('');

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({severity:'success',message:''});
  

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    var pic = new Picture("",fullUrl + fileName,props.place,props.user);
    let result:boolean = await addPicture(pic); //The picture still has no ID
    
    if (result){
      setNotificationStatus(true);
      setNotification({ 
        severity:'success',
        message:'You comment has been posted!'
      });
      //Notify the change to the parent component
      props.OnPictureListChange();
    }
    else{
      setNotificationStatus(true);
      setNotification({ 
        severity:'error',
        message:'There\'s been an error posting your picture.'
      });
    }
  }

  return (
    <>
      <form name="register" onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="space-around">
          
            <TextField
                required
                name="text"
                label="Write the URL of your new picture" 
                variant="filled"
                value={fileName}
                onChange={e => {
                    setFileName(e.target.value);
                    setName(props.user);//This may not be necessary
                }}
                
            />
            <Button id="btn-Add-Image" variant="contained" type="submit">
                  <img id="img-Add-Image" src={btnImage} alt="Add_image"/>
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


