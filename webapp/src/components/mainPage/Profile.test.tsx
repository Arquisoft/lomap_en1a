import { render, act} from "@testing-library/react";
import Profile from "./Profile";
import { BrowserRouter, Routes } from "react-router-dom";



test('check profile menu is rendered correctly', async () => {


    //FIXME
    //Profile component must be inside BrowserRouter for the test
  await act(async () => {    
    const {container, getByText} = render(
        <BrowserRouter>
            <Profile/>
        </BrowserRouter>
            
   
    )  
    expect(await getByText("Username")).toBeInTheDocument();
  });
  
  
})
