import "../../App.css";
import { ToggleButton } from "@mui/material";
import {ToggleButtonGroup} from "@mui/material";
import { createTheme } from '@mui/material/styles';
import { useState } from "react";




export const FilterList=( ) =>{
  const [alignment, setAlignment] = useState<string | null>('left');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };

  return (
      <ToggleButtonGroup
        className="toggle-buttons"
        value={alignment}
        exclusive
        fullWidth
        onChange={handleAlignment}
        aria-label="filters"
        
      >
        <ToggleButton value="filter1" aria-label="filter 1" >
          Filter 1
        </ToggleButton>
        <ToggleButton value="filter2" aria-label="filter 2">
          Filter 2
        </ToggleButton>
        <ToggleButton value="filter3" aria-label="filter 3">
          Filter 3
        </ToggleButton>
        <ToggleButton value="filter4" aria-label="filter 4">
          Filter 4
        </ToggleButton>
      </ToggleButtonGroup>
  );
  
  }