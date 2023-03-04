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

import "../../App.css"



export default function InfoWindow():JSX.Element{
  
  const [comments,setComments] = useState<Comment[]>([]);

  const refreshCommentList = async () => {
    setComments(await getComments());
  }

  useEffect(()=>{
    refreshCommentList();
  },[]);


      return (
  
  
        <section >
          <Grid container direction="column" >
            
            <Grid item >
                <Box component="h3" >TITLE-PLACEHOLDER</Box>
            </Grid>
            <Grid item >
              <Button variant="contained">Save</Button>
            </Grid>
            <Grid item >
                <Box component="img" src={image} sx={{width: 250, height: 250,}}></Box>
            </Grid>
           <Grid item>
            <Rating transition fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']} allowFraction/>
           
            </Grid> 
            <Grid item>
            
            <CommentForm OnCommentListChange={refreshCommentList}/>        
                <CommentList comments={comments}/>
            </Grid>

                    
            
            </Grid>
        </section>


  
          );
        
  
  }