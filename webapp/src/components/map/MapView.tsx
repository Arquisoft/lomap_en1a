import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MySideBar from './SideBar';
import { ProSidebarProvider } from "react-pro-sidebar";
import { FormControlLabel, Paper, Slide, Switch }
    from "@mui/material";
import Button from "@mui/material/Button/Button";
import React from "react";
import InfoWindow from './InfoWindow';

export default function MapView():JSX.Element{
  const [isChecked, setIsChecked] = React.useState(false);
  const containerRef = React.useRef(null);
    return (


      
        <ProSidebarProvider>
        <Grid container  justifyContent="space-between">
          
       
        <Grid item >
          <MySideBar/>
        </Grid>
        <Grid item >
          
        </Grid>
        <Grid item >
        <div  ref={containerRef}>
            <Button onClick={() => {setIsChecked((prev) => !prev);}}>PRUEBA</Button>
            <div style={{ display: "flex" }}>
                <Slide in={isChecked}
                    container={containerRef.current} direction='left'>
                        <p>prueba</p>
                </Slide>
            </div>
        </div>
          </Grid>

          <Grid item>
          <InfoWindow/>
          </Grid>

        
                
        
        </Grid>
        </ProSidebarProvider>

        );
      

}