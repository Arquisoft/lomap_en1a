import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button/Button";
import image from "../../images/placeHolder.png";
import { Rating } from 'react-simple-star-rating';

import { useState } from 'react';
import { useEffect } from 'react';
import { getComments } from '../../api/api';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { Comment } from '../../shared/shareddtypes';
import { IInfoWindowData } from './MapView';
import "../../App.css"
import StarIcon from '@mui/icons-material/Star';



export const InfoWindow:React.FC<IInfoWindowData>=( {infoWindowData,setInfoWindowData}) =>{
  
  //LO DE LOS COMENTARIOS NO FUNCIONA BIEN
  const [comments,setComments] = useState<Comment[]>([]);

  const refreshCommentList = async () => {
    setComments(await getComments());
  }

  useEffect(()=>{
    refreshCommentList();
  },[]);

  
  
  


      return (
  
  
        <section >
          <Grid container spacing={1} alignItems="center" justifyContent="center">
            
            <Grid item xs={6} textAlign="center">
                <Box component="h3" ><>{infoWindowData?.title}</></Box>
            </Grid>
            <Grid item xs={6} textAlign="center">
              <Button variant="contained">Save</Button>
            </Grid>
            <Grid item xs={12}>
                <Box component="img" src={image} sx={{width: 400, height: 250,}}></Box>
            </Grid>
           <Grid item xs={6}>
            <Rating transition fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']} allowFraction/>
           
            </Grid> 
            <Grid item xs={3}>
            <Box component="p" textAlign="right">{infoWindowData?.stars}</Box>
      
           
            </Grid> 
            <Grid item xs={3}>
            <StarIcon htmlColor='orange' fontSize='large'/>
           
            </Grid> 
            <Grid item>
            

            <CommentForm OnCommentListChange={refreshCommentList}/>        
            <CommentList comments={comments}/>
            </Grid>

                    
            
            </Grid>
        </section>


  
          );
        
  
  }