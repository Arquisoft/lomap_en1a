import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MySideBar from './SideBar';
import Button from "@mui/material/Button/Button";
import React from "react";
import image from "../../images/placeHolder.png";
import { Rating } from 'react-simple-star-rating';



export default function InfoWindow():JSX.Element{

      return (
  
  
        <section>
          <Grid container columns={1}>
            
            <Grid item >
                <Box component="h2" className="fade-in">TITLE-PLACEHOLDER</Box>
            </Grid>
            <Grid item >
              <Button>+Save</Button>
            </Grid>
            <Grid item >
                
            </Grid>
           <Grid item>
            <Rating transition showTooltip fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']} allowFraction/>
           
            </Grid> 

                    
            
            </Grid>
        </section>


  
          );
        
  
  }