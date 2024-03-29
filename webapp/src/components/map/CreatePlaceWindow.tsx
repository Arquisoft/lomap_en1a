import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import image from "../../images/new_Place.png";
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import { NotificationType } from './CommentForm';
import Alert from '@mui/material/Alert';
import { addPlace } from '../../api/api';
import { Visibility } from '../../domain/Visibility';
import { Place } from '../../domain/Place';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { changeMarkerColour, updateMapList } from '../ol/vector';
import { Category } from '../../domain/Category';
import LoadingSpinner from '../LoadingSpinner';
import { Divider } from '@material-ui/core';

export interface CreatePlaceWindowProps {
  latitude: number,
  longitude: number,
  handleNewPlace: () => Promise<void>,
  handleDeleteMarker: (value: boolean) => Promise<void>,
  handleIsOpen: (value: boolean) => Promise<void>

}

interface VisibilitySelectProps {
  visibility: Visibility,
  handleVisibilityChange: (value: string) => Promise<void>
}

export function VisibilitySelect(props: VisibilitySelectProps): JSX.Element {

  return (
    <div className='selector'>
      <FormControl style={{ width: '100%', height: '100%' }}>
        <InputLabel id="visibility-select-label">Visibility</InputLabel>
        <Select
          labelId="visibility-select-label"
          id="visibility-select"
          value={props.visibility}
          label="Visibility"
          onChange={e => {
            props.handleVisibilityChange(e.target.value as string);
          }}
        >
          <MenuItem value={'PRIVATE'}>Private</MenuItem>
          <MenuItem value={'FRIENDS'}>Friends</MenuItem>
          <MenuItem value={'PUBLIC'}>Public</MenuItem>
        </Select>
      </FormControl>
    </div>


  )

}


export default function CreatePlaceWindow(props: CreatePlaceWindowProps): JSX.Element {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.PUBLIC);
  const [category, setCategory] = useState<Category>(Category.BAR);
  const [showError, setShowError] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({ severity: 'success', message: '' });

  const [isLoading, setIsLoading] = useState(false);



  const handleVisibilityChange = async (value: string) => {
    let newVisibility = (Visibility as any)[value]
    setVisibility(newVisibility);
  }

  const handleCategoryChange = async (value: string) => {
    let newCategory = (Category as any)[value]

    setCategory(newCategory);
  }


  //Adds a place
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    if (validateText()) {//If the name of the place is valid
      let place = new Place("", name, description, "", props.latitude, props.longitude, visibility, category);
      let result = await addPlace(place);

      if (result.id !== "ERR") {
        props.handleNewPlace(); //New place is increased when a place is added
        setNotificationStatus(true);
        setNotification({
          severity: 'success',
          message: 'Your new place has been added!'
        });
        props.handleDeleteMarker(false);
        props.handleIsOpen(false); //Close the create place window automatically

        let v = Visibility[visibility].toLowerCase();
        changeMarkerColour(v); //Changes the last marker colour

        updateMapList(result);

      }
      else {
        setNotificationStatus(true);
        setNotification({
          severity: 'error',
          message: 'There\'s been an error adding your place.'
        });
        props.handleDeleteMarker(true);
      }

    }
    setIsLoading(false);

  }


  //Checks the name of the new place
  const validateText = () => {
    if (name.trim().length === 0) {
      setShowError(true);
      return false;
    } else {
      setShowError(false);
      return true;
    }

  }


  return (


    <>
      {isLoading ? <LoadingSpinner /> : <></>}
      <form name="register" onSubmit={handleSubmit}>
        <Grid container spacing={3} justifyContent="space-around" style={isLoading ? { pointerEvents: "none", opacity: "0.4" } : {}}>
          <Grid item xs={12} textAlign="center">
            <Box className="new-place">New place!</Box>
            <Divider />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Box component="img" src={image} sx={{ maxWidth: '100%', maxHeight: "350px", width: 'auto', height: 'auto', marginLeft: 'auto', marginRight: 'auto' }}></Box>
          </Grid>
          <Grid item xs={5.5}>
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              flexDirection="column">
              <TextField className="text-box"
                style={{ width: '100%' }}
                error={showError}
                required
                spellCheck={false}
                multiline
                fullWidth
                name="text"
                placeholder="Write the name of your new place"
                variant="filled"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                }} />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              flexDirection="column">
              <VisibilitySelect visibility={visibility} handleVisibilityChange={handleVisibilityChange} />
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              flexDirection="column">
              <div className='selector'>
                <FormControl style={{ width: '100%', height: '100%' }}>
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={category}
                    label="Category"
                    onChange={e => {
                      handleCategoryChange(e.target.value as string);
                    }}
                  >
                    <MenuItem value={'BAR'}>Bar</MenuItem>
                    <MenuItem value={'MONUMENT'}>Monument</MenuItem>
                    <MenuItem value={'MUSEUM'}>Museum</MenuItem>
                    <MenuItem value={'RESTAURANT'}>Restaurant</MenuItem>
                    <MenuItem value={'SIGHT'}>Sight</MenuItem>
                    <MenuItem value={'SHOP'}>Shop</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Box>
          </Grid>
          <Grid item xs={2.5}>
            <Box
              height="100%"
              display="flex"
              justifyContent="center"
              flexDirection="column">
              <Button sx={{ height: '100%' }} variant="contained" type="submit" disabled={name.length === 0}>Add place</Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField className="text-box"
              style={{ width: '100%' }}
              multiline
              rows={7}
              spellCheck={false}
              fullWidth
              name="description"
              placeholder="Write the description of your new place"
              variant="filled"
              value={description}
              onChange={e => {
                setDescription(e.target.value)

              }}
            />
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