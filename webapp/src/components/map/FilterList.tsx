import { ToggleButton } from "@mui/material";
import { ToggleButtonGroup } from "@mui/material";
import { refreshMarkers } from "../ol/vector";

export interface IVisibility {
  setVisibility: React.Dispatch<string>
  visibility: string
}

const buttonStyle = {
  backgroundColor: "green",
  borderRadius: "2em",
  color: "white"

}

export const FilterList: React.FC<IVisibility> = ({ visibility, setVisibility }) => {

  const handleVisibility = (
    event: React.MouseEvent<HTMLElement>,
    newVisibility: string
  ) => {
    setVisibility(newVisibility);
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
      <ToggleButton value="public" aria-label="filter full" style={buttonStyle}>
        Filter by Public
      </ToggleButton>
      <ToggleButton value="private" aria-label="filter group" style={buttonStyle}>
        Filter by Private
      </ToggleButton>
      <ToggleButton value="shared" aria-label="filter friends" style={buttonStyle}>
        Filter by Friends
      </ToggleButton>

    </ToggleButtonGroup>
  );

}