import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material/Alert';
import { addComment } from '../../api/api';
import Grid from '@mui/material/Grid';
import { Comment } from '../../domain/Comment';
import { Visibility } from '../../domain/Visibility';
import { VisibilitySelect } from './CreatePlaceWindow';

type CommentFormProps = {
  OnCommentListChange: () => void;
  handleIsLoading: (value: boolean, message?: string) => Promise<void>;
  place: string;
}

export type NotificationType = {
  severity: AlertColor,
  message: string;
}



export default function CommentForm(props: CommentFormProps): JSX.Element {

  const [text, setText] = useState('');

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({ severity: 'success', message: '' });
  const [visibility, setVisibility] = useState<Visibility>(Visibility.PUBLIC);

  const handleChange = async (value: string) => {
    var newVisibility = (Visibility as any)[value]

    setVisibility(newVisibility);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    props.handleIsLoading(true, "Your message is being posted");
    e.preventDefault();


    let result: boolean = await addComment(new Comment("", text, props.place, "", new Date(), visibility)); //The comment still has no ID
    if (result) {
      setNotificationStatus(true);
      setNotification({
        severity: 'success',
        message: 'Your comment has been posted!'
      });
      //Notify the change to the parent component
      props.OnCommentListChange();
    }
    else {
      setNotificationStatus(true);
      setNotification({
        severity: 'error',
        message: 'There\'s been an error posting your comment.'
      });
    }
    props.handleIsLoading(false);
  }



  return (
    <>
      <form name="register" onSubmit={handleSubmit}>
        <Grid container spacing={1} justifyContent="space-around">

          <Grid item xs={6}>
              <TextField
                multiline
                rows={2}
                required
                name="text"
                placeholder="Write your review"
                variant="filled"
                value={text}
                onChange={e => {
                  setText(e.target.value);
                

                }}

              />
            </Grid>
            <Grid item xs={3}>
              <VisibilitySelect visibility={visibility} handleVisibilityChange={handleChange}/>
            </Grid>
            <Grid item xs={3}>
              <Button variant="contained" type="submit">Post</Button>
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


