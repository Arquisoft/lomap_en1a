import "../../App.css";
import { ToggleButton } from "@mui/material";
import {ToggleButtonGroup} from "@mui/material";



export const FilterList=( ) =>{
  

  
  
  


      return (
        <ToggleButtonGroup
            color="primary"
            exclusive
            aria-label="Platform"
            >
            <ToggleButton value="filter1">Filter 1</ToggleButton>
            <ToggleButton value="filter2">Filter 2</ToggleButton>
            <ToggleButton value="filter3">Filter 3</ToggleButton>
        </ToggleButtonGroup>

  
          );
        
  
  }