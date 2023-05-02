import { FormGroup } from "@material-ui/core";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
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
      <FilterCategory name="Bar" handleChange={handleChange} />
      <FilterCategory name="Monument" handleChange={handleChange} />
      <FilterCategory name="Museum" handleChange={handleChange} />
      <FilterCategory name="Restaurant" handleChange={handleChange} />
      <FilterCategory name="Sight" handleChange={handleChange} />
      <FilterCategory name="Shop" handleChange={handleChange} />
      <Button onClick={applyFilters}>
        Apply filters
      </Button>
    </FormGroup>
  );

}

function FilterCategory(props: { name: string, handleChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void }) {
  return (
    <>
      <FormControlLabel control={<Checkbox
        id={props.name}
        value={props.name.toUpperCase()}
        onChange={event => props.handleChange(event, event.currentTarget.value)}
      />} label={props.name} />
    </>
  )
}