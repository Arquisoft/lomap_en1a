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
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

type CommentFormProps = {
  OnCommentListChange: () => void;
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

  const handleChange = async(value: string) => {
    var newVisibility = (Visibility as any)[value]

    setVisibility(newVisibility);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
  }



  return (
    <>
      <form name="register" onSubmit={handleSubmit}>
        <Grid container spacing={3} justifyContent="space-around">

          <TextField
            required
            name="text"
            label="Write your review"
            variant="filled"
            value={text}
            onChange={e => {
              setText(e.target.value);
            

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
              <MenuItem value={'PRIVATE'}>Private</MenuItem>
              <MenuItem value={'FRIENDS'}>Friends</MenuItem>
              <MenuItem value={'PUBLIC'}>Public</MenuItem>
            </Select>
          </FormControl>
          <Button variant="contained" type="submit">Post</Button>
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


