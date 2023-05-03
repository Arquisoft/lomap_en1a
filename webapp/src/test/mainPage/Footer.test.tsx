import { render, act} from "@testing-library/react";
import Footer from "../../components/mainPage/Footer";
import { BrowserRouter } from "react-router-dom";

test('check footer is rendered correctly', async () => {

    await act(async () => {    
      const {container, getByText} = render(
        <BrowserRouter>
            <Footer/>
        </BrowserRouter>
      )  
      expect(getByText("Contact")).toBeInTheDocument()
      expect(getByText("About us")).toBeInTheDocument()
  
    });
  })