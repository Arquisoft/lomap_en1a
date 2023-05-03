import { FilterList } from "../../components/map/FilterList";
import { render, act } from "@testing-library/react";
import { Visibility } from "../../domain/Visibility";
import { Dispatch, useState } from "react";

test('check about is rendered correctly', async () => {
    let setVisibility: Dispatch<string>; 
    await act(async () => {    
      const {container, getByText} = render(<FilterList visibility={Visibility.PUBLIC} setVisibility={setVisibility}/>)  
      expect(getByText("Show all")).toBeInTheDocument()
      expect(getByText("Filter by Public")).toBeInTheDocument()
      expect(getByText("Filter by Private")).toBeInTheDocument()
      expect(getByText("Filter by Friends")).toBeInTheDocument()
  
    });
})