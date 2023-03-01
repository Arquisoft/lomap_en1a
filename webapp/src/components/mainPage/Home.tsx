import Slideshow from "./SlideShow"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';



export default function Home(): JSX.Element {
  const text ="LoMap is a software system where the citizens can have personalized maps about places and local businesses in their city. Places that can be mapped can vary from shops to bars, restaurants, sights, culture, etc.";
  return (
    <Grid container  className="centered-container">
    <Grid item xs={4}>
    <Box component="h1" className="fade-in">LoMap</Box>
      <Box component="p" className="fade-in">{text}</Box>
    </Grid>
    <Grid item xs={6}>
      <Slideshow/>
    </Grid>

    </Grid>
  
  )
}
