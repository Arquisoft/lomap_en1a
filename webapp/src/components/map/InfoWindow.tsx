import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button/Button";
import image from "../../images/placeHolder.png";
import { Rating } from 'react-simple-star-rating';
import { useState } from 'react';
import { useEffect } from 'react';
import { getComments, getScores } from '../../api/api';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { Comment } from '../../domain/Comment';
import { IInfoWindowData } from './MapView';
import "../../App.css";
import StarIcon from '@mui/icons-material/Star';
import { Score } from '../../domain/Score';
import { Place } from '../../domain/Place';
import { PlaceVisibility } from '../../domain/Visibility';
import { User } from '../../domain/User';
import { addPlace } from '../../api/api';
import { NotificationType } from './CommentForm';


export const InfoWindow:React.FC<IInfoWindowData>=( {infoWindowData,setInfoWindowData}) =>{

  var user = new User("PLACEHOLDER","PLACEHOLDER","PLACEHOLDER"); //TEMPORAL
  var place = new Place(infoWindowData?.id,infoWindowData?.title,user,PlaceVisibility.FULL,infoWindowData?.latitude,infoWindowData?.longitude);
  
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({severity:'success',message:''});
  
  //For the comments
  const [comments,setComments] = useState<Comment[]>([]);

  //For the scores
  const [scores,setScores] = useState<Score[]>([]);

  //For the computation of the avg score
  const [avg,setAvg] = useState(0);

  //Gets the list of comments for a specific place
  const refreshCommentList = async () => {
    setComments(await getComments(infoWindowData?.id)); 
  }


  //Gets the list of scores for a specific place
  const refreshScores = async () => {
    setScores(await getScores(infoWindowData?.id));
    let aux = 0;
    for (let i = 0; i < scores.length; i++) {
      aux+=scores[i].getScore();
    }
    setAvg(aux/scores.length);
  }

  //Saves this place for the user
  const savePlace = async () => {
  
      
      let result:boolean = await addPlace(place);
      if (result){
        setNotificationStatus(true);
        setNotification({ 
          severity:'success',
          message:'Place saved succesfully!'
        });
      }
      else{
        setNotificationStatus(true);
        setNotification({ 
          severity:'error',
          message:'There\'s been an error saving this place.'
        });
      }
    }


  useEffect(()=>{
    refreshCommentList();
  },[]);





  
  
  


      return (
  
  
        <>
          <Grid container spacing={1} alignItems="center" justifyContent="center" className='info-window'>
            
            <Grid item xs={6} textAlign="center">
                <Box component="h3" ><>{infoWindowData?.title}</></Box>
            </Grid>

            <Grid item xs={6} textAlign="center">
              <Button variant="contained" onClick={()=>savePlace()}>Save</Button>
            </Grid>

            <Grid item xs={12}>
                <Box component="img" src={image} sx={{width: 400, height: 250,}}></Box>
            </Grid>

           <Grid item xs={6}>
              <Rating
                transition
                fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                allowFraction
                onClick={()=>refreshScores()}
                
                />
            </Grid> 

            <Grid item xs={3}>
              <Box component="p" textAlign="right">{avg}</Box>
            </Grid> 

            <Grid item xs={3}>
              <StarIcon htmlColor='orange' fontSize='large'/>
            </Grid> 

            <Grid item xs={12}>
              <CommentForm OnCommentListChange={refreshCommentList} place={place} user={user}/>        
            </Grid>
            <Grid item xs={12}>
              <CommentList comments={comments}/>
            </Grid>
            

            </Grid>
        </>


  
          );
        
  
  }