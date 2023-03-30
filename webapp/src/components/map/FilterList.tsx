import { ToggleButton } from "@mui/material";
import {ToggleButtonGroup} from "@mui/material";
import { useState } from "react";
import { PlaceVisibility } from "../../domain/Visibility";
import { refreshMarkers } from "../ol/vector";

export interface IVisibility{
  setVisibility:React.Dispatch<React.SetStateAction<{
    value:string
}>>
  visibility:{
    value:string;
  }
}

const buttonStyle={
  backgroundColor:"green",
  borderRadius:"2em",
  color:"white"
  
}

export const FilterList:React.FC<IVisibility>=({visibility, setVisibility}) =>{

  const handleVisibility = (
    event: React.MouseEvent<HTMLElement>,
    newVisibility: string
  ) => {
    setVisibility({value: newVisibility});
    //FIXME: refreshMarkers causing problems when logging in
    refreshMarkers(newVisibility);
  };

  return (
      <ToggleButtonGroup
        className="toggle-button-group"
        value={visibility}
        exclusive
        fullWidth
        onChange={handleVisibility}
        aria-label="filters"
        
      >
        <ToggleButton value="" aria-label="filter full" style = {buttonStyle}>
          Show all
        </ToggleButton>
        <ToggleButton value="FULL" aria-label="filter full" style = {buttonStyle}>
          Filter by Full
        </ToggleButton>
        <ToggleButton value="GROUP" aria-label="filter group" style = {buttonStyle}>
          Filter by Group
        </ToggleButton>
        <ToggleButton value="FRIENDS" aria-label="filter friends" style = {buttonStyle}>
          Filter by Friends
        </ToggleButton>
        <ToggleButton value="USER" aria-label="filter user" style = {buttonStyle}>
          Filter by User
        </ToggleButton>
        
      </ToggleButtonGroup>
  );
  
  }