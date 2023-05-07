import Slideshow from "./SlideShow"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import map from "../../images/map-app.png";
import addPlace from "../../images/addPlace.png";
import addFriend from "../../images/addFriend.png";
import reviews from "../../images/reviews.png";
import infoWindow from "../../images/barInfoWindow.png";
import lomap from "../../images/LoMap logo.png";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const images = [addPlace, reviews, infoWindow,addFriend];


export default function Home(): JSX.Element {
  let description ="Welcome to LoMap! With this application you will be able to select and share your favourite places around " +
    "the world with your friends. Take a sit, log in, and most importantly, have fun!!";
  
  let description2 ="With LoMap, not only can you add places anywhere you want, but also you will be able to: ";

  let navigate = useNavigate();


  const handleClick = () => {
    navigate("/login");
  }

  return (
    <div className="background-image">
    <Grid container spacing={4} className="homepage"
        justifyItems="flex-end"
        alignItems="center"
        padding="0em 5em" 
        paddingBottom="3em"
        fontSize="3.2vmin">
      <Grid item xs={12} textAlign="center">
        <Box component="img" src={lomap} alt="Logo"
          sx={{padding: "0.5em", maxWidth: "50%", maxHeight: "50%" }}>
        </Box>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Button id="enter-btn" sx={{height: '100%' }} variant="contained" onClick={handleClick}>Enter now!</Button>
      </Grid>
      <Grid item xs={12} textAlign="justify" fontSize="4vmin">
        <Box className="bgr-color"
            height="100%"
            display="flex"
            justifyContent="center"
            flexDirection="column">
          <p>{description}</p>
        </Box>
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Box component="img" src={map} alt="App view"
        sx={{maxWidth: '100%', maxHeight: '20em', width: 'auto', height: 'auto', borderRadius: '2em'}}></Box>
      </Grid>
      <Grid item xs={6} textAlign="justify">
        <Box className="bgr-color"
            height="100%"
            display="flex"
            justifyContent="center"
            flexDirection="column">
          <p>{description2}</p>
            <ul className="homepage-list">
              <li>Review places!</li>
              <li>Leave comments!</li>
              <li>Add pictures!</li>
              <li>Describe your favourite sites!</li>
              <li>Add friends!</li>
          </ul>
        </Box>
      </Grid>
      <Grid item xs={6} textAlign="center" alignItems="center">
        <Slideshow images={images}/>
      </Grid>
    </Grid>
    </div>  
  )
}
