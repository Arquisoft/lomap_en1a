import React, { useState } from "react";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { addPicture } from '../../api/api';
import { Picture } from "../../domain/Picture";
import Grid from '@mui/material/Grid';
import btnImage from "../../icons/Add_image.png";
import Snackbar from '@mui/material/Snackbar';
import { Visibility } from "../../domain/Visibility";
import { NotificationType } from "./CommentForm";
import LoadingSpinner from "../LoadingSpinner";


type PictureSelectorProps = {
  OnPictureListChange: () => void;
  place: string;
  user: string;
}



export default function PictureSelector(props: PictureSelectorProps): JSX.Element {

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({ severity: 'success', message: '' });

  const handleAddPicture = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true)
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
      setIsLoading(false)
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
        {isLoading ? <LoadingSpinner message="Loading image" /> : <div></div>}
        <Grid container spacing={2} justifyContent="space-around" style={isLoading ? { pointerEvents: "none", opacity: "0.4" } : {}}>

          <TextField
            multiline
            rows={2}
            required
            name="text"
            placeholder="Write the URL of your new picture"
            variant="filled"
            value={url}
            onChange={e => {
              setUrl(e.target.value);
              setName(props.user);
            }}

          />
          <Button id="btn-Add-Image" variant="contained" type="submit">
            <img id="img-Add-Image" src={btnImage} alt="Add image" />
          </Button>
        </Grid>


      </form>
      <Snackbar open={notificationStatus} autoHideDuration={3000} onClose={() => { setNotificationStatus(false) }}>
        <Alert severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}


