import About from "../../components/mainPage/About";
import { render, act} from "@testing-library/react";

test('check about is rendered correctly', async () => {
    await act(async () => {    
      const {container, getByText} = render(<About/>)  
      expect(getByText("Who are we?")).toBeInTheDocument()
  
    });
})