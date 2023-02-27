import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import logo from '../logo.svg';
import Slideshow from './mainPage/SlideShow';

type LeftMessage = {
  message: string;
}

export default function Columns(props: LeftMessage): JSX.Element {

  return (
    <Grid container>
      <Grid item xs={5}>
        <Box component="p">Hi, {props.message}</Box>
      </Grid>
      <Grid item xs={5}>
        <Slideshow/>
      </Grid>
      
    </Grid>
    
  );
}

