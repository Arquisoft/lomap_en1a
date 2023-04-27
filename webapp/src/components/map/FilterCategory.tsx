import { FormGroup } from "@material-ui/core";
import { Button, Checkbox, FormControlLabel} from "@mui/material";
import { Category } from "../../domain/Category";
import { updateMarkers, visibleCategories } from "../ol/vector";

export function CategoryList(): JSX.Element {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    let category = value as Category;
    if (event.target.checked) {
      visibleCategories.push(category)
    } else {
      let index = visibleCategories.indexOf(category)
      visibleCategories.splice(index, 1)
    }
  }

  const applyFilters = () => {
    updateMarkers();
  }

  return (
    <FormGroup
      className="checkbox-group"
      aria-label="categories"
    >
      <FormControlLabel control={<Checkbox
        value="BAR"
        onChange={event => handleChange(event, event.currentTarget.value)}
      />} label="Bar" />
      <FormControlLabel control={<Checkbox
        value="MONUMENT"
        onChange={event => handleChange(event, event.currentTarget.value)}
      />} label="Monument" />
      <FormControlLabel control={<Checkbox
        value="MUSEUM"
        onChange={event => handleChange(event, event.currentTarget.value)}
      />} label="Museum" />
      <FormControlLabel control={<Checkbox
        value="RESTAURANT"
        onChange={event => handleChange(event, event.currentTarget.value)}
      />} label="Restaurant" />
      <FormControlLabel control={<Checkbox
        value="SIGHT"
        onChange={event => handleChange(event, event.currentTarget.value)}
      />} label="Sight" />
      <FormControlLabel control={<Checkbox
        value="SHOP"
        onChange={event => handleChange(event, event.currentTarget.value)}
      />} label="Shop" />
      <Button className="category-button" onClick={applyFilters}>
        Apply filters
      </Button>
    </FormGroup>
  );

}