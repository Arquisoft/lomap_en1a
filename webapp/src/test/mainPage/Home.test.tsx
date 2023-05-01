import { render, act} from "@testing-library/react";
import Home from "../../components/mainPage/Home";
import { BrowserRouter } from "react-router-dom";

test('check home is rendered correctly', async () => {

    await act(async () => {    
      const {container, getByText} = render(
       <BrowserRouter>
            <Home/>
       </BrowserRouter> 
      
      )  
      expect(getByText("Welcome to LoMap! With this application you will be able to select and share your favourite places around " +
      "the world with your friends. Take a sit, log in, and most importantly, have fun!!")).toBeInTheDocument()
  
    });
  })