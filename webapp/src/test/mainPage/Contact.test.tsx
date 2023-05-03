import Contact from "../../components/mainPage/Contact";
import { render, act} from "@testing-library/react";

test('check contact is rendered correctly', async () => {

    await act(async () => {    
      const {container, getByText} = render(<Contact/>)  
      expect(getByText("Contact us!")).toBeInTheDocument()
  
    });
  })