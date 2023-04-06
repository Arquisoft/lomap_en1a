import { render, act} from "@testing-library/react";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";


test('check nav bar shows correct info when user is not logged in', async () => {

  await act(async () => {    
    const {container, getByText} = render(
    <BrowserRouter>
        <NavBar isLoggedIn={false}/>
    </BrowserRouter>
    
    
    )  
    expect(await getByText("Log in")).toBeInTheDocument();
  });
  
  
})


test('check nav bar shows correct info when user is logged in', async () => {


  await act(async () => {    
    const {container, getByText} = render(    
    <BrowserRouter>
        <NavBar isLoggedIn={true}/>
    </BrowserRouter>)  
    expect(await getByText("Map")).toBeInTheDocument();
  });
  
  
})