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
import { Box } from "@mui/material";


type PictureSelectorProps = {
  OnPictureListChange: () => void;
  place: string;
  handleIsLoading: (value: boolean, message?: string) => Promise<void>;
}



export default function PictureSelector(props: PictureSelectorProps): JSX.Element {

  const [url, setUrl] = useState('');

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({ severity: 'success', message: '' });

  const handleAddPicture = async (e: React.FormEvent<HTMLFormElement>) => {
    props.handleIsLoading(true, "Loading image...")
    e.preventDefault();
    let result: boolean = await addPicture(new Picture("", url, props.place, "", new Date(), Visibility.PUBLIC));
    if (result) {
      setUrl("");
      setNotificationStatus(true);
      setNotification({
        severity: 'success',
        message: 'Your picture has been posted!'
      });
      //Notify the change to the parent component
      props.OnPictureListChange();
      props.handleIsLoading(false)
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
        <Grid container spacing={3} justifyContent="space-around">
          <Grid item xs={9.5}>
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              flexDirection="column">
              <TextField className="text-box"
                style={{ width: '100%' }}
                multiline
                rows={2}
                required
                spellCheck={false}
                name="text"
                placeholder="Write the URL of your new picture"
                variant="filled"
                value={url}
                onChange={e => {
                  setUrl(e.target.value);
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={2.5}>
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              flexDirection="column">
              <Button id="btn-Add-Image" variant="contained" type="submit" disabled={url.length === 0}>
                <img id="img-Add-Image" src={btnImage} alt="" />
              </Button>
            </Box>
          </Grid>
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


