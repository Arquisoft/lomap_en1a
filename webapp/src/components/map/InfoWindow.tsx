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
import { NotificationType } from './CommentForm';
import { addScore } from '../../api/api';
import { useSession} from "@inrupt/solid-ui-react";
import { FOAF, VCARD } from "@inrupt/lit-generated-vocab-common";


export const InfoWindow:React.FC<IInfoWindowData>=( {infoWindowData,setInfoWindowData}) =>{

 const { session } = useSession();
  var webId = session.info.webId as string;
  
  

  
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
    getComments(infoWindowData?.id).then((s)=>setComments(s));
  }


  const handleAddScore = async (value:number) => {
    //e.preventDefault();

    var score = new Score("",value,infoWindowData?.id,webId);
    let result:boolean = await addScore(score); //The score still has no ID
    if (result){
      setNotificationStatus(true);
      setNotification({ 
        severity:'success',
        message:'You score has been posted!'
      });
      //Notify the change to the parent component
      //props.OnCommentListChange();
    }
    else{
      setNotificationStatus(true);
      setNotification({ 
        severity:'error',
        message:'There\'s been an error posting your score.'
      });
    }
  }


  //Gets the list of scores for a specific place
  const refreshScores = async (value:number) => {
    await handleAddScore(value); //Adds the new score
    

    //NOT FIXED YET
    getScores(infoWindowData?.id).then((s)=>{
        setScores(s);
        let aux = 0;
        for (let i = 0; i < scores.length; i++) {
        
          aux+=scores[i].score;
        }
        let avg = aux/scores.length;
        let a = avg.toFixed(1)
        setAvg(parseFloat(a)); //Calculates the new average
    });
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


            <Grid item xs={12}>
                <Box component="img" src={image} sx={{maxWidth: '100%', maxHeight: 350, width: 'auto', height: 'auto', }}></Box>
            </Grid>

           <Grid item xs={6}>
              <Rating
                transition
                fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                allowFraction
                onClick={(value)=>refreshScores(value)}
                
                />
            </Grid> 

            <Grid item xs={3}>
              <Box component="p" textAlign="right">{avg}</Box>
            </Grid> 

            <Grid item xs={3}>
              <StarIcon htmlColor='orange' fontSize='large'/>
            </Grid> 

            <Grid item xs={12}>
              <CommentForm OnCommentListChange={refreshCommentList} place={infoWindowData?.id} user={"username"}/>        
            </Grid>
            <Grid item xs={12}>
              <CommentList comments={comments}/>
            </Grid>
            

            </Grid>
        </>


  
          );
        
  
  }