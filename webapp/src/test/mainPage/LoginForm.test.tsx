import LoginForm from "../../components/mainPage/LoginForm";
import { render, act} from "@testing-library/react";

test('check about is rendered correctly', async () => {
    await act(async () => {    
      const {container, getByText} = render(<LoginForm/>)  
      expect(getByText("Log in with your POD!")).toBeInTheDocument()
      expect(getByText("Solid Community")).toBeInTheDocument()
      expect(getByText("Solid Web")).toBeInTheDocument()
      expect(getByText("inrupt.net")).toBeInTheDocument()
      expect(getByText("pod.inrupt.com")).toBeInTheDocument()
  
    });
})